import React from 'react';
import { List, Container, Header, Grid, Icon, Divider } from 'semantic-ui-react';


const Home = () => {

    return (
        <Container style={{marginTop: '8rem'}}>
            <Header as='h2' style={{textTransform: 'uppercase', color: '#696969' }}>Welcome to Blog List</Header>
            <Divider style={{marginTop: '3rem'}} />
            <Grid>
                <Grid.Row style={{ marginTop: '2.5rem' }}>
                    <Grid.Column width={13}>
                         <List style={{ fontSize: '1.2rem'}}>
                             <p>
                             We are glad you have joined the ranks of our hundreds of thousands of monthly readers! 
                             Here you can find variety of interesting blogposts so sit back, relax and start browsing!
                             </p>
                         </List>
                    </Grid.Column>
                    <Grid.Column width={2}>
                         <Icon.Group>
                             <Icon name='envelope open outline' size='huge'color='orange' />
                         </Icon.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ marginTop: '2.5rem' }}>
                <Grid.Column width={2}>
                    <Icon.Group>
                         <Icon name='pencil' size='huge' color='teal' />
                    </Icon.Group>
                </Grid.Column>
                <Grid.Column width={13}>
                    <List style={{ fontSize: '1.2rem' }}>
                         <p>
                         Our bloggers come from all over the world with different culture, background and knowledge. 
                         That is how we can offer you broad spectrum of interesting reading. 
                         We want you to have the best possible experience so let us know if there is something how to improve your stay.
                         </p>
                    </List>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ marginTop: '2.5rem' }}>
                     <Grid.Column width={13}>
                         <List style={{ fontSize: '1.2rem' }}>
                            <p>
                            Please leave a comments to the blogs! Our bloggers love to hear if they have succeeded and what kind of content you want to see. 
                            Not that all criticism is a fun thing but we think honest criticism given in an honest positive manner is something we can all learn and 
                            grow from if we are open to hearing it.
                            </p>
                         </List>
                     </Grid.Column>
                     <Grid.Column width={2}>
                         <Icon.Group>
                             <Icon name='keyboard' size='huge' />
                         </Icon.Group>
                     </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider style={{ marginTop: '6rem' }}/>
        </Container>
    )
}

export default Home;
