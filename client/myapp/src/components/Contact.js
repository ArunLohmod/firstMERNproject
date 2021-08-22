import React, { useState, useEffect } from 'react'

const Contact = () => {

const [user, setUser] = useState('')

  const getData = async () =>{

   const res = await fetch('/getData', {
     method : "GET",
     headers : {
       "Content-Type" : "application/json"
     }
   });

   const resData = await res.json();
   setUser(resData);

  };

  useEffect(() => {
   getData();
  }, [])



  const [message, setMessage] = useState('');

  const inputChange = (e) =>{
    setMessage(e.target.value);
  };


  const submitForm = async(e) =>{
    e.preventDefault();

    const res = await fetch("/contact", {
     method : "POST",
     headers : {
         "Content-Type" : "application/json"
     },
     body : JSON.stringify({
       message
     })
   });
   const resData = await res.json()

   if(!resData){
     window.alert("messange not sent")
   }
   else{
     window.alert("message sent sucessfully");
     setMessage('');
   }
  };

  return (
    <React.Fragment>

      <div className="container">

        <div className="contact_container">
        <h2>Contact Us</h2>
          <div className="contact">
          <div className="col-md-10 col-12 mx-auto">
            <div className="row">
              <div className="col-md-3 col-12 upper">
                <div className="name">
                  {user.name}
                </div>
              </div>
              <div className="col-md-3 col-12 upper">
                <div className="email">
                  {user.email}
                </div>
              </div>
              <div className="col-md-3 col-12 upper">
                <div className="phone">
                  {user.phone}
                </div>
              </div>
            </div>

            <form action="POST">
            <div class="form-group">
              <label htmlFor="message"><i class="fas fa-comment-dots"></i></label>
              <textarea   id="message" placeholder="Message" name="message" value={message} onChange={inputChange}/>
               
              <button type="submit" class="btn btn-primary" onClick={submitForm}>Submit</button>

              </div>
          </form>

          </div>
          </div>
        </div>

      </div>

    </React.Fragment>
  )
}

export default Contact
