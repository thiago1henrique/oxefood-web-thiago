import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  Header,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/util";

export default function ListEnderecoCliente() {
  const [listaEnderecos, setListaEnderecos] = useState([]);
  const [cliente, setCliente] = useState({});
  const { idCliente } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarDados();
  }, [idCliente]);

  function carregarDados() {
    axios
      .get(`http://localhost:8080/api/cliente/${idCliente}`)
      .then((response) => {
        setCliente(response.data);
        setListaEnderecos(response.data.enderecos || []);
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

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function removerEndereco() {
    await axios
      .delete(`http://localhost:8080/api/cliente/endereco/${idRemover}`)
      .then((response) => {
        notifySuccess("Endereço removido com sucesso.");
        carregarDados(); // recarrega a lista
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
    setOpenModal(false);
  }
  return (
    <div>
      <MenuSistema tela={"cliente"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Cliente &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Endereços de {cliente.nome}
          </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Link to={"/list-cliente"}>
            <Button
              type="button"
              inverted
              circular
              icon
              labelPosition="left"
              color="orange"
            >
              <Icon name="reply" />
              Voltar
            </Button>
          </Link>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to={`/form-endereco-cliente/${idCliente}`}
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Rua</Table.HeaderCell>
                  <Table.HeaderCell>Número</Table.HeaderCell>
                  <Table.HeaderCell>Bairro</Table.HeaderCell>
                  <Table.HeaderCell>Cidade</Table.HeaderCell>
                  <Table.HeaderCell>Estado</Table.HeaderCell>
                  <Table.HeaderCell>CEP</Table.HeaderCell>
                  <Table.HeaderCell>Complemento</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {listaEnderecos.map((endereco) => (
                  <Table.Row key={endereco.id}>
                    <Table.Cell>{endereco.rua}</Table.Cell>
                    <Table.Cell>{endereco.numero}</Table.Cell>
                    <Table.Cell>{endereco.bairro}</Table.Cell>
                    <Table.Cell>{endereco.cidade}</Table.Cell>
                    <Table.Cell>{endereco.estado}</Table.Cell>
                    <Table.Cell>{endereco.cep}</Table.Cell>
                    <Table.Cell>{endereco.complemento || "-"}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Link
                        to={`/form-endereco-cliente/${idCliente}`}
                        state={{ enderecoId: endereco.id }}
                      >
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste endereço"
                          icon
                        >
                          <Icon name="edit" />
                        </Button>
                      </Link>
                      <Button
                        inverted
                        circular
                        color="red"
                        onClick={(e) => confirmaRemover(endereco.id)}
                        title="Clique aqui para remover este endereço"
                        icon
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Header icon>
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            {" "}
            Tem certeza que deseja remover esse endereço?{" "}
          </div>
        </Header>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => setOpenModal(false)}
          >
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted onClick={() => removerEndereco()}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
