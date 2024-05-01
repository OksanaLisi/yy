import React from 'react';
import hacker from './WelcomePage/hacker.png'
import './WelcomePage.scss'
const WelcomePage = () => {
    return (
        <div className="preview" id='blured'>
         <img src={hacker} alt="logo" />
        </div>
    );
}

export default WelcomePage;
