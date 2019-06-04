import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import {
    Signin,
    Signup,
    Portal
} from './component';
import {loggin} from './store';

class Routes extends Component {
    render() {
        const {isLoggedIn} = this.props
        return (
            <Switch>
                <Route exact path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/portal" component={Portal}/>
            </Switch>
        )
    }
}

const mapState = state => {
    return {
        isLoggedIn: true,
        isAdmin: true,
        username: state.user,
    }
}

const mapDispatch = dispatch => {
    return {
        getUser: () => dispatch(loggin()),
    }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
