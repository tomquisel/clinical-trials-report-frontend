import React from "react";
import { Layout, Menu } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Home from "pages/Home";
import Institutions from "pages/Institutions";

const { Header, Content, Footer } = Layout;

function Nav({ location }: { location: { pathname: string } }) {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: "64px" }}
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/institutions">
        <Link to="/institutions">Institutions</Link>
      </Menu.Item>
    </Menu>
  );
}

const RoutedNav = withRouter(Nav);

function Site() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <RoutedNav />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            <Route exact={true} path="/" component={Home} />
            <Route path="/institutions" component={Institutions} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Footer</Footer>
      </Layout>
    </Router>
  );
}

export default Site;
