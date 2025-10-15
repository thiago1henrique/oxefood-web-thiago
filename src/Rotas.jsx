import { Route, Routes } from "react-router-dom";
import FormCliente from "./views/cliente/FormCliente";
import ListCliente from "./views/cliente/ListCliente";
import FormEntregador from "./views/entregador/FormEntregador";
import ListEntregador from "./views/entregador/ListEntregador";
import Home from "./views/home/Home";
import FormProduto from "./views/produto/FormProduto";
import ListProduto from "./views/produto/ListProduto";
import FormCategoriaProduto from "./views/categoriaProduto/FormCategoriaProduto";
import ListCategoriaProduto from "./views/categoriaProduto/ListCategoriaProduto";
import ListEnderecoCliente from "./views/cliente/ListEnderecoCliente";
import FormEnderecoCliente from "./views/cliente/FormEnderecoCliente";
import FormCidade from "./views/cidade/FormCidade";
import ListCidade from "./views/cidade/ListCidade";
import FormEstado from "./views/estado/FormEstado";
import ListEstado from "./views/estado/ListEstado";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form-cliente" element={<FormCliente />} />
        <Route path="list-cliente" element={ <ListCliente/> } />
        <Route path="/list-endereco-cliente/:idCliente" element={<ListEnderecoCliente />} />
        <Route path="/form-endereco-cliente/:idCliente" element={<FormEnderecoCliente />} />
        <Route path="form-produto" element={<FormProduto />} />
        <Route path="list-produto" element={ <ListProduto/> } />
        <Route path="form-entregador" element={<FormEntregador />} />
        <Route path="list-entregador" element={ <ListEntregador/> } />
        <Route path="form-categoria-produto" element={<FormCategoriaProduto />} />
        <Route path="list-categoria-produto" element={ <ListCategoriaProduto/> } />
        <Route path="form-cidade" element={<FormCidade />} />
        <Route path="list-cidade" element={<ListCidade/>} />
        <Route path="form-estado" element={<FormEstado />} />
        <Route path="list-estado" element={<ListEstado/>} />
      </Routes>
    </>
  );
}

export default Rotas;
