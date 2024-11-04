"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import "../../styles/profilepage.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/reducer/userSlice";
import { toast, Bounce } from "react-toastify";
import { signIn, useSession, getSession } from "next-auth/react";
import { notify, notifyError } from "@/utils/notify";
import { useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const productCount = useSelector((state) => {
    const cart = state.temp;
    return cart.products?.length || 0;
  });

  // Handle session changes and automatic login
  // useEffect(() => {
  //   const handleSessionChange = async () => {
  //     if (status === "authenticated" && session?.user) {
  //       try {
  //         await updateUserData(session.user.email, session.user.customerId);
  //         notify("Login successful");

  //         // Determine redirect path
  //         const returnUrl = localStorage.getItem('returnUrl');
  //         const redirectPath = productCount > 1 ? "/AddToCart" : (returnUrl || "/");

  //         // Clear storage items
  //         localStorage.removeItem('returnUrl');
  //         localStorage.removeItem('fromLogin');

  //         // Redirect
  //         router.push(redirectPath);
  //       } catch (error) {
  //         console.error("Error handling session change:", error);
  //         notify("Error updating user data", "error");
  //       }
  //     }
  //   };

  //   handleSessionChange();
  // }, [status, session, router, productCount]);

  const updateUserData = async (email, customerId) => {
    try {
      const formData = {
        email,
        customer_id: customerId,
      };

      const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/Users`, formData);
      const userData = res.data.message[0];

      // Update Redux store
      dispatch(
        setUserData({
          email: email,
          customer_id: userData.customer_id,
        })
      );

      return userData;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw new Error("Error updating user data. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log("Starting Google sign-in process...");

      localStorage.setItem('fromLogin', 'true');
      console.log("Set 'fromLogin' in localStorage to 'true'");



      const result = await signIn("google", {
        callbackUrl: window.location.origin,
        redirect: false,
      });
      console.log("Google sign-in result:", result);
      let retryCount = 0;
      const maxRetries = 3;
      if (result?.error && result.error === "OAuthCallbackError" && retryCount < maxRetries) {
        console.warn("OAuth error detected, clearing cookies and retrying...");
        document.cookie = "__Secure-next-auth.state=; Max-Age=0; path=/;"; // Clear state cookie

        retryCount++;
        console.log(`Retry attempt ${retryCount} of ${maxRetries}`);
        await signIn("google"); // Retry the sign-in
        return;
      }

      if (result?.error) {
        console.error("Sign-in failed:", result.error);
        notify("Sign-in failed. Please try again.", "error");
        return;
      }

      // Implement exponential backoff for session checking
      console.log("Starting session check with exponential backoff...");
      let session = null;
      let attempts = 0;
      const maxAttempts = 5;
      const backoffDelay = 1000; // Start with 1 second

      while (!session && attempts < maxAttempts) {
        session = await getSession();
        console.log(`Session attempt ${attempts + 1}/${maxAttempts}:`, session);

        if (!session) {
          const delay = backoffDelay * Math.pow(2, attempts);
          console.log(`Session not found. Waiting for ${delay}ms before retrying...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          attempts++;
        }
      }

      if (session?.user) {
        console.log("Session established. User data:", session.user);

        await updateUserData(session.user.email, session.user.customerId);
        console.log("User data updated successfully");

        notify("Successfully signed in");

        const redirectPath = productCount > 1 ? "/AddToCart" : "/";
        console.log("Redirecting to:", redirectPath);
        router.push(redirectPath);
      } else {
        throw new Error("Session not established after multiple attempts");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      notify("An error occurred during sign-in. Please try again.", "error");
    }
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResetPassword = () => {
    router.push("/forgot-password");
  };

  const handleRegisterClick = () => {
    router.push("/Register");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    const loginLoader = async () => {
      try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/Users`, formData);
        const userData = res.data.message[0];

        if (res.data.status === 500) {
          throw new Error(res.data.message || "Failed to Login");
        }

        dispatch(
          setUserData({
            email: formData.email,
            customer_id: userData.customer_id,
            isGoogleUser: false
          })
        );

        localStorage.setItem("isAdmin", "false");

        // Determine redirect path
        const redirectPath = productCount > 1 ? "/AddToCart" : "/";
        router.push(redirectPath);

        return userData;
      } catch (error) {
        setErrorMessage(error.message || "An error occurred during login. Please try again.");
        throw error;
      }
    };

    toast.promise(
      loginLoader(),
      {
        pending: "Logging In...",
        success: "Login successful!",
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
                      className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
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
                <button type="submit" className="btn form-btn-login">Login</button>
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
                  <Image
                    src="/Assets/images/search.png"
                    width={20}
                    height={20}
                    alt="google"
                    className="mx-2"
                    onClick={() => handleGoogleSignIn()}
                    style={{ cursor: 'pointer' }}
                  />
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
