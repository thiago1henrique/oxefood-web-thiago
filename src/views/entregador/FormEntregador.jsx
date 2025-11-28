import React, { useState } from "react";
import InputMask from 'comigo-tech-react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

// Lista completa de estados brasileiros para o Select
const ufOptions = [
    { key: 'ac', value: 'AC', text: 'Acre' },
    { key: 'al', value: 'AL', text: 'Alagoas' },
    { key: 'ap', value: 'AP', text: 'Amapá' },
    { key: 'am', value: 'AM', text: 'Amazonas' },
    { key: 'ba', value: 'BA', text: 'Bahia' },
    { key: 'ce', value: 'CE', text: 'Ceará' },
    { key: 'df', value: 'DF', text: 'Distrito Federal' },
    { key: 'es', value: 'ES', text: 'Espírito Santo' },
    { key: 'go', value: 'GO', text: 'Goiás' },
    { key: 'ma', value: 'MA', text: 'Maranhão' },
    { key: 'mt', value: 'MT', text: 'Mato Grosso' },
    { key: 'ms', value: 'MS', text: 'Mato Grosso do Sul' },
    { key: 'mg', value: 'MG', text: 'Minas Gerais' },
    { key: 'pa', value: 'PA', text: 'Pará' },
    { key: 'pb', value: 'PB', text: 'Paraíba' },
    { key: 'pr', value: 'PR', text: 'Paraná' },
    { key: 'pe', value: 'PE', text: 'Pernambuco' },
    { key: 'pi', value: 'PI', text: 'Piauí' },
    { key: 'rj', value: 'RJ', text: 'Rio de Janeiro' },
    { key: 'rn', value: 'RN', text: 'Rio Grande do Norte' },
    { key: 'rs', value: 'RS', text: 'Rio Grande do Sul' },
    { key: 'ro', value: 'RO', text: 'Rondônia' },
    { key: 'rr', value: 'RR', text: 'Roraima' },
    { key: 'sc', value: 'SC', text: 'Santa Catarina' },
    { key: 'sp', value: 'SP', text: 'São Paulo' },
    { key: 'se', value: 'SE', text: 'Sergipe' },
    { key: 'to', value: 'TO', text: 'Tocantins' },
];

export default function FormEntregador() {

    // Estado para controlar o Radio Button (Sim/Não)
    const [ativo, setAtivo] = useState(true);

    return (

        <div>

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    width={8}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    width={4}
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    width={4}
                                    label='RG'
                                    maxLength="100"
                                />

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='DT Nascimento'>
                                    <InputMask
                                        required
                                        mask="99/99/9999"
                                        placeholder="Ex: 20/03/1985"
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Fixo'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    width={4}
                                    label='Valor Por Frete'
                                    maxLength="100"
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={12}
                                />

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={6}
                                />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={6}
                                />

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={4}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Select
                                    fluid
                                    label='UF'
                                    width={16}
                                    placeholder='Selecione'
                                    search
                                    options={ufOptions} // Lista de estados inserida aqui
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    width={16}
                                />

                            </Form.Group>

                            {/* Novo Grupo de Radio Buttons */}
                            <Form.Group inline style={{ marginTop: '1em' }}>
                                <label>Ativo: </label>
                                <Form.Radio
                                    label='Sim'
                                    checked={ativo === true}
                                    onChange={() => setAtivo(true)}
                                />
                                <Form.Radio
                                    label='Não'
                                    checked={ativo === false}
                                    onChange={() => setAtivo(false)}
                                    style={{ marginLeft: '15px' }}
                                />
                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

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

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
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