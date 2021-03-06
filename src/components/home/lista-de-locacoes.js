import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, message, Select, DatePicker } from "antd";
import moment from "moment";
import api from "../../api/api.js";

const { Option } = Select;

function AppLocacoes() {
  const tamanhoDaPagina = 10;
  const [paginaAtual, setPaginaAtual] = useState(0);

  const [carregando, setCarregando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [criando, setCriando] = useState(false);

  const [totalDeLocacoes, setTotalDeLocacoes] = useState(0);

  const [locacoes, setLocacoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [filmes, setFilmes] = useState([]);

  const [editarLocacao, setEditarLocacao] = useState(null);
  const [criarLocacao, setCriarLocacao] = useState(null);

  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

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
      render: (locacao) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              onEditarLocacao(locacao);
            }}
          >
            Editar
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              deletarLocacao(locacao.id);
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
          message.success("Locação excluída com sucesso!");
        } catch ({ response }) {
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
    } catch ({ response }) {
      message.error(response.data.mensagem);
      setCarregando(false);
    }
  };

  const obterClientes = async (busca = "") => {
    try {
      const resposta = await api.get("/cliente", {
        params: {
          busca: busca,
        },
      });

      setClientes(resposta.data.clientes);
    } catch ({ response }) {
      message.error(response.data.mensagem);
    }
  };

  const obterFilmes = async (busca = "") => {
    try {
      const resposta = await api.get("/filme", {
        params: {
          busca: busca,
        },
      });

      setFilmes(resposta.data.filmes);
    } catch ({ response }) {
      message.error(response.data.mensagem);
    }
  };

  const salvarEditacaoDeLocacao = async () => {
    if (editarLocacao) {
      try {
        var resposta = await api.put(`/locacao/${editarLocacao.id}`, {
          clienteId: editarLocacao.clienteId,
          filmeId: editarLocacao.filmeId,
          dataDeDevolucao: editarLocacao.dataDeDevolucao,
        });
        message.success(resposta.data.mensagem);
        setTotalDeLocacoes(totalDeLocacoes + 1);
      } catch ({ response }) {
        message.error(response.data.mensagem);
      }
    }
  };

  const salvarCriacaoDeLocacao = async () => {
    if (criarLocacao) {
      try {
        var resposta = await api.post("/locacao", {
          clienteId: criarLocacao.clienteId,
          filmeId: criarLocacao.filmeId,
        });
        message.success(resposta.data.mensagem);
        setTotalDeLocacoes(totalDeLocacoes + 1);
      } catch ({ response }) {
        message.error(response.data.mensagem);
      }
    }
  };

  const onEditarLocacao = (locacao) => {
    setEditarLocacao({ ...locacao });
    setFilmeSelecionado(locacao.nomeDoFilme);
    setClienteSelecionado(locacao.nomeDoCliente);
    setEditando(true);
  };

  const onCriarLocacao = () => {
    setCriarLocacao(null);
    setFilmeSelecionado(null);
    setClienteSelecionado(null);
    setCriando(true);
  };

  function onChangeCliente(clienteId) {
    if (criando) {
      setCriarLocacao({ ...criarLocacao, clienteId: clienteId });
    } else {
      setEditarLocacao({ ...editarLocacao, clienteId: clienteId });
    }
  }

  function onChangeFilme(filmeId) {
    if (criando) {
      setCriarLocacao({ ...criarLocacao, filmeId: filmeId });
    } else {
      setEditarLocacao({ ...editarLocacao, filmeId: filmeId });
    }
  }

  useEffect(() => {
    obterLocacoes();
  }, [paginaAtual, totalDeLocacoes]);

  useEffect(() => {
    obterClientes();
    obterFilmes();
  }, []);

  const locacaoValida = () => {
    if (criando) {
      return criarLocacao?.clienteId && criarLocacao?.filmeId;
    } else {
      return editarLocacao?.clienteId && editarLocacao?.filmeId;
    }
  };

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
      <div style={{ textAlign: "center", padding: "16px" }}>
        <Button
          size="large"
          type="primary"
          onClick={() => {
            onCriarLocacao();
          }}
        >
          Nova Locação
        </Button>
      </div>

      <Modal
        title={criando ? "Nova Locação" : "Editar Locação"}
        visible={editando || criando}
        onCancel={() => {
          setFilmeSelecionado(null);
          setClienteSelecionado(null);
          setCriando(false);
          setEditando(false);
        }}
        okText={criando ? "Criar" : "Salvar"}
        onOk={async () => {
          var valida = locacaoValida();

          if (valida) {
            if (criando) {
              await salvarCriacaoDeLocacao();
            } else {
              await salvarEditacaoDeLocacao();
            }

            setFilmeSelecionado(null);
            setClienteSelecionado(null);
            setCriando(false);
            setEditando(false);
          } else {
            message.error("Preencha todos os campos");
          }
        }}
      >
        <Select
          showSearch
          style={{ marginBottom: 16, width: "100%" }}
          size="large"
          value={clienteSelecionado}
          onSelect={setClienteSelecionado}
          placeholder="Selecione o cliente"
          autoClearSearchValue={true}
          optionFilterProp="children"
          onChange={(c) => onChangeCliente(c)}
          onSearch={(v) => obterClientes(v)}
          filterOption={(input, option) => {
            return (
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
          }}
        >
          {clientes.map((cliente) => (
            <Option key={cliente.id}>
              {cliente.nome + "  |  CPF: " + cliente.cpf}
            </Option>
          ))}
        </Select>

        <Select
          showSearch
          style={{ marginBottom: 16, width: "100%" }}
          size="large"
          align="center"
          placeholder="Selecione o filme"
          value={filmeSelecionado}
          onSelect={setFilmeSelecionado}
          autoClearSearchValue={true}
          optionFilterProp="children"
          onChange={onChangeFilme}
          onSearch={(v) => obterFilmes(v)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {filmes.map((filme) => (
            <Option key={filme.id}>{filme.titulo}</Option>
          ))}
        </Select>
        {criando ? (
          <></>
        ) : (
          <DatePicker
            style={{ marginBottom: 16 }}
            size="large"
            format={"DD/MM/yyyy"}
            placeholder="Data de Devolução"
            value={
              editarLocacao?.dataDeDevolucao == null
                ? null
                : moment(editarLocacao.dataDeDevolucao)
            }
            disabledDate={(date) => {
              return date && date.valueOf() > Date.now();
            }}
            onChange={(data) => {
              setEditarLocacao({ ...editarLocacao, dataDeDevolucao: data });
            }}
            style={{ width: "100%" }}
          />
        )}
      </Modal>
    </div>
  );
}

export default AppLocacoes;
