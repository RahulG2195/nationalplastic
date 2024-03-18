"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
// import { useNavigate } from 'next/router'; // Import useRouter from 'next/router'
// import { useRouter } from 'next/router';
import "../../styles/profilepage.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { authSliceReducer } from "@/redux/reducer/userSlice";
// import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState(false);
  const router = useRouter(); // Use useRouter on the client-side only
  // const navigate =useNavigate();
  // const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleResetPassword = async (event) => {
    router.push("/reset-password");
  };
  const handleRegisterClick = async (event) => {
    router.push("/Register");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/Users`,
        formData
      );
      console.log("this is status ", res.data.status);
      if (res.data.status === 500) {
        setErrorMessage(JSON.stringify(res.data.message));
        alert("Failed to loggedin");
        // router.push('/'); // Redirect to home page after successful login
      } else {
        alert("Successfully logged in");
        setLogin(true);
        // push("/");
        dispatch(authSliceReducer(formData));
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

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
                  <button
                    type="button"
                    className="btn btn-toggle-password"
                    onClick={() => setShowPassword((prevShow) => !prevShow)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"} Password
                  </button>
                </div>
              </div>
              <div className="form-btn-login-div">
                <button type="submit" className="btn form-btn-login">
                  {/* LOG IN */}

                  {login ? (
                    // <Link href="/">Home</Link>
                    router.push("/")
                  ) : (
                    <Link href="/Login">Login</Link>
                  )}
                </button>
              </div>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <div className="RegisterHere-p">
                <p>
                  New to National Plastic{" ? "}
                  <span
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onMouseOver={(e) =>
                      (e.target.style.textDecoration = "underline")
                    }
                    onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                    onClick={handleRegisterClick}
                  >
                    Register Here
                  </span>
                </p>
                <p onClick={handleResetPassword}>
                  Forgot Password{" ? "}
                  <span
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onMouseOver={(e) =>
                      (e.target.style.textDecoration = "underline")
                    }
                    onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                  >
                    Reset Password
                  </span>
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
