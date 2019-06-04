import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store, {token} from '../store';
import './signin.css';

class Signin extends Component {
    constructor() {
        super()
        this.state = {
            isSubmitted: false,
        }
        this.direc = this.direc.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    direc() {
        this.props.history.push('/signup')
    }

    async logIn(e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      await this.props.getToken(username, password);

      //Check if there is a response
      if(this.props.token.token) {
        //Check if an accessToken exists
        if(this.props.token.token.accessToken) {
            this.props.history.push('/portal');
        }
      } else {
          this.setState({
            isSubmitted: true
        })
      }
    }

    render() {
        console.log(this.props.token)
        return (
          <div>
                <form className="form-signin">
                    {
                      this.props.username.length && !this.state.isSubmitted ? <div className="alert alert-success">Sign up successful! Please log in.</div> : <div/>
                    }
                    <h2 className="form-signin-heading">Sign in</h2>
                    <div className="subheader">Continue to the blog portal</div>
                    <input type="text" className="form-control" name="username" id="username" placeholder="Username" required={true} autoFocus="" />
                    <input type="password" className="form-control" name="password" id="password" placeholder="Password" required={true}/>
                    <label className="checkbox">
                        <input type="checkbox" value="remember me" id="rememberMe" name="rememberMe"/> Remember Me
                    </label>
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.logIn}>Login</button>
                    {
                      !this.props.token.success && this.state.isSubmitted ? <label style={{marginTop: "5px", color: "red"}}>Invalid entry, check your email/password</label> : <div/>
                    }
                    <div className="bottomLink">Need an account?<Link to={"/signup"}> Signup</Link> </div>
              </form>
          </div>
        )
    }
}

//this.props.token and this.props.username
const mapState = state => {
    return {
        token: state.token,
        username: store.getState().user
    }
}

//If dispatch works it will update the state above
const mapDispatch = dispatch => {
    return {
        getToken: (username, password) => dispatch(token(username, password)),
    }
}

export default connect(mapState, mapDispatch)(Signin)
