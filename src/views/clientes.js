import React from "react";

import AppClientes from "../components/home/lista-de-clientes";

import { Layout } from "antd";

const { Content, Footer } = Layout;

const Clientes = () => {
  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <AppClientes />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Locadora de Filmes ©2022 Created by Mateus
      </Footer>
    </Layout>
  );
};

export default Clientes;
