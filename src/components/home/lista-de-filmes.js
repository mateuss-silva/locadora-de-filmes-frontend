import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import api from "../../api/api.js";

function AppFilmes() {
  const tamanhoDaPagina = 10;
  const [paginaAtual, setPaginaAtual] = useState(0);

  const [filmes, setFilmes] = useState([]);
  const [totalDeFilmes, setTotalDeFilmes] = useState(0);
  const [carregando, setCarregando] = useState(false);

  const colunas = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Classificação",
      dataIndex: "classificacaoIndicativa",
      key: "classificacaoIndicativa",
      align: "center",
    },
    {
      title: "Lançamento",
      dataIndex: "lancamento",
      key: "lancamento",
      align: "center",
      render: (lancamento) => <h4>{lancamento ? "Sim" : "Não"}</h4>,
    },
  ];

  const getFilmes = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/Filme", {
        params: {
          pegar: tamanhoDaPagina,
          pular: paginaAtual * tamanhoDaPagina,
        },
      });
      setFilmes(response.data.filmes);
      setTotalDeFilmes(response.data.filmesTotal);
      setCarregando(false);
    } catch ({ response }) {
      message.error(response.data.mensagem);
      setCarregando(false);
    }
  };

  useEffect(() => {
    getFilmes();
  }, [paginaAtual]);

  return (
    <div id="filmes">
      <h1 style={{ fontSize: 32, textAlign: "center", padding: 16 }}>Filmes</h1>

      <br />
      <Table
        pagination={{
          defaultPageSize: tamanhoDaPagina,
          total: totalDeFilmes,
          onChange: (pagina, _) => {
            setPaginaAtual(pagina - 1);
          },
        }}
        columns={colunas}
        rowKey="id"
        dataSource={filmes}
        loading={carregando}
      />
    </div>
  );
}

export default AppFilmes;
