import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { userContex } from '../App';

const Login = () => {

 const {state, dispatch} = useContext(userContex);

  const history = useHistory();

const [data, setData] = useState({
  email : "",
  password : ""
});

const inputChange = (e) =>{
 const {name, value} = e.target;

 setData((prevVal)=>{
   return {
     ...prevVal, [name] : value
   }
 })
};


const submitForm = async(e) =>{
 e.preventDefault();

 const {email, password} = data;

 const res = await fetch('/login', {
   method : "POST",
   headers : {
     "Content-Type" : "application/json"
   },
   body : JSON.stringify({
     email, password
   })
 });

 const resData = await res.json();

 if(!resData){
   window.alert("invalid credentials")
 }
 else if(res.status === 200){

  if(!email || !password){
    window.alert("fill all fields completely");
  }
  else{
    dispatch({type:"USER", paylod:"true"})
   window.alert("user logged in sucessfully");
   history.push('/');
  }
   
 }

};

  return (
    <React.Fragment>

      <div className="container">

        <div className="login">
          <div className="row">
            <div className="col-md-10 col-12 mx-auto">

              <div className="row">
                <div className="col-md-6 col-12 login_form">

                <form>
                <h2>Login</h2>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1"><i className="fas fa-envelope"></i></label>
                  <input type="email"  id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={data.email} onChange={inputChange} placeholder="Your Email" autoComplete="off"/>
                </div>
                <div className="form-group">
                 <label htmlFor="exampleInputPassword1"><i className="fas fa-lock"></i></label>
                 <input type="password"  id="exampleInputPassword1" name="password" value={data.password} onChange={inputChange} placeholder="Password" autoComplete="off"/>
               </div>
                          
                <button type="submit" className="btn btn-primary" onClick={submitForm}>Login</button>
              </form>

                </div>
                <div className="col-md-6 col-12 login_img">
                <figure>
                <img src="/images/login.jpg" alt="logi" width="100%" />
                </figure>
                <NavLink to="/signup">Don't have account ?</NavLink>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>



    </React.Fragment>
  )
}

export default Login
