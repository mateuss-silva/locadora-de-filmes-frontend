import React from "react";

import AppFilmes from "../components/home/lista-de-filmes";
import FilmesButoes from "../components/common/filmes-botoes";

import { Layout } from "antd";

const { Content } = Layout;
const Filmes = () => {
  return (
    <Layout style={{ minHeight: "80vh" }}>
      <Content>
        <div style={{ margin: "0 50px" }}>
          <AppFilmes />
          <FilmesButoes />
        </div>
      </Content>
    </Layout>
  );
};

export default Filmes;
