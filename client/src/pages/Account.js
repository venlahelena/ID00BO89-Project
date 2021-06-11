import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Icon, Divider, Container, Segment, Button, Comment } from 'semantic-ui-react';

import http from '../services/http';
import { removeBlog, removeComment } from '../actions';

const Account = () => {

    const auth = useSelector(state => state.auth);
    const blogs = useSelector(state => state.blogs);
    const comments = useSelector(state => state.comments);

    const deleteBlog = (id) => {
        http.delete(`/blogs/${id}`).then((response) => {
            if (response.status === 204) {
                removeBlog({ id: id });
                comments
                    .filter((comment) => comment.blog_id === id)
                    .map((comment) => removeComment(comment));
            }
        })
    }

    const deleteComment = (id) => {
        http.delete(`/comments/${id}`).then((response) => {
            if (response.status === 204) {
                removeComment({ id: id });
            }
        })
    }

    return (
        <>
            {auth ? <>
                <Container style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <Header as='h3' style={{ marginTop: '6rem', textTransform: 'uppercase', color: '#696969' }}>Welcome to your page: 
                    <Header as='h3' style={{ color: '#20B2AA', marginTop: '1rem'}}>{auth.username}</Header></Header>
                </Container>
                <Container>
                    <Header as='h3' style={{ textTransform: 'uppercase', color: '#696969', marginTop: '4rem'}}>Browse your blogs</Header>
                    {blogs.filter(item => item.user_id === auth.id).map((item) =>
                        <Segment clearing color='teal' key={item.id}>
                            <Header as='a'>{item.headline}</Header>
                            <Button icon labelPosition='right' floated='right' onClick={() => deleteBlog(item.id)}>
                                  Delete
                                 <Icon color='red' name='delete' />
                            </Button>
                        </Segment>
                    )}
                    <Header as='h3' style={{ textTransform: 'uppercase', color: '#696969', marginTop: '4rem'}}>Browse your comments</Header>
                    <Comment.Group style={{ minWidth: '100%', marginBottom: '5rem'}}>
                        {comments.filter(item => item.user_id === auth.id).map((comment, key) =>
                            <Segment clearing color='teal' key={key}>
                                <Comment key={key}>
                                    <Comment.Content>
                                        <Button icon labelPosition='right' floated='right' onClick={() => deleteComment(comment.id)}>
                                            Delete
                                            <Icon color='red' name='delete' />
                                            </Button>
                                        <Comment.Text>{comment.content}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            </Segment>
                        )}
                    </Comment.Group>
                </Container>
            </> : <>
                    <Container style={{ marginTop: '6rem' }}>
                        <Header as='h3'>Not Logged In</Header>
                        <Divider style={{ marginTop: '3rem' }} />
                        <p><Link to='/login'>Log in</Link> to manage your account.</p>
                        <Divider style={{ marginTop: '1rem' }} />
                    </Container>
                </>
            }
        </>
    )
}

export default Account;