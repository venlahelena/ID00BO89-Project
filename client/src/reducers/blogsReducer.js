const reducer = (state = [], action) => {

    switch (action.type) {
        case "NEW_BLOG":
            return state.concat(action.data);
        case "UPDATE_BLOG":
            const id = action.data.id;
            const updatedBlog = state.find(item => item.id === id);
            const changedBlog = {
                ...updatedBlog, ...action.data
            };
            return state.map(item =>
                item.id !== id ? item : changedBlog
            );
        case "REMOVE_BLOG":
            return state.filter(item => item.id !== action.data.id);
        case "RESET":
            return state = [];
        default:
            return state;
    }
}

export default reducer;