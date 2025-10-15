import InputMask from "comigo-tech-react-input-mask";
import { React, useState, useEffect } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import axios from "axios";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from "../util/util";

export default function FormCidade() {
  const [nome, setNome] = useState();
  const [qtdPopulacao, setQtdPopulacao] = useState();
  const [ehCapital, setEhCapital] = useState();
  const [dataFundacao, setDataFundacao] = useState();
  const [listaEstado, setListaEstado] = useState([]);
  const [idEstado, setIdEstado] = useState();
  const [idCidade, setIdCidade] = useState();
  const { state } = useLocation();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/cidade/" + state.id)
        .then((response) => {
          setIdCidade(response.data.id);
          setNome(response.data.nome);
          setQtdPopulacao(response.data.qtdPopulacao);
          setEhCapital(response.data.ehCapital);
          setDataFundacao(formatarData(response.data.dataFundacao));
          setIdEstado(response.data.estado.id);
        });
    }
    axios.get("http://localhost:8080/api/estado").then((response) => {
      const dropDownEstados = response.data.map((e) => ({
        text: e.sigla,
        value: e.id,
      }));
      setListaEstado(dropDownEstados);
    });
  }, [state]);

  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

  function salvar() {
    let cidadeRequest = {
      idEstado: idEstado,
      nome: nome,
      qtdPopulacao: qtdPopulacao,
      ehCapital: ehCapital === true || ehCapital === "true",
      dataFundacao: dataFundacao,
    };

    if (idCidade != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/cidade/" + idCidade, cidadeRequest)
        .then((response) => {
          notifySuccess("Cidade alterada com sucesso!");
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
        .post("http://localhost:8080/api/cidade", cidadeRequest)
        .then((response) => {
          notifySuccess("Cidade cadastrada com sucesso!");
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
      <MenuSistema tela="cidade" />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCidade === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cidade &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idCidade != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cidade &nbsp;
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
                  width={9}
                  placeholder="Informe o nome da cidade"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                ></Form.Input>
                <Form.Input
                  required
                  fluid
                  label="Número de habitantes"
                  maxLength="100"
                  width={9}
                  placeholder="Informe o número de habitantes"
                  value={qtdPopulacao}
                  onChange={(e) => setQtdPopulacao(e.target.value)}
                ></Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input required fluid label="Data de fundação" width={9}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataFundacao}
                    onChange={(e) => setDataFundacao(e.target.value)}
                  />
                </Form.Input>
                <Form.Select
                  required
                  fluid
                  tabIndex="3"
                  width={9}
                  placeholder="Selecione"
                  label="Estado"
                  options={listaEstado}
                  value={idEstado}
                  onChange={(e, { value }) => {
                    setIdEstado(value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <label>
                  <strong>É capital?: </strong>
                </label>
                <Form.Radio
                  label="Sim"
                  style={{ marginTop: "4%" }}
                  value={true}
                  checked={ehCapital === true || ehCapital === "true"}
                  onChange={(e, { value }) => setEhCapital(value)}
                ></Form.Radio>
                <Form.Radio
                  label="Não"
                  style={{ marginTop: "4%" }}
                  value={false}
                  checked={!ehCapital || ehCapital === "false"}
                  onChange={(e, { value }) => setEhCapital(value)}
                ></Form.Radio>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to="/list-cidade">
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
