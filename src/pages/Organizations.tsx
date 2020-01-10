import React from "react";
import { Button } from "antd";
import OrganizationsTable from "components/OrganizationsTable";

function Organizations() {
  return (
    <div>
      <h1>Organizations</h1>
      <Button type="primary">Button (I do nothing)</Button>
      <OrganizationsTable />
    </div>
  );
}

export default Organizations;
