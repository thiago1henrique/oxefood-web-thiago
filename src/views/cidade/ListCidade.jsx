import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  Header,
  ModalDescription,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/util";

export default function ListCidade() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [cidadeDetalhes, setCidadeDetalhes] = useState(null);

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/cidade").then((response) => {
      setLista(response.data);
    });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

   function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

    function abrirDetalhesCidade(id) {
      const cidadeSelecionada = lista.find(cidade => cidade.id === id);
      setCidadeDetalhes(cidadeSelecionada);
      setOpenModal2(true);
  }
  async function remover() {
    await axios
      .delete("http://localhost:8080/api/cidade/" + idRemover)
      .then((response) => {
        notifySuccess("Cidade removida com sucesso.");

        axios.get("http://localhost:8080/api/cidade").then((response) => {
          setLista(response.data);
        });
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
      <MenuSistema tela={"cidade"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Cidade </h2>
          <Divider />
          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-cidade"
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Estado</Table.HeaderCell>
                  <Table.HeaderCell>Detalhes</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {lista.map((cidade) => (
                  <Table.Row key={cidade.id}>
                    <Table.Cell width={5}>{cidade.nome}</Table.Cell>
                    <Table.Cell width={5}>{cidade.estado.sigla}</Table.Cell>
                    <Table.Cell width={2} textAlign="center">
                        <Button
                        inverted
                        color="orange"
                        onClick={(e) => abrirDetalhesCidade(cidade.id)}
                        title="Clique aqui para ver detalhes desta cidade"
                        icon
                      >
                        Ver detalhes
                      </Button>
                    </Table.Cell>
                    <Table.Cell width={6} textAlign="center">
                        
                      <Link to="/form-cidade" state={{ id: cidade.id }}>
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados desta cidade"
                          icon
                        >
                          <Icon name="edit" />
                        </Button>
                      </Link>
                      <Button
                        inverted
                        circular
                        color="red"
                        onClick={(e) => confirmaRemover(cidade.id)}
                        title="Clique aqui para remover esta cidade"
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
            <Icon name='trash' />
            <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
        </Header>
        <Modal.Actions>
            <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                <Icon name='remove' /> Não
            </Button>
            <Button color='green' inverted onClick={() => remover()}>
                <Icon name='checkmark' /> Sim
            </Button>
        </Modal.Actions>
</Modal>
<Modal
  onClose={() => {
    setOpenModal2(false);
    setCidadeDetalhes(null);
  }}
  onOpen={() => setOpenModal2(true)}
  open={openModal2}
  size="mini"
>
  <Modal.Header>
    <Icon name='map' /> Detalhes da Cidade
  </Modal.Header>
  <Modal.Content>
 <div style={{ fontSize: '16px', lineHeight: '2' }}>
      <p><strong>Nome:</strong> {cidadeDetalhes?.nome}</p>
      <p><strong>Estado:</strong> {cidadeDetalhes?.estado?.sigla} - {cidadeDetalhes?.estado?.nome}</p>
      <p><strong>População:</strong> {cidadeDetalhes?.qtdPopulacao ? cidadeDetalhes.qtdPopulacao.toLocaleString('pt-BR') : 'Não informada'}</p>
      <p><strong>Data de Fundação:</strong> {formatarData(cidadeDetalhes?.dataFundacao) || 'Não informada'}</p>
      <p><strong>Capital do Estado:</strong> {cidadeDetalhes?.ehCapital ? "Sim" : "Não"}</p>
    </div>
  </Modal.Content>
  <Modal.Actions>
    <Button color='red' onClick={() => {
      setOpenModal2(false);
      setCidadeDetalhes(null);
    }}>
      <Icon name='close' /> Fechar
    </Button>
  </Modal.Actions>
</Modal>
    </div>
  );
}
