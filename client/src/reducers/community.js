const communityReducer = (state = {data: null}, action) => {
    switch (action.type) {
        case "SEND_POST":
            return { ...state}
        case "FETCH_ALL_POSTS":
            return { ...state, data: action.payload}
        default:
            return state;
    }
}

export default communityReducer