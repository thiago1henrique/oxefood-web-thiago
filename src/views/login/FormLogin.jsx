import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { notifyError } from '../../views/util/Util';
import { registerSuccessfulLoginForJwt } from '../util/AuthenticationService';

export default function FormLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');

    function entrar() {

        if (username !== '' && senha !== '') {

            // --- CORREÇÃO: Limpeza do Token Antigo ---
            // Removemos qualquer token velho salvo para garantir que o Axios
            // não envie um cabeçalho "Authorization" expirado nesta requisição.
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            // -----------------------------------------

            let authenticationRequest = {
                username: username,
                password: senha,
            }

            axios.post("http://localhost:8080/api/auth", authenticationRequest)
                .then((response) => {

                    registerSuccessfulLoginForJwt(
                        response.data.token,
                        response.data.tokenExpiresIn
                    );

                    navigate("/home");
                })
                .catch((error) => {
                    // É bom verificar no console qual foi o erro exato
                    console.error("Erro no login:", error);
                    notifyError('Usuário não encontrado ou senha incorreta.');
                })
        }
    }

    return (
        <div>
            <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500 }}>

                    <center> <Image src='/logo-IFPE.png' size='medium' /> </center>

                    <div style={{ marginTop: '15%' }}>
                        <Header as='h2' color='grey' textAlign='center'>
                            Informe suas credenciais de acesso
                        </Header>
                    </div> <br /> <br />

                    <Form>
                        <Segment stacked>

                            <Form.Input
                                fluid
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                icon='user'
                                iconPosition='left'
                                placeholder='Informe seu e-mail'
                                required
                                maxLength="100"
                            />

                            <Form.Input
                                fluid
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                icon='lock'
                                iconPosition='left'
                                type='password'
                                placeholder='Senha'
                                required
                                maxLength="100"
                            />

                            <Button
                                fluid
                                size='large'
                                color='orange'
                                icon='sign in alternate'
                                content='Entrar'
                                onClick={() => entrar()}
                            />

                        </Segment>
                    </Form>

                    <Message>
                        Esqueceu a sua senha: <Link to="#">clique aqui</Link>
                    </Message>

                </Grid.Column>
            </Grid>
        </div>
    )
}