import React from "react";
import { Table, Spin, Tag, Alert } from "antd";
import { SortOrder } from "antd/lib/table/interface";
import { useQuery } from "react-apollo";
import { BarType } from "components/PercentBar";
import { percentColumnRender } from "components/PercentageTableCell";
import { formatDate } from "utils/displayUtils";
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
    width: 300,
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
    render: (value: Date, record: ITrial) => formatDate(value),
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
    render: (value: Date, record: ITrial) => formatDate(value),
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
    render: (value: Date, record: ITrial) => formatDate(value),
    sorter: (a: ITrial, b: ITrial) =>
      nullStringSorterFunction(compareDateStrings, false)(
        a.resultsFirstSubmitDate,
        b.resultsFirstSubmitDate,
      ),
  },
];

const summaryColumns = [
  {
    title: "Regulated Trials",
    dataIndex: "shouldHaveResultsCount",
    key: "shouldHaveResultsCount",
  },
  {
    title: "Results on time (%)",
    dataIndex: "onTimeFrac",
    key: "onTimeFrac",
    render: percentColumnRender(BarType.Success),
  },
  {
    title: "Results late (%)",
    dataIndex: "lateFrac",
    key: "lateFrac",
    render: percentColumnRender(BarType.Warning),
  },
  {
    title: "Results unreported (%)",
    dataIndex: "missingFrac",
    key: "missingFrac",
    render: percentColumnRender(BarType.Danger),
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
    return (
      <Alert
        message="Error"
        description="Failed to load organization details"
        type="error"
      />
    );
  }
  if (!data) {
    return (
      <Alert
        message="No Data"
        description="There's no data right now."
        type="warning"
      />
    );
  }
  const { organizationById: org } = data;
  const orgTrials = org.trialsByOrgId.edges.map((edge) => edge.node);
  return (
    <div>
      <h2>
        {org.orgFullName} <Tag color="blue">{org.orgClass}</Tag>
      </h2>
      <Table dataSource={[org]} columns={summaryColumns}></Table>
      <Table
        dataSource={orgTrials}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 50 }}
      />
    </div>
  );
}

export default OrganizationDetailsTable;
