import React from "react";
import gql from "graphql-tag";
import { Table } from "antd";
import { SortOrder } from "antd/lib/table/interface"
import { useQuery } from "react-apollo";
import { FracToPercent } from "../utils/display_utils"


interface IOrganization {
  id: string;
  orgFullName: string;
  orgClass: string;
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
  primaryCompletionDate: string;
  briefTitle: string;
  overallStatus: string;
  resultsFirstPostDate: string;
  resultsFirstSubmitDate: string;
  shouldHaveResults: boolean;
  startDate: string;
  lastUpdateSubmitDate: string;
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
      totalCount
      shouldHaveResultsCount
      lateFrac
      missingFrac
      onTimeFrac
      trialsByOrgId {
        edges {
          node {
            id
            primaryCompletionDate
            briefTitle
            overallStatus
            resultsFirstPostDate
            resultsFirstSubmitDate
            shouldHaveResults
            startDate
            lastUpdateSubmitDate
          }
        }
      }
    }
  }
`;

function NullStringSorterFunction(sorter: (a: string, b: string) => number, null_at_end=true): (a: string, b: string) => number {
  function NewSorter(a: string, b: string) {
    const null_val = (null_at_end) ? 1 : -1
    if (a === null) {
      return null_val;
    }
    else if (b === null) {
      return -null_val;
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

let default_sort: SortOrder;
default_sort = 'descend'

const columns = [
  {
    title: "Study Title",
    dataIndex: "briefTitle",
    key: "briefTitle",
    sorter: (a: ITrial, b: ITrial) => (
      NullStringSorterFunction(CompareStrings)(
        a.briefTitle,
        b.briefTitle,
      )
    ),
    //render: (text: string, record: ITrial) => <Link to={'/organization/' + record.id}>{text}</Link>,
    render: (text: string, record: ITrial) => <a href={'https://clinicaltrials.gov/ct2/show/' + record.id}>{text}</a>,
    filters: [{text: 'Results Due', value: '1'}],
    onFilter: (value: string, record: ITrial) => record.shouldHaveResults,
    filteredValue: ['1']
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    sorter: (a: ITrial, b: ITrial) => NullStringSorterFunction(CompareDateStrings, false)(a.startDate, b.startDate)
  },
  {
    title: "Completion Date",
    dataIndex: "primaryCompletionDate",
    key: "primaryCompletionDate",
    sorter: (a: ITrial, b: ITrial) => NullStringSorterFunction(CompareDateStrings, false)(a.primaryCompletionDate, b.primaryCompletionDate),
    defaultSortOrder: default_sort,
  },
  {
    title: "Results Submitted",
    dataIndex: "resultsFirstSubmitDate",
    key: "resultsFirstSubmitDate",
    sorter: (a: ITrial, b: ITrial) => NullStringSorterFunction(CompareDateStrings, false)(
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
  <p>Class: {data.organizationById.orgClass}</p>
  <p>Trials with results due: {data.organizationById.shouldHaveResultsCount}</p>
  <p>Results on time (%): {FracToPercent(data.organizationById.onTimeFrac)}</p>
  <p>Results late (%): {FracToPercent(data.organizationById.lateFrac)}</p>
  <p>Results unreported (%): {FracToPercent(data.organizationById.missingFrac)}</p>
  <Table dataSource={org_trials} columns={columns} rowKey='id' />;
  </div>
}

export default OrganizationDetailsTable;
