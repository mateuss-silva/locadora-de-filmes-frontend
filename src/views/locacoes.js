import React from "react";

import AppLocacoes from "../components/home/lista-de-locacoes";

import { Layout } from "antd";

const { Content } = Layout;

const Locacoes = () => {
  return (
    <Layout style={{ minHeight: "80vh" }}>
      <Content>
        <div style={{ margin: "0 50px" }}>
          <AppLocacoes />
        </div>
      </Content>
    </Layout>
  );
};

export default Locacoes;
