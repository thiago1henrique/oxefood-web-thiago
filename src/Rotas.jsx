import React from 'react';
import { Route, Routes } from "react-router-dom";

// Imports das Views
import FormCliente from './views/cliente/FormCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListCliente from "./views/cliente/ListCliente";
import ListProduto from "./views/produto/ListProduto";
import ListEntregador from "./views/entregador/ListEntregador";
import ListEnderecoCliente from "./views/enderecoCliente/ListEnderecoCliente";
import FormEnderecoCliente from "./views/enderecoCliente/FormEnderecoCliente";
import FormLogin from "./views/login/FormLogin";
import {ProtectedRoute} from "./views/util/ProtectedRoute";

// Importe o seu componente de proteção aqui
// import ProtectedRoute from "./components/ProtectedRoute";

function Rotas() {
    return (
        <>
            <Routes>
                {/* Rota Pública (Login) */}
                <Route path="/" element={ <FormLogin/> } />

                {/* Rotas Protegidas */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }
                />

                {/* Cadastros (Forms) */}
                <Route
                    path="form-cliente"
                    element={
                        <ProtectedRoute>
                            <FormCliente/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="form-produto"
                    element={
                        <ProtectedRoute>
                            <FormProduto/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="form-entregador"
                    element={
                        <ProtectedRoute>
                            <FormEntregador/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="form-endereco-cliente"
                    element={
                        <ProtectedRoute>
                            <FormEnderecoCliente/>
                        </ProtectedRoute>
                    }
                />

                {/* Listagens (Lists) */}
                <Route
                    path="list-cliente"
                    element={
                        <ProtectedRoute>
                            <ListCliente/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="list-produto"
                    element={
                        <ProtectedRoute>
                            <ListProduto/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="list-entregador"
                    element={
                        <ProtectedRoute>
                            <ListEntregador/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="list-endereco-cliente"
                    element={
                        <ProtectedRoute>
                            <ListEnderecoCliente/>
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    )
}

export default Rotas;