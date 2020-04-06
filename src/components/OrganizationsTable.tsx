import React from "react";
import { Table, Spin, Alert } from "antd";
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
    ellipsis: true,
    render: (text: string, record: IOrganization) => (
      <Link to={"/organization/" + record.id}>{text}</Link>
    ),
    onFilter: (value: string | number | boolean, record: IOrganization) =>
      record.orgFullName.indexOf(value.toString()) === 0,
    sorter: (a: IOrganization, b: IOrganization) =>
      a.orgFullName.localeCompare(b.orgFullName),
  },
  {
    title: "Regulated Trials",
    dataIndex: "shouldHaveResultsCount",
    key: "shouldHaveResultsCount",
    filters: [
      { text: ">20", value: "20" },
      { text: ">50", value: "50" },
    ],
    filterMultiple: false,
    defaultFilteredValue: ["20"],
    onFilter: (value: number | string | boolean, record: IOrganization) => {
      const val = typeof value === "string" ? parseFloat(value) : value;
      return record.shouldHaveResultsCount > val;
    },
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
    return <Spin size="large" />;
  }
  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load table of research organizations"
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
  const organizations = data.allOrganizations.edges.map((edge) => edge.node);
  return (
    <Table
      dataSource={organizations}
      columns={columns}
      rowKey="orgFullName"
      pagination={{ pageSize: 50 }}
    />
  );
}

export default OrganizationsTable;
