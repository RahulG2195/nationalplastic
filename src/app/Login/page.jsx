import Image from "next/image";
import "../../styles/profilepage.css";
function Login() {
  return (
    <>
      <div className="container">
        <div>
          <div className="row Login-Page-ImgForm">
            <div className="col-md-6 login-image">
              <Image
                src="/Assets/images/catalogue/loginPage.png"
                className="img-fluid d-block w-100" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
                alt="Team Member"
                width={100}
                height={100}
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="col-md-6">
              <div className="Login-Form">
                <form>
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
                        type="password"
                        className="form-control"
                        id="inputPassword3"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="row">
                      <div className="col-md-6">
                        <a href="#">Forgot Password?</a>
                      </div>
                      <div className="col-md-6">
                        <button className="Login-using-otp">
                          LOGIN USING OTP
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-btn-login-div">
                    <button type="submit" className="btn form-btn-login">
                      LOG IN
                    </button>
                  </div>
                  <div className="RegisterHere-p">
                    <p>
                      New to National Plastic?{" "}
                      <span className="RegisterHere">Register Here</span>
                    </p>
                  </div>

                  <div className="row ContinueWithgoogle">
                    <p>
                      OR Continue With
                      <i class="fa fa-google" aria-hidden="true"></i>
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
