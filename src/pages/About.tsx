import React from "react";
import { Space, Typography } from "antd";
import OrganizationsTable from "components/OrganizationsTable";

const { Text } = Typography;

function Home() {
  return (
    <Space direction="vertical" size="large">
      <div>
        <h1>Accountable Clinical Trials</h1>
        <Text>
          Publication bias is a major obstacle to scientific progress. Without a
          full view of clinical trial results, both positive and negative, the
          scientific community ends up drawing incorrect conclusions. The
          National Institutes of Health launched{" "}
          <a href="https://clinicaltrials.gov">clinicaltrials.gov</a> to address
          this issue by:
          <ul>
            <li>requiring trial preregistration</li>
            <li>requiring trials to publicly report results</li>
          </ul>
          for studies involving FDA-regulated drugs and devices.
        </Text>
        <h2>The Reality</h2>
        <Text>
          For the most part, it hasn't worked out. Universities and pharma
          companies frequently report results late or not at all. This website
          is here to hold research institutions to a higher standard. Let's see
          who is making a strong effort, and who needs to improve.
        </Text>
      </div>
      <div>
        <OrganizationsTable />
      </div>
    </Space>
  );
}

export default Home;
