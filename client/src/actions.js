import axios from 'axios';
import store from './reducers';


/* Define Actions Here */

const resetStore = () => {
    store.dispatch({
        type: "RESET"
    })
}

const addBlog = (blog) => {
    store.dispatch({
        type: "NEW_BLOG",
        data: {
            id: Number(blog.id),
            user_id: Number(blog.user_id),
            headline: blog.headline,
            content: blog.content,
            createdAt: Date(blog.createdAt).toString(),
        }
    })
}

const updateBlog = (blog) => {
    store.dispatch({
        type: "UPDATE_BLOG",
        data: {
            id: Number(blog.id),
            headline: blog.headline,
            content: blog.content,
            updatedAt: Date(blog.updatedAt).toString(),
        }
    })
}

const removeBlog = (blog) => {
    store.dispatch({
        type: "REMOVE_BLOG",
        data: blog,
    })
}

const addComment = (comment) => {
    store.dispatch({
        type: "NEW_COMMENT",
        data: {
            id: Number(comment.id),
            user_id: Number(comment.user_id),
            blog_id: comment.blog_id,
            content: comment.content,
            createdAt: Date(comment.createdAt).toString(),
        }
    })
}

const removeComment = (comment) => {
    store.dispatch({
        type: "REMOVE_COMMENT",
        data: comment,
    })
}

const addUser = (user) => {
    store.dispatch({
        type: "NEW_USER",
        data: {
            id: Number(user.id),
            username: user.username,
            createdAt: Date(user.createdAt).toString(),
        }
    })
}

const updateUser = (user) => {
    store.dispatch({
        type: "UPDATE_USER",
        data: user,
    })
}

const removeUser = (user) => {
    store.dispatch({
        type: "REMOVE_USER",
        data: user,
    })
}

const loginAuth = (auth) => {
    store.dispatch({
        type: "LOGIN",
        data: auth,
    })
    axios.defaults.headers['Authorization'] = `Bearer ${auth.auth}`;
}

const updateAuth = (auth) => {
    store.dispatch({
        type: "UPDATE_AUTH",
        data: auth
    })
}

const logoutAuth = () => {
    store.dispatch({
        type: "LOGOUT"
    })
    axios.defaults.headers['Authorization'] = null;
}

/* Export Actions Here */
export { resetStore, addBlog, updateBlog, removeBlog, addComment, removeComment, addUser, updateUser, removeUser, loginAuth, updateAuth, logoutAuth }