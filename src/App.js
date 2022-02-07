import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "./components/common/header";
import { Layout } from "antd";
const { Header } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Header>
        <AppHeader />
      </Header>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
