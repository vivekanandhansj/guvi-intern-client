import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
    let navigate = useNavigate();
   
    let handleLogout = () => {

        window.localStorage.removeItem("user");
        
        navigate("/login");

      };
  return (
    <>
 <nav className="navbar bg-light">
        <div className="container-fluid ">
          <a className="navbar-brand" href="#">
            
             <h3 className="ms-2 ">GUVI TASK</h3>
          </a>
          <ul className="nav justify-content-end">
           
            <li className="nav-item">
              <button className="btn btn-danger"  onClick={handleLogout} >
                Logout
              </button>
            
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}