import React, { useState } from "react";

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;

function AppHeader() {
  const [caminhoAtual, setCaminhoAtual] = useState("/");

  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["/"]}
        selectedKeys={[caminhoAtual]}
      >
        <Menu.Item key="/" onClick={() => setCaminhoAtual("/")}>
          <Link to="/">Filmes</Link>
        </Menu.Item>
        <Menu.Item key="clientes" onClick={() => setCaminhoAtual("clientes")}>
          <Link to="/clientes">Clientes</Link>
        </Menu.Item>
        <Menu.Item key="locacoes" onClick={() => setCaminhoAtual("locacoes")}>
          <Link to="/locacoes">Locações</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default AppHeader;
