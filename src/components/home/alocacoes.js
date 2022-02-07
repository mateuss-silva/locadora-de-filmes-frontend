import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, message } from "antd";
import api from "../../api/api.js";

function AppLocacoes() {
  const tamanhoDaPagina = 10;
  const [paginaAtual, setPaginaAtual] = useState(0);

  const [locacoes, setLocacoes] = useState([]);
  const [totalDeLocacoes, setTotalDeLocacoes] = useState(0);
  const [carregando, setCarregando] = useState(false);

  const colunas = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Filme",
      dataIndex: "nomeDoFilme",
      key: "nomeDoFilme",
    },
    {
      title: "Cliente",
      dataIndex: "nomeDoCliente",
      key: "nomeDoCliente",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
      align: "center",
    },
    {
      title: "Data de Locação",
      dataIndex: "dataDeLocacao",
      key: "dataDeLocacao",
      align: "center",
      render: (data) => <h4>{new Date(data).toLocaleDateString()}</h4>,
    },

    {
      title: "Data de Devolução",
      dataIndex: "dataDeDevolucao",
      key: "dataDeDevolucao",
      align: "center",
      render: (data) => (
        <h4>
          {data == null ? "Pendente" : new Date(data).toLocaleDateString()}
        </h4>
      ),
    },
    {
      title: "Ações",
      key: "acoes",
      align: "center",
      render: (item) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              console.log(item);
            }}
          >
            Editar
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              deletarLocacao(item.id);
            }}
          >
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  const deletarLocacao = async (id) => {
    Modal.confirm({
      title: "Tem certeza que deseja excluir a locação?",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk: async () => {
        try {
          await api.delete(`/locacao/${id}`);
          setLocacoes(locacoes.filter((locacao) => locacao.id !== id));
        } catch ({response}) {
          message.error(response.data.mensagem);
        }
      },
    });
  };

  const obterLocacoes = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/Locacao", {
        params: {
          pegar: tamanhoDaPagina,
          pular: paginaAtual * tamanhoDaPagina,
        },
      });
      setLocacoes(response.data.locacoes);
      setTotalDeLocacoes(response.data.locacoesTotal);
      setCarregando(false);
    } catch ({response}) {
      message.error(response.data.mensagem);
      setCarregando(false);
    }
  };

  useEffect(() => {
    obterLocacoes();
  }, [paginaAtual]);

  return (
    <div id="locacoes">
      <h1 style={{ fontSize: 32, textAlign: "center", padding: 16 }}>
        Locações
      </h1>
      <Table
        pagination={{
          defaultPageSize: tamanhoDaPagina,

          total: totalDeLocacoes,
          onChange: (pagina, _) => {
            setPaginaAtual(pagina - 1);
          },
        }}
        columns={colunas}
        rowKey="id"
        dataSource={locacoes}
        loading={carregando}
      />
      <div style={{ textAlign: "center", padding: '16px' }}>
        <Button size="large" type="primary" onClick={() => {}}>
          Nova Locação
        </Button>
      </div>
    </div>
  );
}

export default AppLocacoes;
