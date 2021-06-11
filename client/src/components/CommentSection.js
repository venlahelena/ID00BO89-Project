import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Comment, Form, Message, Container, Divider, Icon } from 'semantic-ui-react';

import http from '../services/http';
import { addComment } from '../actions';

const CommentSection = ({ id }) => {

	const [newComment, setNewComment] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const comments = useSelector(state => state.comments);
	const users = useSelector(state => state.users);
	const auth = useSelector(state => state.auth);

	const createComment = (event) => {
		event.preventDefault();

		if (newComment === '') {
			setErrorMessage('Cannot submit empty comment.');
		} else if (auth === null) {
			setErrorMessage('You are not logged in.');
		} else {
			http.post('/comments', { content: newComment, blog_id: id, user_id: auth.id }).then((response) => addComment(response.data))
		}
		setNewComment('');
	}

	const commenter = (user_id = null) => {
		let user = users.find(item => item.id === user_id)
		if (user) {
			return user;
		} else {
			return { username: 'User not found'};
		}
	}

	return (
		<>
			<Container fluid>
				<Comment.Group size='large' style={{ marginTop: '5rem' }}>
					<Divider horizontal>Comments</Divider>
					<Message negative hidden={errorMessage === '' ? true : false}>
						<Message.Header>Error</Message.Header>
						<p>{errorMessage}</p>
					</Message>
					{comments.filter(item => item.blog_id === Number(id)).map((comment, key) =>
						<Comment key={key}>
							<Comment.Text>{comment.content}</Comment.Text>
							<Comment.Group size='large'>
								<Comment.Author>{commenter(comment.user_id).username}</Comment.Author>
								<Icon color='teal' name='clock outline' style={{ marginTop: '.5rem' }} />
								<Comment.Metadata>{comment.createdAt}</Comment.Metadata>
							</Comment.Group>
						</Comment>
					)
					}
					<Container style={{ marginBottom: '5rem' }}>
						<Form size='tiny' style={{ marginTop: '2rem' }}>
							<Form.TextArea placeholder='Write comment' value={newComment} onChange={(event) => setNewComment(event.target.value)} />
							<Button type="button" onClick={createComment} fluid color='teal' content='Comment' labelPosition='left' icon='edit' />
						</Form>
					</Container>
				</Comment.Group >
			</Container>
		</>
	)
}

export default CommentSection;
