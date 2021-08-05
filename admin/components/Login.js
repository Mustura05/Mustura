import React, { Component } from "react";
import axios from "axios";
import Router from "next/router";
import "../css/style.bundle.css";
import jwt from 'jwt-decode'

const divStyle = {
  margin: "auto",
  marginTop: " 50px",
  //  backgroundImage: 'url(assets/media/bg/bg-3.jpg)'
};

class Login extends Component {
  state = {
    signup: false,
    email: "",
    password: "",
    comId: "",
    firstName: "",
    lastName: "",
    userName: "",
    memberType: "",
    errormessage:""
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    console.log("adasdas");

    axios
      .post(
        "http://68.183.239.189:30287/api/v1/field-force/auth/dashboard-user-login",
        {
          email: this.state.email,
          password: this.state.password
     
        }
      )
      .then((response) => {


        localStorage.setItem("token", response.data.auth_token);

        const user = jwt(response.data.auth_token);

        console.log(user);
        localStorage.setItem("userId", user.sub);
        localStorage.setItem("username", user.name);
        localStorage.setItem("companyId",user.company_id);

        Router.push("/user-dashboard");
      })
      .catch((err) => {
        if(err){
         
          this.setState({
            errormessage: " Email / Password is incorrect , please try again "
          })
        }
      });
  };

  Register = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://68.183.239.189:30287/api/v1/field-force/auth/register-dashboard-user",
        {
          email: this.state.email,
          password: this.state.password,
          company_id: this.state.comId,
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          userName: this.state.userName,
          member_type: this.state.memberType,
        }
      )
      .then((response) => {
        console.log(response.data);


        this.setState({
          signup: false,
          email: "",
          password: "",
          comId: "",
          firstName: "",
          lastName: "",
          userName: "",
          memberType: "",
        });
        Router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
      <div class="wrapper fadeInDown">
      <div id="formContent">
       
      
        <div class="fadeIn first header">
          <h3>FFM Admin Panel</h3>
        </div>
    
      
        <form onSubmit={this.submitForm}>

        <span style={{color:"red"}}><b>{this.state.errormessage}</b> </span>
          <input type="email" id="login" class="fadeIn second inputfield" name="email"   onChange={this.onChange} placeholder="User Email" required/>
         
          <input type="password" id="password" class="fadeIn third inputfield"  name="password"  onChange={this.onChange}  placeholder="Password" required/>
         
          <input type="submit" class="fadeIn fourth inputfield" value="Log In "/>


   
        </form>
    
      
   
    
      </div>
    </div>
    </div>
    );
  }
}

export default Login;
