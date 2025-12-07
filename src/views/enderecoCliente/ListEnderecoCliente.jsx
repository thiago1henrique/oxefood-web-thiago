import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEnderecoCliente() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    // PEGA O ID DO CLIENTE VINDO DA TELA ANTERIOR
    const { state } = useLocation();
    const clienteId = state?.id;

    useEffect(() => {
        if (clienteId) {
            carregarLista();
        }
    }, [clienteId])

    function carregarLista() {
        axios.get("http://localhost:8080/api/cliente/" + clienteId + "/endereco")
            .then((response) => {
                setLista(response.data)
            })
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/cliente/endereco/' + idRemover)
            .then((response) => {
                console.log('Endereço removido com sucesso.')
                carregarLista();
            })
            .catch((error) => {
                console.log('Erro ao remover o endereço.')
            })
        setOpenModal(false)
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    return (
        <div>
            <MenuSistema tela={'cliente'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Endereços do Cliente </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-endereco-cliente'
                            state={{ clienteId: clienteId }}
                        />

                        <br /><br /><br />

                        <Table color='orange' sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Rua</Table.HeaderCell>
                                    <Table.HeaderCell>Número</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lista.map(endereco => (
                                    <Table.Row key={endereco.id}>
                                        <Table.Cell>{endereco.rua}</Table.Cell>
                                        <Table.Cell>{endereco.numero}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                as={Link}
                                                to="/form-endereco-cliente" // Certifique-se que a rota está certa
                                                // --- AQUI ESTÁ A CORREÇÃO ---
                                                // Passamos id (do endereço) E clienteId (do pai)
                                                state={{ id: endereco.id, clienteId: clienteId }}

                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste endereco'
                                                icon='edit'
                                            />

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este endereco'
                                                icon
                                                onClick={e => confirmaRemover(endereco.id)}>
                                                <Icon name='trash' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>

                        <div style={{ marginTop: '4%' }}>
                            <Link
                                to={'/list-cliente'}
                            >
                                <Button
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' /> Voltar
                                </Button>
                            </Link>

                        </div>
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
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
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
    )
}