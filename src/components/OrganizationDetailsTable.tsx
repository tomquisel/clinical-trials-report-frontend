import React from "react";
import gql from "graphql-tag";
import { Table } from "antd";
import { useQuery } from "react-apollo";


interface IOrganization {
  id: string;
  orgFullName: string;
  totalCount: number;
  shouldHaveResultsCount: number;
  lateFrac: number;
  missingFrac: number;
  onTimeFrac: number;
  trialsByOrgId: {
    edges: {
      node: ITrial
    }[]
  }
}

interface ITrial {
  id: string;
  officialTitle: string;
  overallStatus: string;
  startDate: string;
  resultsFirstPostDate: string;
  resultsFirstSubmitDate: string;
}

interface ITrialsForOrgResponse {
  organizationById: IOrganization;
}

const GET_TRIALS_FOR_ORGANIZATION = gql`
  query Organizations( $organizationId: Int!) {
    organizationById( id: $organizationId ) {
      id
      orgFullName
      orgClass
      trialsByOrgId {
        edges {
          node {
            id
            officialTitle
            overallStatus
            startDate
            resultsFirstPostDate
            resultsFirstSubmitDate
          }
        }
      }
    }
  }
`;

function NullStringSorterFunction(sorter: (a: string, b: string) => number): (a: string, b: string) => number {
  function NewSorter(a: string, b: string) {
    if (a === null) {
      return 1;
    }
    else if (b === null) {
      return -1;
    }
    else {
      return sorter(a, b)
    }
  }
  return NewSorter
}

function CompareStrings(a: string, b: string): number {
  return a.localeCompare(b)
}

function CompareDateStrings(a: string, b: string): number {
  return Date.parse(a) - Date.parse(b)
}

const columns = [
  {
    title: "Study Title",
    dataIndex: "officialTitle",
    key: "officialTitle",
    sorter: (a: ITrial, b: ITrial) => (
      NullStringSorterFunction(CompareStrings)(
        a.officialTitle,
        b.officialTitle,
      )
    )
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    sorter: (a: ITrial, b: ITrial) => NullStringSorterFunction(CompareDateStrings)(a.startDate, b.startDate)
  },
  {
    title: "Results Submitted",
    dataIndex: "resultsFirstSubmitDate",
    key: "resultsFirstSubmitDate",
    sorter: (a: ITrial, b: ITrial) => NullStringSorterFunction(CompareDateStrings)(
      a.resultsFirstSubmitDate,
      b.resultsFirstSubmitDate
    )
  },
]

function OrganizationDetailsTable(organizationId: string) {
  const { data, loading, error } = useQuery<ITrialsForOrgResponse>(
    GET_TRIALS_FOR_ORGANIZATION, { variables: { organizationId: parseInt(organizationId) } },
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
  console.log(Date.parse(data.organizationById.trialsByOrgId.edges[0].node.startDate))
  const org_trials = data.organizationById.trialsByOrgId.edges.map(edge => ({...edge.node}));
  return <div>
  <h1>Organization Details</h1>
  <h2>{data.organizationById.orgFullName}</h2>
  <Table dataSource={org_trials} columns={columns} rowKey='id' />;
  </div>
}

export default OrganizationDetailsTable;
