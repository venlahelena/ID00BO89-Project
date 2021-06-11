import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Container, Message } from 'semantic-ui-react';

import http from '../services/http';
import { loginAuth } from '../actions'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const login = (event) => {
        event.preventDefault();

        http.post('/login', { username: username, password: password })
            .then((response) => {
                if (response.status === 200) {
                    loginAuth(response.data);
                    history.push('/');
                }
            }).catch((error) => {
                setErrorMessage('Incorrect username or password');
            });
    }

    return (
        <>
            <Container text style={{ marginTop: '10rem' }}>
                <Message negative hidden={errorMessage === '' ? true : false}>
                    <Message.Header>Error</Message.Header>
                    <p>{errorMessage}</p>
                </Message>
                <Form>
                    <Form.Field required onChange={(event) => setUsername(event.target.value)}>
                        <label>Username</label>
                        <input placeholder='Username' />
                    </Form.Field>
                    <Form.Field required onChange={(event) => setPassword(event.target.value)}>
                        <label>Password</label>
                        <input placeholder='Password' type='password' />
                    </Form.Field>
                    <Button fluid color='teal' type='submit' style={{ marginTop: '2rem' }} onClick={login}>Login</Button>
                    <Link to='/signup'>
                        <Button fluid type='submit' style={{ marginTop: '2rem' }}>Create an account</Button>
                    </Link>
                </Form>
            </Container>
        </>
    )
}

export default Login;
