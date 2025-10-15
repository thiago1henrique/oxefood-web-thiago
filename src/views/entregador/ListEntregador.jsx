import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/util";

export default function ListEntregador() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();


  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/entregador").then((response) => {
      setLista(response.data);
    });
  }
  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

  function formatarAtivo(ativoParam) {
    if (ativoParam === true) {
      return "Ativo";
    } else {
      return "Inativo";
    }
  }

  function confirmaRemover(id) {
       setOpenModal(true)
       setIdRemover(id)
   }

   async function remover() {

       await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
       .then((response) => {
 
           notifySuccess('Entregador removido com sucesso.')
 
           axios.get("http://localhost:8080/api/entregador")
           .then((response) => {
               setLista(response.data)
           })
       })
       .catch((error) => {
           if (error.response.data.errors != undefined) {
               for (let i = 0; i < error.response.data.errors.length; i++) {
                   notifyError(error.response.data.errors[i].defaultMessage);
               }
           } else {
               notifyError(error.response.data.message);
           }
       })
       setOpenModal(false)
   }


  return (
    <div>
      <MenuSistema tela={"entregador"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Entregador </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-entregador"
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>Dt. Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Telefone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Telefone Fixo</Table.HeaderCell>
                  <Table.HeaderCell>Endereço</Table.HeaderCell>
                  <Table.HeaderCell>Entregas</Table.HeaderCell>
                  <Table.HeaderCell>Frete</Table.HeaderCell>
                  <Table.HeaderCell>Situação</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((entregador) => (
                  <Table.Row key={entregador.id}>
                    <Table.Cell>{entregador.nome}</Table.Cell>
                    <Table.Cell>{entregador.cpf}</Table.Cell>
                    <Table.Cell>
                      {formatarData(entregador.dataNascimento)}
                    </Table.Cell>
                    <Table.Cell>{entregador.foneCelular}</Table.Cell>
                    <Table.Cell>{entregador.foneFixo}</Table.Cell>
                    <Table.Cell>
                      {entregador.enderecoRua}, {entregador.enderecoNumero}{" "}
                      <br /> {entregador.enderecoBairro},{" "}
                      {entregador.enderecoCidade} - {entregador.enderecoUf}
                    </Table.Cell>
                    <Table.Cell>{entregador.qtdEntregasRealizadas} </Table.Cell>
                    <Table.Cell>{entregador.valorFrete}</Table.Cell>
                    <Table.Cell>{formatarAtivo(entregador.ativo)}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Link to="/form-entregador" state={{ id: entregador.id }}>
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste entregador"
                          icon
                        >
                          <Icon name="edit" />
                        </Button>
                      </Link>
                      <Button
                        inverted
                        circular
                        color="red"
                        onClick={e => confirmaRemover(entregador.id)}
                        title="Clique aqui para remover este entregador"
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

    </div>
  );
}
