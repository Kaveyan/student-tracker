
import React, { useState } from "react";
import Menustudent from './Menustudent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function Upload() {
  const [isBold, setIsBold] = useState(false);



  return (
    <div className='dash'>
    <div className='dash-menu'>
    <Menustudent/>
    </div>

   <div className="dash-main">
   <div className='row1'>

    <div className='projextbox'>
   
      <div className='up-project'>
      <Link to="/up-clan">
      <p>Communication</p>
      <p>Language</p>
           <div className='up-projectin'>
           <p><FontAwesomeIcon icon={faAnglesUp} /></p>
           </div>
           </Link>
      </div>
     
      <div className='up-project'>
      <Link to="/up-ach">
          <p> Achievement </p>
          <div className='up-projectin'>
           <p><FontAwesomeIcon icon={faAnglesUp} /></p>
           </div>
           </Link>
       </div>
       
       <div className='up-project'>
       <Link to="/up-pro">
          <p>Project</p>
          <div className='up-projectin'>
           <p><FontAwesomeIcon icon={faAnglesUp} /></p>
           </div>
           </Link>
       </div>
       
    </div>
    

  </div>
  <div className='row1'>

    <div className='projextbox'>
   
    <div className='up-project'>
    <Link to="/up-lan">
           <p>programming</p>
           <p>Language</p>
           <div className='up-projectin'>
           <p><FontAwesomeIcon icon={faAnglesUp} /></p>
           </div>
           </Link>
      </div>
     
      
     
      <div className='up-project'>
      <Link to="/up-cer">
          <p> Certificates</p>
          <div className='up-projectin'>
           <p><FontAwesomeIcon icon={faAnglesUp} /></p>
           </div>
           </Link>
       </div>
      
      
       <div className='up-project'>
       
          <p>Coding Profile</p>
          <div className='up-projectin'>
           <p><FontAwesomeIcon icon={faAnglesUp} /></p>
           </div>
        
       </div>
      
       
       
    </div>
    

  </div>
 

  </div>  
  
 
  </div>
  );
}
