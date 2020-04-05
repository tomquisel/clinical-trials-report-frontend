import gql from "graphql-tag";

export const GET_TRIALS_FOR_ORGANIZATION = gql`
  query Organizations($organizationId: Int!) {
    organizationById(id: $organizationId) {
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

export interface IOrganization {
  id: string;
  orgFullName: string;
  orgClass: string;
  totalCount: number;
  shouldHaveResultsCount: number;
  lateFrac: number;
  missingFrac: number;
  onTimeFrac: number;
  trialsByOrgId: {
    edges: Array<{ node: ITrial }>;
  };
}

export interface ITrial {
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

export interface ITrialsForOrgResponse {
  organizationById: IOrganization;
}

export const GET_ORGANIZATIONS = gql`
  query Organizations {
    allOrganizations {
      edges {
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

export interface IAllOrganizations {
  allOrganizations: {
    edges: Array<{ node: IOrganization }>;
  };
}
