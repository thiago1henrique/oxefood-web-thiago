import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Header, Icon, Menu, Modal, Segment, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListProduto() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [menuFiltro, setMenuFiltro] = useState();

    // Estados do Filtro
    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [idCategoria, setIdCategoria] = useState();
    const [listaCategoriaProduto, setListaCategoriaProduto] = useState([]);

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        // Carrega os produtos
        axios.get("http://localhost:8080/api/produto")
            .then((response) => {
                setLista(response.data)
            })

        // Carrega as categorias para o Dropdown
        // ATENÇÃO: Verifique se no seu Java o CategoriaProdutoController está com @RequestMapping("/api/categoria-produto")
        axios.get("http://localhost:8080/api/categoria-produto")
            .then((response) => {
                const dropDownCategorias = [];
                dropDownCategorias.push({ text: '', value: '' });
                response.data.map(c => (
                    dropDownCategorias.push({ text: c.descricao, value: c.id })
                ))
                setListaCategoriaProduto(dropDownCategorias)
            })
            .catch((error) => {
                console.log("Erro ao carregar categorias. Verifique se o Controller existe no backend.", error);
            })
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/produto/' + idRemover)
            .then((response) => {
                console.log('Produto removido com sucesso.')
                carregarLista(); // Recarrega a lista completa após remover
            })
            .catch((error) => {
                console.log('Erro ao remover um produto.')
            })
        setOpenModal(false)
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function filtrarProdutos(codigoParam, tituloParam, idCategoriaParam) {

        let formData = new FormData();

        if (codigoParam !== undefined) {
            setCodigo(codigoParam)
            formData.append('codigo', codigoParam);
        }
        if (tituloParam !== undefined) {
            setTitulo(tituloParam)
            formData.append('titulo', tituloParam);
        }
        if (idCategoriaParam !== undefined) {
            setIdCategoria(idCategoriaParam)
            formData.append('idCategoria', idCategoriaParam);
        }

        await axios.post("http://localhost:8080/api/produto/filtrar", formData)
            .then((response) => {
                // CORREÇÃO: Atualizamos 'lista' para que a tabela mostre os dados filtrados
                setLista(response.data)
            })
    }

    function handleMenuFiltro() {
        setMenuFiltro(!menuFiltro);
    }

    function handleChangeCodigo(value) {
        filtrarProdutos(value, titulo, idCategoria);
    }

    function handleChangeTitulo(value) {
        filtrarProdutos(codigo, value, idCategoria);
    }

    function handleChangeCategoriaProduto(value) {
        filtrarProdutos(codigo, titulo, value);
    }

    return (
        <div>
            <MenuSistema tela={'produto'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Produto </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Menu compact>
                            <Menu.Item
                                name='menuFiltro'
                                active={menuFiltro === true}
                                onClick={() => handleMenuFiltro()}
                            >
                                <Icon name='filter' />
                                Filtrar
                            </Menu.Item>
                        </Menu>

                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-produto'
                        />

                        {menuFiltro ?

                            <Segment>
                                <Form className="form-filtros">

                                    <Form.Input
                                        icon="search"
                                        value={codigo}
                                        onChange={e => handleChangeCodigo(e.target.value)}
                                        label='Código do Produto'
                                        placeholder='Filtrar por Código'
                                        labelPosition='left'
                                        width={4}
                                    />

                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            icon="search"
                                            value={titulo}
                                            onChange={e => handleChangeTitulo(e.target.value)}
                                            label='Título'
                                            placeholder='Filtrar por título'
                                            labelPosition='left'
                                        />
                                        <Form.Select
                                            placeholder='Filtrar por Categoria'
                                            label='Categoria'
                                            options={listaCategoriaProduto}
                                            value={idCategoria}
                                            onChange={(e, { value }) => {
                                                handleChangeCategoriaProduto(value)
                                            }}
                                        />

                                    </Form.Group>
                                </Form>
                            </Segment> : ""
                        }

                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Titulo</Table.HeaderCell>
                                    <Table.HeaderCell>Categoria</Table.HeaderCell>
                                    <Table.HeaderCell>Código</Table.HeaderCell>
                                    <Table.HeaderCell>Descrição</Table.HeaderCell>
                                    <Table.HeaderCell>Valor</Table.HeaderCell>
                                    <Table.HeaderCell>Tempo Min Entrega</Table.HeaderCell>
                                    <Table.HeaderCell>Tempo Max Entrega</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(produto => (

                                    <Table.Row key={produto.id}>
                                        <Table.Cell>{produto.titulo}</Table.Cell>
                                        <Table.Cell>{produto.categoria ? produto.categoria.descricao : 'Sem Categoria'}</Table.Cell>
                                        <Table.Cell>{produto.codigo}</Table.Cell>
                                        <Table.Cell>{produto.descricao}</Table.Cell>
                                        <Table.Cell>{produto.valorUnitario}</Table.Cell>
                                        <Table.Cell>{produto.tempoEntregaMinimo}</Table.Cell>
                                        <Table.Cell>{produto.tempoEntregaMaximo}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                as={Link}
                                                to="/form-produto"
                                                state={{ id: produto.id }}
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste produto'
                                                icon='edit'
                                            />

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este produto'
                                                icon
                                                onClick={e => confirmaRemover(produto.id)}>
                                                <Icon name='trash' />
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