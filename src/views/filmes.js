import React from "react";

import AppFilmes from "../components/home/lista-de-filmes";
import FilmesButoes from "../components/common/filmes-botoes";

import { Layout } from "antd";

const { Content, Footer } = Layout;
const Filmes = () => {
  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <AppFilmes />
        <FilmesButoes />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Locadora de Filmes ©2022 Created by Mateus
      </Footer>
    </Layout>
  );
};

export default Filmes;
