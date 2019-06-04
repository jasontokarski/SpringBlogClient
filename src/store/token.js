

import axios from 'axios';

const initial = {};

const GET_TOKEN = "GET_TOKEN";

const getToken = (token, usernameOrEmail) => ({
    type: GET_TOKEN,
    token,
    usernameOrEmail
})

export const token = (usernameOrEmail, password) => async dispatch => {
    try {
        const {data} = await axios.post('http://localhost:8084/api/auth/signin', {
          usernameOrEmail,
          password
        })
        console.log(data);
        dispatch(getToken(data, usernameOrEmail));
    } catch (err) {
        console.error(err);
    }
}

export default function(state=initial, action) {
    switch(action.type) {
        case GET_TOKEN:
            return {token: action.token, usernameOrEmail: action.usernameOrEmail}
        default:
            return state
    }
}
