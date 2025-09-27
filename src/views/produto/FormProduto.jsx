import InputMask from 'comigo-tech-react-input-mask';
import React, {useState} from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from "axios";
import MenuSistema from "../MenuSistema";
import {Link} from "react-router-dom";

export default function FormProduto () {

    const [titulo, setTitulo] = useState('');
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [tempoEntregaMinimo, setTempoMinimoEntrega] = useState('');
    const [tempoEntregaMaximo, setTempoMaximoEntrega] = useState('');

    function salvar() {

        let produtoRequest = {
            titulo: titulo,
            codigo: codigo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo
        }

        axios.post("http://localhost:8080/api/produto", produtoRequest)
            .then((response) => {
                console.log('Produto cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir o um produto.')
            })

        setTitulo('');
        setCodigo('');
        setDescricao('');
        setValorUnitario('');
        setTempoMinimoEntrega('');
        setTempoMaximoEntrega('');
        setValorUnitario('');
    }

    return (

        <div>

            <MenuSistema tela={'produto'} />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Titulo'
                                    maxLength="100"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    placeholder='Informe o código do produto'
                                    label='Código do Produto'
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.TextArea
                                    label='Descrição'
                                    placeholder='Informe a descrição do produto'
                                    width={16}
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                >

                                </Form.TextArea>
                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    placeholder='30'
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    value={tempoEntregaMinimo}
                                    onChange={e => setTempoMinimoEntrega(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    placeholder='40'
                                    label='Tempo de Entrega Máximo em Minutos'
                                    value={tempoEntregaMaximo}
                                    onChange={e => setTempoMaximoEntrega(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Link to={'/list-produto'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}
