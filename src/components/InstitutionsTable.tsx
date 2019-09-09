import React from "react";
import gql from "graphql-tag";
import { Table } from "antd";
import { useQuery } from "react-apollo";

const columns = [
  {
    name: "Institution",
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

interface IInstitution {
  name: string;
  trials: number;
  ontime: number;
  late: number;
  missing: number;
}

interface IInstitutions {
  institutions: IInstitution[];
}

const GET_INSTITUTIONS = gql`
  query Institutions {
    institutions @client {
      name
      trials
      ontime
      late
      missing
    }
  }
`;

function Institutions() {
  const { data, loading, error } = useQuery<IInstitutions>(GET_INSTITUTIONS);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  if (!data) {
    return <p>No data</p>;
  }
  const institutions = data.institutions.map((ins, index) => ({
    ...ins,
    key: index,
  }));
  return <Table dataSource={institutions} columns={columns} />;
}

export default Institutions;
