import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const notify = () => toast("Wow so easy!");
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    },
    validate : ( values ) => {
      const errors = {};

      if (!values.name) {
        errors.name  = 'This field cannot be empty';
      } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less';
      }
      

      if (!values.email) {
        errors.email  = 'This field cannot be empty';
      }
   if(values.password !== values.confirmpassword){ errors.confirmpassword = 'confirm password and password should be same';}
      if (!values.password) {
        errors.password = 'This field cannot be empty';
      } if ( values.password.length < 6   ) {
        errors.password = 'Must between 6 to 12 characters' ;
      }
    
      if ( values.confirmpassword.length < 6 ) {
        errors.confirmpassword = 'Must between 6 to 12 characters' ;
      }
     
     

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await axios.post('https://guvi-server.onrender.com/api/auth/register', values);
        navigate('/login');
      } catch (error) {
        console.log(error);
       
      }
    },
  });
  return (
    <div className="container">
       <div className="row mt-5 p-2 align-items-center">
        <div className="col-4"></div>
        <div className="card shadow bg-white col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
      <form onSubmit={formik.handleSubmit}>
      <h3 className="mt-3 text-center">Register</h3>

        <div className="row">
          <div className="col-lg-12 mt-2">
            <label>Name</label>
            <input
              type={'text'}
              name="name"
              id="name"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
            /> {formik.errors.name && formik.touched.name ? <div style={{color : "red"}}>{formik.errors.name}</div> : null }
          </div>
          <div className="col-lg-12 mt-2">
            <label>Email</label>
            <input
              type={'email'}
              name="email"
              id="email"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.email}
            />  {formik.errors.email && formik.touched.email ? <div style={{color : "red"}}>{formik.errors.email}</div> : null }
          </div>
          <div className="col-lg-12 mt-2">
            <label>Password</label>
            <input
              type={'password'}
              name="password"
              id="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.password}
            />{formik.errors.password  && formik.touched.password ? <div style={{color : "red"}}>{formik.errors.password}</div> : null }
          </div>
          <div className="col-lg-12 mt-2">
            <label>Confirm Password</label>
            <input
              type={'password'}
              name="confirmpassword"
              id="confirmpassword"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.confirmpassword}
            />{formik.errors.confirmpassword && formik.touched.confirmpassword ? <div style={{color : "red"}}>{formik.errors.confirmpassword}</div> : null }
          </div>
          <div className="col-lg-12 mt-2 mb-2 text-center">
            <button   onClick={notify} className="btn btn-primary " value="Submit" >Register</button>
            <ToastContainer />
          </div>
        </div>
      </form>
     </div>  
     </div> 
    </div>
  );
}

export default Register;