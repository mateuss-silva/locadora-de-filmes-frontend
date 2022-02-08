import React from "react";

import AppClientes from "../components/home/lista-de-clientes";

import { Layout } from "antd";

const { Content } = Layout;

const Clientes = () => {
  return (
    <Layout style={{ minHeight: "80vh" }}>
      <Content>
        <div style={{ margin: "0 50px" }}>
          <AppClientes />
        </div>
      </Content>
    </Layout>
  );
};

export default Clientes;
