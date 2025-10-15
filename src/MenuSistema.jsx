import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function MenuSistema(props) {
  return (
    <>
      <Menu inverted>
        <Menu.Item
          content="Home"
          active={props.tela === "home"}
          as={Link}
          to="/"
        />
        <Menu.Item
          content="Cliente"
          active={props.tela === "cliente"}
          as={Link}
          to='/list-cliente'
        />
        <Menu.Item
          content="Produto"
          active={props.tela === "produto"}
          as={Link}
          to="/list-produto"
        />

        <Menu.Item
          content="Entregador"
          active={props.tela === "entregador"}
          as={Link}
          to="/list-entregador"
        />

        <Menu.Item
          content="Categoria de produto"
          active={props.tela === "categoriaProduto"}
          as={Link}
          to="/list-categoria-produto"
        />

        <Menu.Item
          content="Cidade"
          active={props.tela === "cidade"}
          as={Link}
          to="/list-cidade"
        />

        <Menu.Item
          content="Estado"
          active={props.tela === "estado"}
          as={Link}
          to="/list-estado"
        />
      </Menu>
    </>
  );
}
