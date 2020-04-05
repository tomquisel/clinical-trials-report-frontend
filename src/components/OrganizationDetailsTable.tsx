import React from "react";
import { Table, Spin } from "antd";
import { SortOrder } from "antd/lib/table/interface";
import { useQuery } from "react-apollo";
import { fracToPercent } from "utils/displayUtils";
import {
  nullStringSorterFunction,
  compareDateStrings,
  compareStrings,
} from "utils/sort";
import {
  ITrial,
  ITrialsForOrgResponse,
  GET_TRIALS_FOR_ORGANIZATION,
} from "graphql/queries";

let defaultSort: SortOrder;
defaultSort = "descend";

const columns = [
  {
    title: "Study Title",
    dataIndex: "briefTitle",
    key: "briefTitle",
    sorter: (a: ITrial, b: ITrial) =>
      nullStringSorterFunction(compareStrings)(a.briefTitle, b.briefTitle),
    render: (value: number, record: ITrial) => (
      <a href={"https://clinicaltrials.gov/ct2/show/" + record.id}>{value}</a>
    ),
    filters: [{ text: "Results Due", value: "1" }],
    onFilter: (value: any, record: ITrial) => record.shouldHaveResults,
    filteredValue: ["1"],
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    sorter: (a: ITrial, b: ITrial) =>
      nullStringSorterFunction(compareDateStrings, false)(
        a.startDate,
        b.startDate,
      ),
  },
  {
    title: "Completion Date",
    dataIndex: "primaryCompletionDate",
    key: "primaryCompletionDate",
    sorter: (a: ITrial, b: ITrial) =>
      nullStringSorterFunction(compareDateStrings, false)(
        a.primaryCompletionDate,
        b.primaryCompletionDate,
      ),
    defaultSortOrder: defaultSort,
  },
  {
    title: "Results Submitted",
    dataIndex: "resultsFirstSubmitDate",
    key: "resultsFirstSubmitDate",
    sorter: (a: ITrial, b: ITrial) =>
      nullStringSorterFunction(compareDateStrings, false)(
        a.resultsFirstSubmitDate,
        b.resultsFirstSubmitDate,
      ),
  },
];

function OrganizationDetailsTable(organizationId: string) {
  const { data, loading, error } = useQuery<ITrialsForOrgResponse>(
    GET_TRIALS_FOR_ORGANIZATION,
    { variables: { organizationId: parseInt(organizationId, 10) } },
  );

  if (loading) {
    return <Spin size="large" />;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  if (!data) {
    return <p>No data</p>;
  }
  const { organizationById: orgs } = data;
  const orgTrials = orgs.trialsByOrgId.edges.map((edge) => ({
    ...edge.node,
  }));
  return (
    <div>
      <h1>Organization Details</h1>
      <h2>{orgs.orgFullName}</h2>
      <p>Class: {orgs.orgClass}</p>
      <p>Trials with results due: {orgs.shouldHaveResultsCount}</p>
      <p>Results on time (%): {fracToPercent(orgs.onTimeFrac)}</p>
      <p>Results late (%): {fracToPercent(orgs.lateFrac)}</p>
      <p>Results unreported (%): {fracToPercent(orgs.missingFrac)}</p>
      <Table dataSource={orgTrials} columns={columns} rowKey="id" />;
    </div>
  );
}

export default OrganizationDetailsTable;
