import React from "react";
import { Route, Routes } from "react-router-dom";

import Filmes from "./views/filmes";
import Clientes from "./views/clientes";
import Locacoes from "./views/locacoes";

const RoutesApp = () => {
  return (
      <Routes>
        <Route element={<Filmes />} path="/" exact />
        <Route element={<Clientes />} path="/clientes" />
        <Route element={<Locacoes />} path="/locacoes" />
      </Routes>
  );
};

export default RoutesApp;
