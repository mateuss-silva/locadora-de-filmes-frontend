import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Input, DatePicker, message } from "antd";
import { UserOutlined, IdcardOutlined } from "@ant-design/icons";
import moment from "moment";
import api from "../../api/api.js";

function AppClientes() {
  const tamanhoDaPagina = 10;
  const [paginaAtual, setPaginaAtual] = useState(0);

  const [clientes, setClientes] = useState([]);
  const [totalDeClientes, setTotalDeClientes] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [criando, setCriando] = useState(false);
  const [editarCliente, setEditarCliente] = useState(null);
  const [criarCliente, setCriarCliente] = useState(null);

  const colunas = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "dataDeNascimento",
      key: "dataDeNascimento",
      align: "center",
      render: (data) => <h4>{new Date(data).toLocaleDateString()}</h4>,
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
      align: "center",
    },
    {
      title: "Ações",
      key: "acoes",
      align: "center",
      render: (cliente) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              onEditarCliente(cliente);
            }}
          >
            Editar
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              deletarCliente(cliente.id);
            }}
          >
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  const onEditarCliente = (cliente) => {
    setEditando(true);
    setEditarCliente({ ...cliente });
  };

  const onCriarCliente = () => {
    setCriando(true);
    setCriarCliente({ nome: "", dataDeNascimento: null, cpf: "" });
  };

  const deletarCliente = async (id) => {
    Modal.confirm({
      title: "Tem certeza que deseja excluir este cliente?",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk: async () => {
        try {
          await api.delete(`/cliente/${id}`);
          setClientes(clientes.filter((cliente) => cliente.id !== id));
        } catch ({ response }) {
          message.error(response.data.mensagem);
        }
      },
    });
  };

  const getClientes = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/Cliente", {
        params: {
          pegar: tamanhoDaPagina,
          pular: paginaAtual * tamanhoDaPagina,
        },
      });
      setClientes(response.data.clientes);
      setTotalDeClientes(response.data.clientesTotal);
      setCarregando(false);
    } catch ({ response }) {
      message.error(response.data.mensagem);
      setCarregando(false);
    }
  };

  const salvarEditacaoDeCliente = async () => {
    if (editarCliente) {
      try {
        var resposta = await api.put(
          `/cliente/${editarCliente.id}`,
          editarCliente
        );
        setClientes(
          clientes.map((cliente) => {
            if (cliente.id === editarCliente.id) {
              return editarCliente;
            }
            return cliente;
          })
        );
        message.success(resposta.data.mensagem);
      } catch ({ response }) {
        message.error(response.data.mensagem);
      }
    }
    reiniciarEdicao();
  };

  const salvarCriacaoDeCliente = async () => {
    if (criarCliente) {
      try {
        var resposta = await api.post("/cliente", criarCliente);
        console.log(resposta);
        setClientes([...clientes, { ...criarCliente, id: resposta.data.id }]);
        setTotalDeClientes(totalDeClientes + 1);
        message.success(resposta.data.mensagem);
      } catch ({ response }) {
        message.error(response.data.mensagem);
      }
    }
    reiniciarCriacao();
  };

  const reiniciarEdicao = () => {
    setEditando(false);
    setEditarCliente(null);
  };

  const reiniciarCriacao = () => {
    setCriando(false);
    setCriarCliente(null);
  };

  useEffect(() => {
    getClientes();
  }, [paginaAtual]);

  return (
    <div id="clientes">
      <h1 style={{ fontSize: 32, textAlign: "center", padding: 16 }}>
        Clientes
      </h1>
      <Table
        pagination={{
          defaultPageSize: tamanhoDaPagina,
          total: totalDeClientes,
          onChange: (pagina, _) => {
            setPaginaAtual(pagina - 1);
          },
        }}
        columns={colunas}
        rowKey="id"
        dataSource={clientes}
        loading={carregando}
      />
      <div style={{ textAlign: "center", padding: "16px" }}>
        <Button
          size="large"
          type="primary"
          onClick={() => {
            onCriarCliente();
          }}
        >
          Novo Cliente
        </Button>
      </div>
      <Modal
        title={criando ? "Criar Cliente" : "Editar Cliente"}
        visible={editando || criando}
        onCancel={() => {
          if (criando) {
            reiniciarCriacao();
          } else {
            reiniciarEdicao();
          }
        }}
        okText={criando ? "Criar" : "Salvar"}
        onOk={criando ? salvarCriacaoDeCliente : salvarEditacaoDeCliente}
      >
        <Input
          style={{ marginBottom: 16 }}
          size="large"
          placeholder="Nome do cliente"
          value={criando ? criarCliente?.nome : editarCliente?.nome}
          prefix={<UserOutlined />}
          onChange={(e) => {
            if (criando) {
              setCriarCliente({ ...criarCliente, nome: e.target.value });
            } else {
              setEditarCliente({ ...editarCliente, nome: e.target.value });
            }
          }}
        ></Input>
        <Input
          style={{ marginBottom: 16 }}
          size="large"
          placeholder="CPF"
          maxLength={11}
          value={criando ? criarCliente?.cpf : editarCliente?.cpf}
          prefix={<IdcardOutlined />}
          onChange={(e) => {
            if (criando) {
              setCriarCliente({ ...criarCliente, cpf: e.target.value });
            } else {
              setEditarCliente({ ...editarCliente, cpf: e.target.value });
            }
          }}
        ></Input>
        <DatePicker
          style={{ marginBottom: 16 }}
          size="large"
          format={"DD/MM/yyyy"}
          placeholder="Data de nascimento"
          value={
            criando
              ? criarCliente?.dataDeNascimento
              : moment(editarCliente?.dataDeNascimento)
          }
          disabledDate={(date) => {
            return date && date.valueOf() > Date.now();
          }}
          onChange={(data) => {
            if (criando) {
              setCriarCliente({ ...criarCliente, dataDeNascimento: data });
            } else {
              setEditarCliente({ ...editarCliente, dataDeNascimento: data });
            }
          }}
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
}

export default AppClientes;
