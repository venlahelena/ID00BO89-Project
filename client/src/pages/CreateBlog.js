import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Container, Icon, Header, Message } from 'semantic-ui-react';

import http from '../services/http';
import { addBlog } from '../actions';

const CreateBlog = () => {

    const [headline, setHeadline] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const auth = useSelector(state => state.auth);

    const history = useHistory();

    const submitBlog = () => {

        if (headline === '') {
            setErrorMessage('No headline specified.');
        } else if (content === '') {
            setErrorMessage('No content specified.');
        } else if (auth === null) {
            setErrorMessage('You are not logged in.');
        } else {
            http.post('/blogs', { headline: headline, content: content, user_id: auth.id }).then((response) => {
                if (response.status === 201) {
                    addBlog(response.data);
                    history.push(`/blogpost/${response.data.id}`);
                }
            })
        }
    }

    return (
        <>
            <Container text style={{ marginTop: '7rem', marginBottom: '5rem'}}>
                <div >
                    <Link to='/blogs'>
                        <Header as='h3' color='teal'>
                            <Icon.Group>
                                <Icon name='arrow left' />
                            </Icon.Group>
                         Go back to blogs
                     </Header>
                    </Link>
                </div>
                <Header as='h1'>Create new blog</Header>
                <Message negative hidden={errorMessage === '' ? true : false}>
                    <Message.Header>Error</Message.Header>
                    <p>{errorMessage}</p>
                </Message>
                <Form>
                    <Form.Field onChange={(event) => setHeadline(event.target.value)}>
                        <label>Blog heading</label>
                        <input placeholder='Heading' />
                    </Form.Field>
                    <Form.Field onChange={(event) => setContent(event.target.value)}>
                        <label>Blog content</label>
                        <Form.TextArea placeholder='Write your blog post' style={{ minHeight: 400 }} />
                    </Form.Field>
                    <Button onClick={submitBlog} fluid color='teal' style={{ marginTop: '2rem' }}>Create</Button>
                </Form>
            </Container>
        </>
    )
}

export default CreateBlog;