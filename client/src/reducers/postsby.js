const postsbyReducer = (state = {data: null}, action) => {
    switch (action.type) {
        case "FETCH_POSTS_BY":
            return { ...state, data: action.payload }
        default:
            return state;
    }
}

export default postsbyReducer