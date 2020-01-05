import React from "react";
import gql from "graphql-tag";
import { Table } from "antd";
import { useQuery } from "react-apollo";

const columns = [
  {
    name: "Organization",
    dataIndex: "orgFullName",
    key: "orgFullName",
  },
  {
    title: "Trials",
    dataIndex: "totalCount",
    key: "totalCount",
  },
  {
    title: "Results on time (%)",
    dataIndex: "onTimeFrac",
    key: "onTimeFrac",
  },
  {
    title: "Results late (%)",
    dataIndex: "lateFrac",
    key: "lateFrac",
  },
  {
    title: "Results unreported (%)",
    dataIndex: "missingFrac",
    key: "missingFrac",
  },
];

interface IOrganizationEdge {
  node: {
    orgFullName: string;
    totalCount: number;
    shouldHaveResultsCount: number;
    lateFrac: number;
    missingFrac: number;
    onTimeFrac: number;
  }
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
console.log(GET_ORGANIZATIONS)

function Organizations() {
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
  return <Table dataSource={organizations} columns={columns} />;
}

export default Organizations;
