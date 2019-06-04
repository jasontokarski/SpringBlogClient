import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {loggin} from '../store';
import './signup.css';

class Signup extends Component {
  constructor() {
    super()
    this.state = {}
    this.validateForm = this.validateForm.bind(this);
    this.doValidation = this.doValidation.bind(this);
    this.getUserToken = this.getUserToken.bind(this);
    this.direc = this.direc.bind(this);
  }

  direc() {
    this.props.history.push('signin');
  }

  resetFn() {
      document.getElementById("firstname").classList.remove('errorClass');
      document.getElementById("fn").innerHTML = "";
  }

  resetLn() {
    document.getElementById("lastname").classList.remove('errorClass');
      document.getElementById("ln").innerHTML = "";
  }

  resetUn() {
    document.getElementById("username").classList.remove('errorClass');
      document.getElementById("un").innerHTML = "";
  }

  resetPs() {
    document.getElementById("password").classList.remove('errorClass');
      document.getElementById("ps").innerHTML = "";
  }

  resetEm() {
    document.getElementById("email").classList.remove('errorClass');
      document.getElementById("em").innerHTML = "";
  }

  doValidation() {
    let validInput = true;

    var pass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

    if (document.getElementById("firstname").value.length < 3) {
      document.getElementById("fn").innerHTML = "First name must be at least 3 characters";
      document.getElementById("firstname").classList.add('errorClass');
      validInput = false;
    } else if (document.getElementById("lastname").value.length < 3) {
      document.getElementById("ln").innerHTML = "Last name must be at least 3 characters";
      document.getElementById("lastname").classList.add('errorClass');
      validInput = false;
    } else if(document.getElementById("username").value.length < 3) {
      document.getElementById("un").innerHTML = "Username must be at least 3 characters";
      document.getElementById("username").classList.add('errorClass');
      validInput = false;
    } else if (!document.getElementById("password").value.match(pass)) {
      document.getElementById("ps").innerHTML = "Minimum eight characters, at least one letter, one number and one special character:";
      document.getElementById("password").classList.add('errorClass');
      validInput = false;
    } else if (!document.getElementById("email").value.match(mailformat)) {
      document.getElementById("em").innerHTML = "Invalid email address format";
      document.getElementById("email").classList.add('errorClass');
      validInput = false;
    }
    return validInput;
  }

  validateForm(evt) {
    evt.preventDefault();
    if(this.doValidation()) {
      this.getUserToken();
    } else {
      console.log("validation error");
    }
  }

  getUserToken() {
    const username = document.getElementById("username").value;
    axios.post('http://localhost:8084/api/auth/signup', {
      firstName: document.getElementById("firstname").value,
      lastName: document.getElementById("lastname").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      email: document.getElementById("email").value
    }).then(res => {
      console.log(res.data);
      if(res.data.success) {
        this.props.getUser(username);
        //Send the user back to this page
        this.props.history.push('/signin');
      }
    }).catch(err => {
      alert("Invalid Entry, please try again")
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <form className="form-signup">
            <h2 className="form-signup-heading">Registration</h2>
            <div className="subheader">Open a free account!</div>
            <div id="fn"></div>
            <input id ="firstname" className="form-control" type="text"  placeholder="First Name" onClick={this.resetFn}/>
            <div id="ln"></div>
            <input id="lastname" className="form-control" type="text"  placeholder="Last Name" onClick={this.resetLn}/>
            <div id="un"></div>
            <input id="username" className="form-control"  placeholder="Username" type="text" onClick={this.resetUn}/>
            <div id="ps"></div>
            <input name="password" className="form-control" id="password" placeholder="Password" onClick={this.resetPs} type="password"/>
            <div id="em"></div>
            <input id ="email" className="form-control" placeholder="Email" type="email" onClick={this.resetEm}/>
            <div id="space"></div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.validateForm}>Submit</button>
            <div className="bottomLink">Already have an account? <Link to={"/signin"}>Sign in</Link></div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    username: state.username,
  }
}

const mapDispatch = dispatch => {
  return {
      getUser: username => dispatch(loggin(username)),
  }
}

export default connect(mapState, mapDispatch)(Signup)
