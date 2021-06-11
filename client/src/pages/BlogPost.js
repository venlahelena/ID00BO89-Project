import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Header, Segment, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import CommentSection from '../components/CommentSection';

const BlogPost = () => {

    const { id } = useParams();
    const blogs = useSelector(state => state.blogs);
    const users = useSelector(state => state.users);

    const blog = blogs.find((item) => item.id === Number(id));
    const author = users.find((item) => item.id === (blog ? blog.user_id : null));

    return (
        <>
            <Container style={{ marginTop: '5rem'}}>
                <Link to='/blogs'>
                    <Header as='h3' color='teal'>
                        <Icon name='arrow left' />
                         Go back to blogs
                    </Header>
                </Link>
                {
                    blog ?
                        <Container>
                            <Segment color='teal' style={{ padding: '2.5rem', marginTop: '3rem'}}>
                                <Header as='h1'>
                                    {blog.headline}
                                </Header>
                                {blog.content.split('\n').map((item, key) => {
                                    return <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word', fontSize: '1.2rem' }}>
                                        {item}
                                    </p>
                                })}
                                <Header color='teal' as='h3'>
                                    {author ? author.username : null}
                                </Header>
                                <p style={{ color: 'darkgray' }}>
                                    <Icon name='clock outline' />
                                    {blog.createdAt}
                                </p>
                            </Segment>
                        </Container> : null
                }
            </Container>
            {
                blog ?
                    <Container style={{ marginTop: '1.5rem' }}>
                        <CommentSection id={id} />
                    </Container> : null
            }
        </>
    )
}

export default BlogPost;
