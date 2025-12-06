import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListCliente from "./views/cliente/ListCliente";
import ListProduto from "./views/produto/ListProduto";
import ListEntregador from "./views/entregador/ListEntregador";
import ListEnderecoCliente from "./views/enderecoCliente/ListEnderecoCliente";
import FormEnderecoCliente from "./views/enderecoCliente/FormEnderecoCliente";

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />

                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="list-produto" element={ <ListProduto/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />

                <Route path="list-endereco-cliente" element={ <ListEnderecoCliente/> } />
                <Route path="form-endereco-cliente" element={ <FormEnderecoCliente/> } />
            </Routes>
        </>
    )
}

export default Rotas
