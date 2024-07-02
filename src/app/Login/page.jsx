"use client";
// import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useNavigate } from 'next/router'; // Import useRouter from 'next/router'
// import { useRouter } from 'next/router';
import "../../styles/profilepage.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/reducer/userSlice";
// import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { notify } from "@/utils/notify";


function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState(false);
  const router = useRouter(); // Use useRouter on the client-side only
  // const navigate =useNavigate();
  // const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [refresh, SetRefresh] = useState(false);
  useEffect(() => {
    if (session) {
      // Send session data to your backend
      axios.post('/api/googleProvider', session.user)
        .then(response => {
          console.log('Response from API:', response.data);
          console.log(response.body);
          console.log('Response from API:',);
          const email = response.data.email
          const customer_id = response.data.customer_id


          if (status === "authenticated" && session?.user) {
            notify("Successfull login!")
            dispatch(
              setUserData({
                email: email,
                customer_id: customer_id,
              })
            );
            router.push("/"); // Redirect to homepage
          }
        })
        .catch(error => {
          console.log('Error sending data to API:', error);
        });
      //  hasSentRequest.current = true; 
    }
  }, [session, refresh]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleResetPassword = async (event) => {
    router.push("/forgot-password");
  };
  const handleRegisterClick = async (event) => {
    router.push("/Register");
  };
  async function sendDataToBackend() {
    try {
      await signIn("google")
      const response = await axios.post('/api/googleProvider', session.user);
      console.log('Response from API:', response.data);
      const { email, customer_id } = response.data;
      console.log("before if == = = =");
      if (status === "authenticated" && session?.user) {
        console.log("inside if == = = =");
        dispatch(
          setUserData({
            email: email,
            customer_id: customer_id,
          })
        );
        console.log("inside if == =2 = =");
        SetRefresh(true);
        // router.push("/"); // Redirect to homepage
      }
      console.log("inside if == = 3= =");
    } catch (error) {
      console.log('Error sending data to API:', error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    const loginLoader = async () => {
      try {
        const res = await axios.put(`/api/Users`, formData);
        const userData = res.data.message[0];
        const { customer_id } = userData;

        const isAdmin = res.data.isAdmin ? res.data.isAdmin[0] : null;
        if (isAdmin !== null) {
          localStorage.setItem("adminjwt", isAdmin);
        }
        if (res.data.status === 500) {
          const errorMsg = res.data.message;
          setErrorMessage(errorMsg);
          throw new Error(errorMsg || "Failed to Login");
        } else {
          setLogin(true);
          dispatch(
            setUserData({
              email: formData.email,
              customer_id: customer_id,
            })
          );
        }
      } catch (error) {
        setErrorMessage(
          error.message || "An error occurred during login. Please try again."
        );

        throw new Error(error.message || "Failed to Login");
      }
    };
    toast.promise(
      loginLoader(),
      {
        pending: "Logging In...",
        success: "Login successfully!",
        error: {
          render({ data }) {
            return data.message || "Failed to Login";
          },
        },
      },
      {
        position: "top-center",
        transition: Bounce,
      }
    );
  };

  return (
    <div className="container">
      <div className="row Login-Page-ImgForm">
        <div className="col-md-6 login-image">
          <Image
            src="/Assets/images/catalogue/loginPage.png"
            className="img-fluid d-block w-100"
            alt="Team Member"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="col-md-6 bg-white">
          <div className="Login-Form">
            <form onSubmit={handleSubmit} className="loginForm">
              <h4 className="text-left loginText mb-2">Login</h4>
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
                    placeholder="Enter Your Email"
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
                  <div className="password-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="password-field form-control"
                      placeholder="Enter Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <i
                      class={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      id="togglePassword"
                      onClick={() => setShowPassword((prevShow) => !prevShow)}
                    ></i>
                  </div>
                  <p
                    onClick={handleResetPassword}
                    className="pt-2 d-flex justify-content-between"
                  >
                    Forgot Password{" ? "}
                    <span
                      style={{ textDecoration: "none", cursor: "pointer" }}
                      onMouseOver={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.textDecoration = "none")
                      }
                      className="text-danger text-bold text-uppercase"
                    >
                      Reset Password
                    </span>
                  </p>
                </div>
              </div>
              <div className="form-btn-login-div">
                <button type="submit" className="btn form-btn-login">
                  {/* LOG IN */}

                  {login ? (
                    // <Link href="/">Home</Link>
                    // router.push("/"),
                    (window.location.href = "/")
                  ) : (
                    // window.location.reload("/")

                    <Link href="/Login" className="login_link">
                      Login
                    </Link>
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
                    className="text-danger text-bold"
                  >
                    Register Here
                  </span>
                </p>
              </div>
              <div className="row ContinueWithgoogle">
                <p className="d-flex justify-content-center">
                  OR Continue With
                  {/* <Image
                    src="/Assets/images/search.png"
                    width={20}
                    height={20}
                    alt="google"
                    className="mx-2"
                  /> */}
                  {/* <button
                    className="btn btn-light mt-3"
                    onClick={() => sendDataToBackend()}
                  > */}
                    <Image
                    src="/Assets/images/search.png"
                    width={20}
                    height={20}
                    alt="google"
                    className="mx-2"
                    onClick={() => sendDataToBackend()}
                  />
                  {/* </button> */}
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
