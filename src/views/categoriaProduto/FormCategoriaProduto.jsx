import InputMask from "comigo-tech-react-input-mask";
import { React, useState, useEffect } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import axios from "axios";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from "../util/util";

export default function FormCategoriaProduto() {
  const [descricao, setDescricao] = useState();
  const { state } = useLocation();
  const [idCategoriaProduto, setIdCategoriaProduto] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/categoriaProduto/" + state.id)
        .then((response) => {
          setIdCategoriaProduto(response.data.id);
          setDescricao(response.data.descricao);
        });
    }
  }, [state]);

  function salvar() {
    let categoriaProdutoRequest = {
      descricao: descricao,
    };

    if (idCategoriaProduto != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/categoriaProduto/" + idCategoriaProduto, categoriaProdutoRequest)
        .then((response) => {
          notifySuccess("Categoria alterada com sucesso!");
        })
        .catch((error) => {
          if (error.response.data.errors != undefined) {
            for (let i = 0; i < error.response.data.errors.length; i++) {
              notifyError(error.response.data.errors[i].defaultMessage);
            }
          } else {
            notifyError(error.response.data.message);
          }
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/categoriaProduto", categoriaProdutoRequest)
        .then((response) => {
          notifySuccess("Categoria cadastrada com sucesso!");
        })
        .catch((error) => {
          if (error.response.data.errors != undefined) {
            for (let i = 0; i < error.response.data.errors.length; i++) {
              notifyError(error.response.data.errors[i].defaultMessage);
            }
          } else {
            notifyError(error.response.data.message);
          }
        });
    }
  }

  return (
    <div>
    <MenuSistema tela="categoriaProduto" />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCategoriaProduto === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Categoria de produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idCategoriaProduto != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Categoria de produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Editar
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
                <Form.Input
                  required
                  fluid
                  label="Categoria"
                  maxLength="100"
                  width={18}
                  placeholder="Informe a categoria"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />

                
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to="/list-categoria-produto">
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  Listar
                </Button>
              </Link>
              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
