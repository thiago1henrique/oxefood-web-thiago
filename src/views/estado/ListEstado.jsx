import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListEstado() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();


  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/estado").then((response) => {
      setLista(response.data);
    });
  }

  function confirmaRemover(id) {
       setOpenModal(true)
       setIdRemover(id)
   }

   async function remover() {

       await axios.delete('http://localhost:8080/api/estado/' + idRemover)
       .then((response) => {
 
           console.log('Estado removido com sucesso.')
 
           axios.get("http://localhost:8080/api/estado")
           .then((response) => {
               setLista(response.data)
           })
       })
       .catch((error) => {
           console.log('Erro ao remover um estado.')
       })
       setOpenModal(false)
   }



  return (
    <div>
      <MenuSistema tela={"estado"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Estado </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-estado"
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Sigla</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((estado) => (
                  <Table.Row key={estado.id}>
                    <Table.Cell>{estado.nome}</Table.Cell>
                    <Table.Cell>{estado.sigla}</Table.Cell>

                    <Table.Cell textAlign="center">
                      <Link to="/form-estado" state={{ id: estado.id }}>
                      
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste estado"
                          icon
                        >
                          <Icon name="edit" />
                        </Button>
                      </Link>
                      <Button
                        inverted
                        circular
                        color="red"
                        onClick={e => confirmaRemover(estado.id)}
                        title="Clique aqui para remover este estado"
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
