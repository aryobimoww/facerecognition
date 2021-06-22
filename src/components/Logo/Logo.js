import React from 'react';
import Tilt from 'react-tilt';
import Brain from './brain.png';
import './Logo.css';

const Logo = () => {
   return(
   <div className='ml5 mt1'>
        <Tilt className="Tilt shadow-5" options={{ max : 35 }} style={{ height: 150, width: 150 }}>
        <div className="Tilt-inner"> <img alt='brain' src={Brain}/> </div>
        </Tilt>
   </div> 
   );  
}
export default Logo;