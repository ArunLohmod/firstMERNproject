import React, {useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import { userContex } from '../App';

const Logout = () => {

    const {state, dispatch} = useContext(userContex);

    const history = useHistory();
// sendin logout request to the backend

useEffect(() => {
    fetch('/logout', {
        method : "GET",
        headers :{
        // Accept : "application/json",
        "Content-Type" : "application/json"
    },
    // credentials : "include"
    }).then((res)=>{
      if(res.status != 200){
          console.log("there is an error")
      }
      else if (res.status === 200){
          dispatch({type:"USER", paylod:"false"})
          window.alert("Usser Logged Out successfully...");
          history.push("/login")
      }

    }).catch(error=>{
        console.log(error) })
    
}, [])

    return (
        <div>
            
        </div>
    )
}

export default Logout
