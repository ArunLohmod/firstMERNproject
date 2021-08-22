import React, { useEffect, useState } from 'react'

const Home = () => {

    const [user, setUser] = useState('');

const homeData = async() =>{
        
        const res = await fetch('/getData', {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json"
            }
        });
        
        const data = await res.json(); 
        setUser(data.name)


};


useEffect(()=>{
homeData();
}, []);

    return (
        <React.Fragment>
           <div className="homeContainer">
            <div className="homediv">
            <h1>{(user != "") ? `Welcome ${user}` : 'Welcome'}</h1>
            <h3>{(user != "") ? `Happy to see you back :)` : "We are the MERN Developers"}</h3>
            </div>
           </div>
        </React.Fragment>
    )
}

export default Home
