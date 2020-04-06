import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "pages/About";
import Organizations from "pages/Organizations";
import OrganizationDetails from "pages/OrganizationDetails";
import Nav from "components/Nav";

const { Header, Content, Footer } = Layout;

function Site() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Nav />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            <Route exact={true} path="/" component={About} />
            <Route path="/organizations" component={Organizations} />
            <Route
              path="/organization/:organizationId"
              component={OrganizationDetails}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Router>
  );
}

export default Site;
