import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, Message } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";

export default function FormEnderecoCliente() {

    // Campos do Endereco
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [complemento, setComplemento] = useState('');

    // IDs de controle
    const { state } = useLocation();
    const [idEndereco, setIdEndereco] = useState(); // ID para Editar
    const [idCliente, setIdCliente] = useState();   // ID do Pai (Cliente)

    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        if (state != null) {

            // Se veio o ID do Cliente (Seja Novo ou Edição, se passado pela lista)
            if (state.clienteId) {
                setIdCliente(state.clienteId);
            }

            // Se veio o ID do Endereço -> MODO EDIÇÃO
            if (state.id) {
                axios.get("http://localhost:8080/api/cliente/endereco/" + state.id)
                    .then((response) => {
                        setIdEndereco(response.data.id);

                        // Tenta pegar o ID do cliente da resposta, se existir.
                        // Isso garante o funcionamento do botão voltar mesmo na edição.
                        if (response.data.cliente && response.data.cliente.id) {
                            setIdCliente(response.data.cliente.id);
                        }

                        setRua(response.data.rua);
                        setNumero(response.data.numero);
                        setBairro(response.data.bairro);
                        setCep(response.data.cep);
                        setCidade(response.data.cidade);
                        setEstado(response.data.estado);
                        setComplemento(response.data.complemento);
                    })
                    .catch(error => console.log("Erro ao buscar dados para edição:", error));
            }
        }
    }, [state]);

    function salvar() {

        let enderecoRequest = {
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            estado: estado,
            complemento: complemento
        }

        if (idEndereco != null) { // Alteração
            axios.put("http://localhost:8080/api/cliente/endereco/" + idEndereco, enderecoRequest)
                .then((response) => {
                    setMensagem({ titulo: 'Sucesso', texto: 'Endereço alterado com sucesso.', icon: 'check', color: 'green' });
                })
                .catch((error) => {
                    setMensagem({ titulo: 'Erro', texto: 'Erro ao alterar o endereço.', icon: 'close', color: 'red' });
                })
        } else { // Cadastro

            // Proteção para não tentar salvar sem o ID do cliente
            if (!idCliente) {
                setMensagem({ titulo: 'Erro', texto: 'Cliente não identificado. Retorne à lista.', icon: 'warning', color: 'yellow' });
                return;
            }

            axios.post("http://localhost:8080/api/cliente/endereco/" + idCliente, enderecoRequest)
                .then((response) => {
                    setMensagem({ titulo: 'Sucesso', texto: 'Endereço cadastrado com sucesso.', icon: 'check', color: 'green' });
                })
                .catch((error) => {
                    setMensagem({ titulo: 'Erro', texto: 'Erro ao incluir o endereço.', icon: 'close', color: 'red' });
                })
        }
    }

    return (
        <div>
            <MenuSistema tela={'cliente'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified' >

                    {idEndereco === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Endereço &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>
                    }
                    {idEndereco !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Endereço &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração </h2>
                    }

                    <Divider />

                    {mensagem && (
                        <Message color={mensagem.color} icon>
                            <Icon name={mensagem.icon} />
                            <Message.Content>
                                <Message.Header>{mensagem.titulo}</Message.Header>
                                {mensagem.texto}
                            </Message.Content>
                        </Message>
                    )}

                    <div style={{ marginTop: '4%' }}>

                        <Form>
                            <Form.Group>
                                <Form.Input fluid label='CEP' width={4} required>
                                    <InputMask mask="99.999-999" value={cep} onChange={e => setCep(e.target.value)} />
                                </Form.Input>
                                <Form.Input fluid label='Cidade' width={8} value={cidade} onChange={e => setCidade(e.target.value)} />
                                <Form.Input fluid label='Estado (UF)' width={4} maxLength="2" placeholder="Ex: PE" value={estado} onChange={e => setEstado(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Input required fluid label='Rua' width={12} value={rua} onChange={e => setRua(e.target.value)} />
                                <Form.Input required fluid label='Número' width={4} value={numero} onChange={e => setNumero(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Input fluid label='Bairro' width={8} value={bairro} onChange={e => setBairro(e.target.value)} />
                                <Form.Input fluid label='Complemento' width={8} value={complemento} onChange={e => setComplemento(e.target.value)} />
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            {/* Botão VOLTAR Corrigido: Envia o ID do cliente de volta para a lista */}
                            <Link
                                to={'/list-endereco-cliente'}
                                state={{ id: idCliente }} // <--- IMPORTANTE: Passa o ID para a lista carregar
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