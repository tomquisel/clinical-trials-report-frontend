import React from "react";
import { RouteComponentProps } from "react-router-dom";
import OrganizationDetailsTable from "components/OrganizationDetailsTable";

type TParams = { orgId: string; orgName: string };

function OrganizationDetails({ match }: RouteComponentProps<TParams>) {
  const { orgId } = match.params;
  return <div>{OrganizationDetailsTable(orgId)}</div>;
}

export default OrganizationDetails;
