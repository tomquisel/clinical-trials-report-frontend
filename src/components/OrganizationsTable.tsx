import React from "react";
import gql from "graphql-tag";
import { Table } from "antd";
import { SortOrder } from "antd/lib/table/interface"
import { Link } from "react-router-dom";
import { useQuery } from "react-apollo";
import { FracToPercent } from "../utils/display_utils"

let default_sort: SortOrder;
default_sort = 'descend'

const columns = [
  {
    title: "Organization",
    dataIndex: "orgFullName",
    key: "orgFullName",
    render: (text: string, record: IOrganization) => <Link to={'/organization/' + record.id}>{text}</Link>,
    onFilter: (value: string, record: IOrganization) => record.orgFullName.indexOf(value) === 0,
    sorter: (a: IOrganization, b: IOrganization) => a.orgFullName.localeCompare(b.orgFullName)
  },
  {
    title: "Reportable Trials",
    dataIndex: "shouldHaveResultsCount",
    key: "shouldHaveResultsCount",
    filters: [{text: '>20', value: '20'}, {text: '>50', value: '50'}],
    onFilter: (value: number, record: IOrganization) => (record.shouldHaveResultsCount - value) > 0,
    filteredValue: ['20'],
// This inexplicably doesn't work!!!!
//     onFilter: (value: number, record: IOrganization) => record.shouldHaveResultsCount > value,
    sorter: (a: IOrganization, b: IOrganization) => a.shouldHaveResultsCount - b.shouldHaveResultsCount,
    defaultSortOrder: default_sort,
  },
  {
    title: "Results on time (%)",
    dataIndex: "onTimeFrac",
    key: "onTimeFrac",
    render: (text: string, record: IOrganization) => FracToPercent(text),
    sorter: (a: IOrganization, b: IOrganization) => a.onTimeFrac - b.onTimeFrac,
  },
  {
    title: "Results late (%)",
    dataIndex: "lateFrac",
    key: "lateFrac",
    render: (text: string, record: IOrganization) => FracToPercent(text),
    sorter: (a: IOrganization, b: IOrganization) => a.lateFrac - b.lateFrac,
  },
  {
    title: "Results unreported (%)",
    dataIndex: "missingFrac",
    key: "missingFrac",
    render: (text: string, record: IOrganization) => FracToPercent(text),
    sorter: (a: IOrganization, b: IOrganization) => a.missingFrac - b.missingFrac,
  },
];

interface IOrganization {
    id: string;
    orgFullName: string;
    totalCount: number;
    shouldHaveResultsCount: number;
    lateFrac: number;
    missingFrac: number;
    onTimeFrac: number;
}

interface IOrganizationEdge {
  node: IOrganization
}

interface IAllOrganizations {
  allOrganizations: {
    edges: IOrganizationEdge[];
  }
}

const GET_ORGANIZATIONS = gql`
  query Organizations {
    allOrganizations {
      edges{
        node {
          id
          orgFullName
          totalCount
          shouldHaveResultsCount
          lateFrac
          missingFrac
          onTimeFrac
      	}
   	  }
  	}
  }
`;

function OrganizationsTable() {
  const { data, loading, error } = useQuery<IAllOrganizations>(GET_ORGANIZATIONS);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  if (!data) {
    return <p>No data</p>;
  }
  const organizations = data.allOrganizations.edges.map(edge => ({
    ...edge.node
  }));
  return <Table dataSource={organizations} columns={columns} rowKey='orgFullName' />;
}

export default OrganizationsTable;
