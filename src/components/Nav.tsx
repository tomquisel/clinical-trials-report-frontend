import React from "react";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";

function Nav({ location }: { location: { pathname: string } }) {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: "64px" }}
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key="/">
        <Link to="/">About</Link>
      </Menu.Item>
      <Menu.Item key="/institutions">
        <Link to="/institutions">Institutions</Link>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(Nav);
