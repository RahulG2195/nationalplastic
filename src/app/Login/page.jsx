"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
// import { useNavigate } from "react-router-dom";

import { useRouter } from 'next/navigation'
import "../../styles/profilepage.css";
import { useEffect } from "react";
import { useDispatch , useSelector } from 'react-redux';
import {loginSlice}  from '@/redux/reducer/userSlice'
import toast from "react-hot-toast";
 function Login() {
 
  const ValueFromRedux = useSelector((state) => state.auth.isLoggedIn);
  const [islogin, setislogin] = useState(false);
  const   dispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    setislogin(ValueFromRedux);
  }, [ValueFromRedux]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const  handleSubmit = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!formData.email || !formData.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      //Will be redirecting it to the userSlice
      console.log("Please enterthe userSlice"+formData.email+" and userSlice"+formData.password   )
      console.log(formData)
      console.log("formData"+JSON.stringify(formData));
      // const data2 = "DInesh";
    
        // const response = await dispatch(loginSlice(formData));
        const res = await axios.put(`http://localhost:3000/api/Users`, formData);
      console.log("--------------------------------");
      console.log(JSON.stringify(res));
      console.log(JSON.stringify(res.data));
      console.log(JSON.stringify(res.status));


        if(res.status === 200){
          toast.success("Successfully logged in")
              push('/') 
        }
    else{
          toast.error(res.data.message)
        }
        // setTimeout(() => {
        //   if(islogin  === true) {
        //     
        //   }else {
        //     setErrorMessage("An error occurred during login. Please try again.");

        //   }
        // }, 3000);
    
  
       console.log("response after waiting for  page login");
      // console.log(response);
    
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/About") {
      window.location.reload();
    }
  }, []);

  return (
    <div className="container">
      <div className="row Login-Page-ImgForm">
        <div className="col-md-6 login-image">
          <Image
            src="/assets/images/catalogue/loginPage.png"
            className="img-fluid d-block w-100"
            alt="Team Member"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="col-md-6">
          <div className="Login-Form">
            <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-2">Login</h3>
              <p>Track your order, create wishlist & more</p>
              <div className="row mb-3 mt-3">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-12">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail3"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3 mt-3">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-12 col-form-label"
                >
                  Password
                </label>
                <div className="col-sm-12">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="inputPassword3"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-sm-12">
                  <button
                    type="button"
                    className="btn btn-toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide" : "Show"} Password
                  </button>
                </div>
              </div>
              <div className="form-btn-login-div">
                <button type="submit" className="btn form-btn-login">
                  LOG IN
                </button>
              </div>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <div className="RegisterHere-p">
                <p>
                  New to National Plastic?{" "}
                  <span className="RegisterHere">Register Here</span>
                </p>
              </div>
              <div className="row ContinueWithgoogle">
                <p>
                  OR Continue With{" "}
                  <i className="fa fa-google" aria-hidden="true"></i>
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

