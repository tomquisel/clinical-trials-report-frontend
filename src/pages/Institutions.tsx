import React from "react";
import { Button } from "antd";
import InstitutionsTable from "components/InstitutionsTable";

function Institutions() {
  return (
    <div>
      <h1>Institutions</h1>
      <Button type="primary">Button (I do nothing)</Button>
      <InstitutionsTable />
    </div>
  );
}

export default Institutions;
