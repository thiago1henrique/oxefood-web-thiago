import { React, useState, useEffect } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import axios from "axios";
import MenuSistema from "../../MenuSistema";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../util/util";

export default function FormEnderecoCliente() {
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");

  const { idCliente } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [idEndereco, setIdEndereco] = useState();
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    if (idCliente && idCliente !== "undefined") {
      axios
        .get(`http://localhost:8080/api/cliente/${idCliente}`)
        .then((response) => {
          setCliente(response.data);
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

    if (state != null && state.enderecoId != null) {
      axios
        .get(`http://localhost:8080/api/cliente/${idCliente}`)
        .then((response) => {
          const enderecoEncontrado = response.data.enderecos?.find(
            (endereco) => endereco.id === state.enderecoId
          );

          if (enderecoEncontrado) {
            setIdEndereco(enderecoEncontrado.id);
            setRua(enderecoEncontrado.rua);
            setNumero(enderecoEncontrado.numero);
            setBairro(enderecoEncontrado.bairro);
            setCidade(enderecoEncontrado.cidade);
            setEstado(enderecoEncontrado.estado);
            setCep(enderecoEncontrado.cep);
            setComplemento(enderecoEncontrado.complemento || "");
          }
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
  }, [state, idCliente]);

  function salvar() {
    let enderecoRequest = {
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      cep: cep,
      complemento: complemento,
    };

    if (idEndereco != null) {

      axios
        .put(
          `http://localhost:8080/api/cliente/endereco/${idEndereco}`,
          enderecoRequest
        )
        .then((response) => {
          notifySuccess("Endereço alterado com sucesso:", response.data);
          navigate(`/list-endereco-cliente/${idCliente}`);
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
      // cadastro de novo endereço
      axios
        .post(
          `http://localhost:8080/api/cliente/endereco/${idCliente}`,
          enderecoRequest
        )
        .then((response) => {
          notifySuccess("Endereço cadastrado com sucesso:", response.data);
          navigate(`/list-endereco-cliente/${idCliente}`);
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
      <MenuSistema tela="cliente" />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEndereco === undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Cliente &nbsp;
                <Icon name="angle double right" size="small" />
                Endereço &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Cadastro
            </h2>
          )}
          {idEndereco != undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Cliente &nbsp;
                <Icon name="angle double right" size="small" />
                Endereço &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Editar {cliente.nome && `- ${cliente.nome}`}
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Rua"
                  maxLength="100"
                  placeholder="Informe o nome da rua"
                  width={15}
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Número"
                  maxLength="10"
                  width={3}
                  placeholder="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Bairro"
                  maxLength="50"
                  placeholder="Informe o bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Cidade"
                  maxLength="50"
                  placeholder="Informe a cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />

                <Form.Select
                  required
                  fluid
                  label="Estado"
                  placeholder="Selecione o estado"
                  options={[
                    { key: "ac", value: "AC", text: "Acre" },
                    { key: "al", value: "AL", text: "Alagoas" },
                    { key: "ap", value: "AP", text: "Amapá" },
                    { key: "am", value: "AM", text: "Amazonas" },
                    { key: "ba", value: "BA", text: "Bahia" },
                    { key: "ce", value: "CE", text: "Ceará" },
                    { key: "df", value: "DF", text: "Distrito Federal" },
                    { key: "es", value: "ES", text: "Espírito Santo" },
                    { key: "go", value: "GO", text: "Goiás" },
                    { key: "ma", value: "MA", text: "Maranhão" },
                    { key: "mt", value: "MT", text: "Mato Grosso" },
                    { key: "ms", value: "MS", text: "Mato Grosso do Sul" },
                    { key: "mg", value: "MG", text: "Minas Gerais" },
                    { key: "pa", value: "PA", text: "Pará" },
                    { key: "pb", value: "PB", text: "Paraíba" },
                    { key: "pr", value: "PR", text: "Paraná" },
                    { key: "pe", value: "PE", text: "Pernambuco" },
                    { key: "pi", value: "PI", text: "Piauí" },
                    { key: "rj", value: "RJ", text: "Rio de Janeiro" },
                    { key: "rn", value: "RN", text: "Rio Grande do Norte" },
                    { key: "rs", value: "RS", text: "Rio Grande do Sul" },
                    { key: "ro", value: "RO", text: "Rondônia" },
                    { key: "rr", value: "RR", text: "Roraima" },
                    { key: "sc", value: "SC", text: "Santa Catarina" },
                    { key: "sp", value: "SP", text: "São Paulo" },
                    { key: "se", value: "SE", text: "Sergipe" },
                    { key: "to", value: "TO", text: "Tocantins" },
                  ]}
                  value={estado}
                  onChange={(e, { value }) => setEstado(value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="CEP"
                  maxLength="9"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Complemento"
                  maxLength="100"
                  placeholder="Apartamento, bloco, etc (opcional)"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
                onClick={() => navigate(`/list-endereco-cliente/${idCliente}`)}
              >
                <Icon name="reply" />
                Voltar
              </Button>

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
