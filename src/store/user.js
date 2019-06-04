const initial = {};

const GET_USER = "GET_USER";

const getUser = user => ({
    type: GET_USER,
    user,
})

export const loggin = (username) => async dispatch => {
    try {
        dispatch(getUser(username));
    } catch (err) {
        console.error(err);
    }
}

export default function(state=initial, action) {
    switch(action.type) {
        case GET_USER:
            return action.user;
        default:
            return state;
    }
}
