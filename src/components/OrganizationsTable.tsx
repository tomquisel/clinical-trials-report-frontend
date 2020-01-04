import React from "react";
import gql from "graphql-tag";
import { Table } from "antd";
import { useQuery } from "react-apollo";

const columns = [
  {
    name: "Organization",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Trials",
    dataIndex: "trials",
    key: "trials",
  },
  {
    title: "Results on time (%)",
    dataIndex: "ontime",
    key: "ontime",
  },
  {
    title: "Results late (%)",
    dataIndex: "late",
    key: "late",
  },
  {
    title: "Results unreported (%)",
    dataIndex: "missing",
    key: "missing",
  },
];

interface IOrganization {
  name: string;
  trials: number;
  ontime: number;
  late: number;
  missing: number;
}

interface IOrganizations {
  organizations: IOrganization[];
}

const GET_INSTITUTIONS = gql`
  query Organizations {
    organizations @client {
      name
      trials
      ontime
      late
      missing
    }
  }
`;

function Organizations() {
  const { data, loading, error } = useQuery<IOrganizations>(GET_INSTITUTIONS);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  if (!data) {
    return <p>No data</p>;
  }
  const organizations = data.organizations.map((ins, index) => ({
    ...ins,
    key: index,
  }));
  return <Table dataSource={organizations} columns={columns} />;
}

export default Organizations;
