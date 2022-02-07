import React, {  } from 'react';

import { Layout, Menu } from 'antd';

const { Header } = Layout;

function AppHeader() {

  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
           <Menu.Item key={1}>Filmes</Menu.Item>
           <Menu.Item key={2}>Clientes</Menu.Item>
           <Menu.Item key={3}>Alocações</Menu.Item>
      </Menu>
    </Header>
  );
}

export default AppHeader;