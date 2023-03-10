import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      
      email: '',
      password: ''
      
    },
    validate : ( values ) => {
      const errors = {};
      if (!values.email) {
        errors.email  = 'This field cannot be empty';
      }
   
      if (!values.password) {
        errors.password = 'This field cannot be empty';
      } else if ( values.password.length > 15 ) {
        errors.password = 'Must be below 15 characters';
      }
     

      return errors;
    },
    onSubmit: async (values) => {
        try {
            let loginData = await axios.post("https://guvi-server.onrender.com/api/auth/login", values);
            localStorage.setItem("user", JSON.stringify(loginData.data));
            navigate("/profile")
            toast.success('Successfully updated!', {
              position: toast.POSITION.TOP_RIGHT
          })
      
          } catch (error) {
            console.log(error)
            toast.error('Wrongcredentials!', {
              position: toast.POSITION.TOP_RIGHT
          })
          
          }
    },
  });


  return (
    <>
     <div className="container h-100 ">
       <div  className="row mt-5 p-2 ">
        <div className="col-4"></div>
        <div className="card shadow bg-white col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
      <form onSubmit={formik.handleSubmit}>
      <h3 className="mt-3 text-center">Login</h3>

        <div className="row">
         
          <div className="col-lg-12 mt-2">
            <label>Email</label>
            <input
              type={'email'}
              name="email"
              id="email"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.email}
            />  {formik.errors.email ? <div style={{color : "red"}}>{formik.errors.email}</div> : null }
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
            />{formik.errors.password ? <div style={{color : "red"}}>{formik.errors.password}</div> : null }
          </div>

          <div className="text-center mt-2 mb-2 ">
            <button   className="btn btn-primary"  type = {"submit"} value="Submit" >Login</button>
            <ToastContainer />
          </div>
        </div>
      </form>
     </div>  
     </div> 
    </div>
    </>
   
  );
}

export default Login;