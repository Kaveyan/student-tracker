import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import img2 from "../img/Interaction design Customizable Cartoon Illustrations _ Bro Style.jpeg"; // Change here

function Create() {
  return (
    <div className='background'>
      <div>
        <form>
          <h3 className='sign'>Signup As</h3>
          <Link to="/admin"><button>Admin</button></Link>
          <Link to="/student"><button>Student</button></Link>
          <Link to="/faculty"><button>Faculty</button></Link>
         
          <div className="new">
            <p>Already have an account? &nbsp; &nbsp; &nbsp;  <Link to="/">Login</Link> </p>
          </div>
        </form>
      </div>
      <img src={img2} alt="Illustration" />
    </div>
  );
}

export default Create;


