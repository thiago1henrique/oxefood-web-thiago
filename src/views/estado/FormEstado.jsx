import InputMask from "comigo-tech-react-input-mask";
import { React, useState, useEffect } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import axios from "axios";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";

export default function FormEstado() {
  const [nome, setNome] = useState();
  const [sigla, setSigla] = useState();
  const { state } = useLocation();
  const [idEstado, setIdEstado] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/estado/" + state.id)
        .then((response) => {
          setIdEstado(response.data.id);
          setNome(response.data.nome);
          setSigla(response.data.sigla);
        });
    }
  }, [state]);

  function salvar() {
    let estadoRequest = {
      nome: nome,
      sigla: sigla
    };

    if (idEstado != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/estado/" + idEstado, estadoRequest)
        .then((response) => {
          console.log("Estado alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alterar o estado.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/estado", estadoRequest)
        .then((response) => {
          console.log("Estado cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o estado.");
        });
    }
  }

  return (
    <div>
    <MenuSistema tela="estado" />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEstado === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Estado &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEstado != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Estado &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Editar
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
                <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  width={15}
                  placeholder="Informe o nome do estado"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label="Sigla"
                  maxLength="100"
                  width={3}
                  placeholder="Informe a sigla"
                  value={sigla}
                  onChange={(e) => setSigla(e.target.value)}
                />

                </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to="/list-estado">
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
