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
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/organizations">
        <Link to="/organizations">Organizations</Link>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(Nav);
