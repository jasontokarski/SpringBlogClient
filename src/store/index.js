import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import user from './user';
import token from './token';

const reducer = combineReducers({
    user,
    token,
    form: formReducer
})

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './token'