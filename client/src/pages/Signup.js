import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Message } from 'semantic-ui-react';

import http from '../services/http'
import { addUser } from '../actions'

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const signup = (event) => {
        event.preventDefault();

        if (username === '') {
            setErrorMessage('Invalid username');
        } else if (password === '') {
            setErrorMessage('Invalid password');
        } else if (password !== reEnterPassword) {
            setErrorMessage('Passwords do not match');
        } else {
            http.post('/signup', { username: username, password: password })
                .then((response) => {
                    if (response.status === 201) {
                        addUser(response.data);
                        history.push('/login');
                    }
                }).catch((error) => {
                    if (error.response.status === 400) {
                        setErrorMessage('Username taken');
                    } else {
                        setErrorMessage('Server Error');
                    }
                });
        }
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
                    <Form.Field required onChange={(event) => setReEnterPassword(event.target.value)}>
                        <label>Reenter password</label>
                        <input placeholder='Password' type='password' />
                    </Form.Field>
                    <Button fluid color='teal' style={{ marginTop: '2rem' }} onClick={signup}>submit</Button>
                </Form>
            </Container>
        </>
    )
}

export default Signup;
