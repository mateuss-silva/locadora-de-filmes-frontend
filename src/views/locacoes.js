import React from "react";

import AppLocacoes from "../components/home/lista-de-locacoes";

import { Layout } from "antd";

const { Content, Footer } = Layout;

const Locacoes = () => {
  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <AppLocacoes />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Locadora de Filmes ©2022 Created by Mateus
      </Footer>
    </Layout>
  );
};

export default Locacoes;
