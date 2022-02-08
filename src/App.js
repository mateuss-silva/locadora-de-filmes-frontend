import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "./components/common/header";
import { Layout } from "antd";
const { Header, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Header>
        <AppHeader />
      </Header>
      <Routes />
      <Footer>
        <div
          style={{
            textAlign: "center",
            padding: "16px",
            height: "50px",
          }}
        >
          <h4>Locadora de Filmes ©2022 Created by Mateus</h4>
        </div>
      </Footer>
    </BrowserRouter>
  );
}

export default App;
