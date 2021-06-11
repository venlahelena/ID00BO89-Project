import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import BlogPost from './pages/BlogPost';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Account from './pages/Account';

import http from './services/http';
import { addBlog, addUser, addComment, resetStore } from './actions';

function App() {

	const [requestReset, setRequestReset] = useState(true);

	useEffect(() => {

		if (requestReset) {
			resetStore();

			http.get('/users').then(response => {
				const users = response.data;
				users.map(user =>
					addUser(user)
				)
			})

			http.get('/blogs').then(response => {
				const blogs = response.data;
				blogs.map(blog =>
					addBlog(blog)
				)
			})

			http.get('/comments').then(response => {
				const comments = response.data;
				comments.map(comment =>
					addComment(comment)
				)
			})

			setRequestReset(false);
		}

	}, [requestReset]);

	return (
		<Router>
			<Grid columns='equal'>
				<style>{` html, body { background: #F5F5F5; }`}</style>
				<Grid.Row>
					<Nav />
				</Grid.Row>
				<Grid.Column>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/login' component={Login} />
						<Route path='/signup' component={Signup} />
						<Route path='/blogs' component={Blogs} />
						<Route path='/createblog' component={CreateBlog} />
						<Route path='/blogpost/:id' component={BlogPost} />
						<Route path='/terms' component={Terms} />
						<Route path='/privacy' component={Privacy} />
						<Route path='/account' component={Account} />
					</Switch>
				</Grid.Column>
				<Grid.Row>
					<Footer />
				</Grid.Row>
			</Grid>
		</Router>
	);
}

export default App;
