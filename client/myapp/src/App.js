import React, { createContext, useReducer } from 'react';
import Navbar from './components/Navbar';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';

import "./App.css";
import Logout from './components/Logout';

import { reducer, initialState } from './reducer/Reducer';

export const userContex = createContext();

const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <React.Fragment>
           
        <userContex.Provider  value={{state, dispatch}}>

        <Navbar />

        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        
        </userContex.Provider>

        </React.Fragment>
    )
}

export default App
