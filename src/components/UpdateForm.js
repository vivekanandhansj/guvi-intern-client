import axios from "axios";
import { React, useEffect, useState } from "react";
import { getUserData } from "../helper/projectHelper";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./detail.css";

const UpdateForm = () => {
  const [hide, setHide] = useState(true);
  function notifySuccess (){
    toast.success('Successfully updated!', {
      position: toast.POSITION.TOP_RIGHT
  })
  }
  function changeComponent() {
    setHide(!hide);
    notifySuccess ()
   
  }
 
  const id = getUserData();
  const { values, setValues, touched, errors, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phone: "",
        age: "",
        education: "",
        occupation: "",
      },
      validate: (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "This field cannot be empty";
        } else if (values.name.length > 15) {
          errors.name = "Must be 15 characters or less";
        }

        if (!values.email) {
          errors.email = "This field cannot be empty";
        }

        if (!values.phone) {
          errors.phone = "This field cannot be empty";
        }
        if (values.age > 80) {
          errors.age = "Age cannot be above 80";
        }

        if (!values.education) {
          errors.education = "This field cannot be empty";
        }
        if (!values.occupation) {
          errors.occupation = "This field cannot be empty";
        }

        return errors;
      },
      onSubmit: async (values) => {
        try {
          await axios.put(
            `https://guvi-server.onrender.com/api/user/edituser/${id}`,
            values,
            {
              headers: {
                Authorization: id,
              },
            }
          );
          console.log(values);
          changeComponent();
        } catch (error) {
          console.log(error);
          toast.error("something went wrong please check it!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      },
    });

  useEffect(() => {
    const getData = async () => {
      if (id) {
        try {
          let userData = await axios.get(
            `https://guvi-server.onrender.com/api/user/viewuser/${id}`,
            {
              headers: {
                Authorization: id,
              },
            }
          );
          setValues({
            name: userData.data.name,
            email: userData.data.email,
            phone: userData.data.phone,
            age: userData.data.age,
            education: userData.data.education,
            occupation: userData.data.occupation,
          });
          console.log(userData.data.name);
          console.log(userData.data.occupation);
         
        } catch (error) {
          toast.error("something went wrong please check it!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };

    getData();
  }, [setValues,id]);

  return (
    <>
      {hide ? (
        <>
          <div className="container card-body ">
            <div className="row mt-3">
              <div className="col-3"></div>

              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                <form onSubmit={handleSubmit}>
                  <div className="card  justify-content-center">
                    <h5 className="card-header fs-3 ">
                      {" "}
                      Additional Information{" "}
                    </h5>
                    <div className="container row mt-3 mb-3  ">
                      <div>
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          onChange={handleChange}
                          value={values.name}
                          placeholder="User name"
                        />{" "}
                        {errors.name && touched.name ? (
                          <div style={{ color: "red" }}>{errors.name}</div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          onChange={handleChange}
                          value={values.email}
                          placeholder="Email"
                        />{" "}
                        {errors.email && touched.email ? (
                          <div style={{ color: "red" }}>{errors.email}</div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="phone"
                          onChange={handleChange}
                          value={values.phone ? values.phone : ""}
                          placeholder="Phone number"
                        />{" "}
                        {errors.phone && touched.phone ? (
                          <div style={{ color: "red" }}>{errors.phone}</div>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label"
                        >
                          age
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="age"
                          onChange={handleChange}
                          value={values.age ? values.age : ""}
                          placeholder="age"
                        />{" "}
                        {errors.age && touched.age ? (
                          <div style={{ color: "red" }}>{errors.age}</div>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label"
                        >
                          Education
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="education"
                          onChange={handleChange}
                          value={values.education ? values.education : ""}
                          placeholder="Education"
                        />{" "}
                        {errors.education && touched.education ? (
                          <div style={{ color: "red" }}>{errors.education}</div>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label"
                        >
                          Occupation
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="occupation"
                          onChange={handleChange}
                          value={values.occupation ? values.occupation : ""}
                          placeholder="Occupation"
                        />{" "}
                        {errors.occupation && touched.occupation ? (
                          <div style={{ color: "red" }}>
                            {errors.occupation}
                          </div>
                        ) : null}
                      </div>

                      <div className="d-grid col-3 mt-3 mx-auto  ">
                        <button
                          className="btn btn-outline-primary text-center "
                          type={"submit"}
                          value="Submit"
                          
                          
                        >
                          SUBMIT
                        </button>
                        <ToastContainer />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <> <ToastContainer />
          <div className="page-content page-container" id="page-content">
            <div className="padding">
              <div className="row container d-flex justify-content-center">
                <div className="col-xl-6 col-md-12">
                  <div className="card user-card-full">
                    <div className="row m-l-0 m-r-0">
                      <div className="col-sm-4 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                          <div className="m-b-25">
                            <img
                              src="https://img.icons8.com/bubbles/100/000000/user.png"
                              className="img-radius"
                              alt="profile"
                            />
                          </div>
                          <h6 className="f-w-600">{values.name}</h6>
                          <p>{values.occupation}</p>
                          <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="card-block">
                          <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                            Information
                          </h6>
                          <div className="row">
                            <div className="col-sm-7">
                              <p className="m-b-10 f-w-600">Name</p>
                              <h6 className="text-muted f-w-400 ">
                                {values.name}
                              </h6>
                            </div>
                            <div className="col-sm-5">
                              <p className="m-b-10 f-w-600">Age</p>
                              <h6 className="text-muted f-w-400">
                                {values.age}
                              </h6>
                            </div>
                          </div>
                          <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                            Others
                          </h6>
                          <div className="row">
                            <div className="col-sm-7">
                              <p className="m-b-10 f-w-600">Email</p>
                              <h6 className="text-muted f-w-400 ">
                                {values.email}
                              </h6>
                            </div>
                            <div className="col-sm-5">
                              <p className="m-b-10 f-w-600">Phone</p>
                              <h6 className="text-muted f-w-400">
                                {values.phone}
                              </h6>
                            </div>
                          </div>
                          <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                            Others
                          </h6>
                          <div className="row">
                            <div className="col-sm-7">
                              <p className="m-b-10 f-w-600">Education</p>
                              <h6 className="text-muted f-w-400">
                                {values.education}
                              </h6>
                            </div>
                            <div className="col-sm-5">
                              <p className="m-b-10 f-w-600">Occupation</p>
                              <h6 className="text-muted f-w-400">
                                {values.occupation}
                              </h6>
                            </div>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateForm;
