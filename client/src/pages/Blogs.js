import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Label, Segment } from 'semantic-ui-react';

const Blogs = () => {

    const blogs = useSelector(state => state.blogs);
    const auth = useSelector(state => state.auth);
    const users = useSelector(state => state.users)

    const creator = (user_id = null) => {
        let user = users.find(item => item.id === user_id)
        if (user) {
            return user;
        } else {
            return { username: 'User not found' };
        }
    }

    return (
        <>
            { auth ? <Container style={{ marginTop: '8rem' }}>
                <div >
                    <Link to='/createblog'>
                        <Button as='div' labelPosition='right'>
                            <Button color='teal' icon size='large'>
                                <Icon name='write square' />
                            </Button>
                            <Label color='teal' as='p' basic pointing='left'> Create a new blog </Label>
                        </Button>
                    </Link>
                </div>
            </Container> : null}
            <Container style={{ marginTop: '5rem' }}>
                <Header as='h2' style={{ marginBottom: '2rem', textTransform: 'uppercase', color: '#696969'}}> Blogs </Header>
                {
                    blogs.map((item) => {
                        return <Segment clearing color='teal' key={item.id}>
                            <div>
                                <Header as='h3'>{item.headline}</Header>
                                <Header as='h4' style={{marginTop: '.3rem'}} color='teal'>CREATED BY: {creator(item.user_id).username}</Header>
                            </div>
                            <Link to={`/blogpost/${item.id}`}>
                                <div>
                                     <Button icon size='small' labelPosition='right' floated='right'>
                                          Read more
                                         <Icon color='teal' name='right arrow' />
                                    </Button>
                                </div>
                            </Link>
                        </Segment>
                    })
                }
            </Container>
        </>
    )
}

export default Blogs;