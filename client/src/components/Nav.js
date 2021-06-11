import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Menu, Button, Icon, Header } from 'semantic-ui-react';

import { logoutAuth } from '../actions';

const Nav = () => {

    const auth = useSelector(state => state.auth);

    return (
        <>
            <div>
                <Menu secondary>
                    <Menu fixed='top' inverted>
                        <Container>
                            <Header as='h1' style={{ color: '#80ced6', marginTop: '1.2rem', marginRight: '1.5rem', fontFamily: 'Courier New', fontSize: '2.2rem', textTransform: 'uppercase'}}>Blog List</Header>
                            <Link to='/'>
                                <Menu.Item style={{ fontSize: '1.4rem', marginTop: '.7rem' }}>Home</Menu.Item>
                            </Link>
                            <Link to='/blogs'>
                                <Menu.Item style={{ fontSize: '1.4rem', marginTop: '.7rem' }}>Blogs</Menu.Item>
                            </Link>
                            <Menu.Item position='right'>
                                {
                                    auth ?
                                        <>
                                            <Link to='/'>
                                                <Button inverted color='red' style={{ marginLeft: '2rem' }} onClick={logoutAuth}>
                                                    <Icon name='log out' color='orange' /> Log out
                                                </Button>
                                            </Link>
                                            <Link to='/account'>
                                                <Button inverted color='teal' style={{ marginLeft: '2rem' }}>Account</Button>
                                            </Link>
                                        </> :
                                        <>
                                            <Link to='/signup'>
                                                <Button inverted color='teal' style={{ marginLeft: '2rem' }}>Sign up</Button>
                                            </Link>
                                            <Link to='/login'>
                                                <Button inverted color='teal' style={{ marginLeft: '2rem' }}>Log in</Button>
                                            </Link>
                                        </>
                                }
                            </Menu.Item>
                        </Container>
                    </Menu>
                </Menu>
            </div>
        </>
    )
}

export default Nav;
