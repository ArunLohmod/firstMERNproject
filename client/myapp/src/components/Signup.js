import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';

const Signup = () => {

  const history = useHistory();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: ""
  });

  const inputChange = (e) => {
    const { name, value } = e.target;

    setData((prevVal) => {
      return {
        ...prevVal, [name]: value
      }
    })
  };

  //sending data to backend
  const submitForm = async(e) =>{

    e.preventDefault();

    const {name, email, phone, work, password, cpassword} = data;
  
  try {
    
    const res = await fetch("/signup", {
     method : "POST",
     headers : {
       "Content-Type" : "application/json"
     },
     body:JSON.stringify({
      name, email, phone, work, password, cpassword
     })
   });

   const resData =  await res.json();

   if(res.status !== 201 || !resData){
     window.alert("Not Registered Sucessfully")
   }
   else{
     window.alert("User Registered Sucessfully")
     history.push('/login')
   }

  } catch (error) {
    console.log(error);
  }

  };


  return (
    <React.Fragment>

      <div className="container">
        <div className="signup">
          <div className="row">
            <div className="col-md-10 col-12 mx-auto">
              <div className="row">
                <div className="col-md-6 col-12 signup_form">
                  <h2>Sign Up</h2>
                  <form method="POST">
                    <div className="form-group">
                      <label htmlFor="name"><i className="fas fa-user"></i></label>
                      <input type="text" id="name" name="name" value={data.name} onChange={inputChange} placeholder="Your Name" autoComplete="off" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1"><i className="fas fa-envelope"></i></label>
                      <input type="email" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={data.email} onChange={inputChange} placeholder="Your Email Address" autoComplete="off" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone"><i className="fas fa-mobile"></i></label>
                      <input type="text" id="phone" name="phone" value={data.phone} onChange={inputChange} placeholder="Your Mobile" autoComplete="off" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="work"><i className="fas fa-briefcase"></i></label>
                      <input type="text" id="work" name="work" value={data.work} onChange={inputChange} placeholder="Your Prefession" autoComplete="off" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1"><i className="fas fa-lock"></i></label>
                      <input type="password" id="exampleInputPassword1" name="password" value={data.password} onChange={inputChange} placeholder="Your Password" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword2"><i className="fas fa-lock"></i></label>
                      <input type="password" id="exampleInputPassword2" name="cpassword" value={data.cpassword} onChange={inputChange} placeholder="Confirm Password" />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={submitForm}>Submit</button>
                  </form>

                </div>

                <div className="col-md-6 col-12 signup_img">

                  <figure>
                    <img src="/images/registration.png" alt="sign" width="100%" />
                  </figure>
                  <NavLink to="/login" className="link">Already Registered ?</NavLink>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>


    </React.Fragment>
  )
}

export default Signup
