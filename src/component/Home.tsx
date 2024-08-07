import React from 'react'
import logo2 from "../assets/image/logo2.jpeg"
import '../App.css'

const Home: React.FC= ()=>{
    return(
        <div>
            <img src={logo2} className='logo' alt='vite logo'/>

            <div>
            <h1><i>Welome to our Quiz App</i></h1>

            <button> Start now</button>
            </div>
           
        </div>
        
        
    );
};

export default Home;
