import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/util";

export default function ListCategoriaProduto() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();


  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/categoriaProduto").then((response) => {
      setLista(response.data);
    });
  }

  function confirmaRemover(id) {
       setOpenModal(true)
       setIdRemover(id)
   }

   async function remover() {

       await axios.delete('http://localhost:8080/api/categoriaProduto/' + idRemover)
       .then((response) => {

           notifySuccess('Categoria removida com sucesso.')

           axios.get("http://localhost:8080/api/categoriaProduto")
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
      <MenuSistema tela={"categoriaProduto"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Categoria de produto </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-categoria-produto"
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={12}>Descrição</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((categoriaProduto) => (
                  <Table.Row key={categoriaProduto.id}>
                    <Table.Cell>{categoriaProduto.descricao}</Table.Cell>

                    <Table.Cell textAlign="center">
                      <Link to="/form-categoria-produto" state={{ id: categoriaProduto.id }}>
                      
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste produto"
                          icon
                        >
                          <Icon name="edit" />
                        </Button>
                      </Link>
                      <Button
                        inverted
                        circular
                        color="red"
                        onClick={e => confirmaRemover(categoriaProduto.id)}
                        title="Clique aqui para remover este produto"
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
