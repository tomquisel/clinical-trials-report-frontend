import React from "react";
import gql from "graphql-tag";
import { Table } from "antd";
import { useQuery } from "react-apollo";

const columns = [
  {
    name: "Institution",
    dataIndex: "orgName",
    key: "orgName",
  },
  {
    title: "Type",
    dataIndex: "orgType",
    key: "orgType",
  },
  {
    title: "Trials Ready for Report",
    dataIndex: "readyForReportCount",
    key: "readyForReportCount",
  },
  {
    title: "Trials Late",
    dataIndex: "lateReportCount",
    key: "lateReportCount",
  },
  {
    title: "Results late (%)",
    dataIndex: "lateReportRate",
    key: "lateReportRate",
  },
];

interface IInstitution {
  orgName: string;
  orgType: string;
  lateReportCount: number;
  readyForReportCount: number;
  lateReportRate: number;
}

interface IInstitutions {
  allInstitutions: IInstitutionNodes;
}

interface IInstitutionNodes {
  nodes: IInstitution[];
}

const GET_INSTITUTIONS = gql`
  query {
    allInstitutions {
      nodes {
        orgName
        orgType
        lateReportCount
        readyForReportCount
        lateReportRate
      }
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
  const institutions = data.allInstitutions.nodes.map((ins, index) => ({
    ...ins,
    key: index,
  })).sort(
    (a,b) => (a.readyForReportCount > b.readyForReportCount) ? -1 : (a.readyForReportCount < b.readyForReportCount) ? 1 : 0
  );
  return <Table dataSource={institutions} columns={columns} />;
}

export default Institutions;
