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

export default withRouter(Nav);
