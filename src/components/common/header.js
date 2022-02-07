import React from "react";

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;

function AppHeader() {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={''} >
        <Link to="/">
          <Menu.Item key={'filmes'}>Filmes</Menu.Item>
        </Link>
        <Link to="/clientes">
          <Menu.Item key={'clientes'}>Clientes</Menu.Item>
        </Link>
        <Link to="/locacoes">
          <Menu.Item key={'locacoes'}>Locações</Menu.Item>
        </Link>
      </Menu>
    </Header>
  );
}

export default AppHeader;
