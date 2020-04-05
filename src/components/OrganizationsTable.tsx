import React from "react";
import { Table } from "antd";
import { SortOrder } from "antd/lib/table/interface";
import { Link } from "react-router-dom";
import { useQuery } from "react-apollo";
import { fracToPercent } from "utils/displayUtils";
import {
  IOrganization,
  IAllOrganizations,
  GET_ORGANIZATIONS,
} from "graphql/queries";

let defaultSort: SortOrder;
defaultSort = "descend";

const columns = [
  {
    title: "Organization",
    dataIndex: "orgFullName",
    key: "orgFullName",
    render: (text: string, record: IOrganization) => (
      <Link to={"/organization/" + record.id}>{text}</Link>
    ),
    onFilter: (value: string, record: IOrganization) =>
      record.orgFullName.indexOf(value) === 0,
    sorter: (a: IOrganization, b: IOrganization) =>
      a.orgFullName.localeCompare(b.orgFullName),
  },
  {
    title: "Reportable Trials",
    dataIndex: "shouldHaveResultsCount",
    key: "shouldHaveResultsCount",
    filters: [
      { text: ">20", value: "20" },
      { text: ">50", value: "50" },
    ],
    filteredValue: ["20"],
    onFilter: (value: number, record: IOrganization) =>
      record.shouldHaveResultsCount > value,
    sorter: (a: IOrganization, b: IOrganization) =>
      a.shouldHaveResultsCount - b.shouldHaveResultsCount,
    defaultSortOrder: defaultSort,
  },
  {
    title: "Results on time (%)",
    dataIndex: "onTimeFrac",
    key: "onTimeFrac",
    render: (text: string, record: IOrganization) => fracToPercent(text),
    sorter: (a: IOrganization, b: IOrganization) => a.onTimeFrac - b.onTimeFrac,
  },
  {
    title: "Results late (%)",
    dataIndex: "lateFrac",
    key: "lateFrac",
    render: (text: string, record: IOrganization) => fracToPercent(text),
    sorter: (a: IOrganization, b: IOrganization) => a.lateFrac - b.lateFrac,
  },
  {
    title: "Results unreported (%)",
    dataIndex: "missingFrac",
    key: "missingFrac",
    render: (text: string, record: IOrganization) => fracToPercent(text),
    sorter: (a: IOrganization, b: IOrganization) =>
      a.missingFrac - b.missingFrac,
  },
];

function OrganizationsTable() {
  const { data, loading, error } = useQuery<IAllOrganizations>(
    GET_ORGANIZATIONS,
  );
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  if (!data) {
    return <p>No data</p>;
  }
  const organizations = data.allOrganizations.edges.map((edge) => ({
    ...edge.node,
  }));
  return (
    <Table dataSource={organizations} columns={columns} rowKey="orgFullName" />
  );
}

export default OrganizationsTable;
