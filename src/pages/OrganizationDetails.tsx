import React from "react";
import { RouteComponentProps } from "react-router-dom";
import OrganizationDetailsTable from "components/OrganizationDetailsTable";


type TParams = { organizationId: string };

function OrganizationDetails({ match }: RouteComponentProps<TParams>) {
  const organizationId = match.params.organizationId
  return (
    <div>
      {OrganizationDetailsTable(organizationId)}
    </div>
  );
}

export default OrganizationDetails;
