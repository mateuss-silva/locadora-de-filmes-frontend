import React from "react";

import AppFilmes from "../components/home/lista-de-filmes";
import api from "../api/api.js";

import { Layout, Row, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;
const Filmes = () => {
  const props = {
    name: "planilha",
    maxCount: 1,
    accept: ".csv",
    action: "https://localhost:44384/api/Filme",
    headers: {
      authorization: "authorization-text",
    },
    multiple: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} Arquivo enviado com sucesso.`);
      } else if (info.file.status === "error") {
        message.error(info.file.response.mensagem, 3);
      }
    },
    beforeUpload: (arquivo) => {
      const arquivoCsv = arquivo.type === "application/vnd.ms-excel";
      if (!arquivoCsv) {
        message.error(`${arquivo.name} não é um arquivo CSV.`);
      }
      return arquivoCsv || Upload.LIST_IGNORE;
    },
  };

  const obterRelatorio = async () => {
    try {
      const response = await api.get("/Filme/relatorio");
      message.success(response.data.mensagem);
      baixarArquivo(response.data.relatorio);
    } catch ({ response }) {
      message.error(response.data.mensagem);
    }
  };
  function baixarArquivo(arquivo) {
    const link = document.createElement("a");
    link.href =
      "data:attachment/xlsx;base64," + encodeURI(arquivo.fileContents);
    link.target = "_blank";
    link.download = "relatorio.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <Row align="center" style={{ padding: 16 }}>
          <Upload {...props} showUploadList={false}>
            <Button icon={<UploadOutlined />} type="primary">
              Importar Filmes
            </Button>
          </Upload>
          <div style={{ width: "32px" }} />
          <Button type="primary" onClick={obterRelatorio}>
            Exportar Relatório
          </Button>
        </Row>
        <AppFilmes />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Locadora de Filmes ©2022 Created by Mateus
      </Footer>
    </Layout>
  );
};

export default Filmes;