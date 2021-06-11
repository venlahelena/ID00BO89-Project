import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

const Footer = () => {
    return (
        <>
            <div>
                <Menu secondary widths={2}>
                    <Menu fixed='bottom' inverted>
                        <Container style={{ padding: '2rem', justifyContent: 'space-evenly' }}>
                            <Link to='/terms'>
                                <Menu.Item>Terms and Conditions</Menu.Item>
                            </Link>
                            <Link to='/privacy'>
                                <Menu.Item>Privacy Policy</Menu.Item>
                            </Link>
                        </Container>
                    </Menu>
                </Menu>
            </div>
        </>
    )
}

export default Footer;