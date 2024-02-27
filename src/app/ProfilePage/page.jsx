"use client";
import FooterRow from "@/Components/FooterRow/FooterRow";
import "../../styles/profilepage.css";
import Wishlist from "../Wishlist/page";
import { useEffect,useState } from "react";
import { toast } from "react-hot-toast";
function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({});
  async function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    // state.data = {};
    // state.isLoggedIn = false;
    toast.success("Logged out", {
      position: "top", // Adjust position as needed
     // Apply custom styling
      // More options: https://react-hot-toast.com/api/toast
    });
    const isLoggedIn = false;
    const storedData =  {};

    setIsLoggedIn(isLoggedIn);
    setData(storedData);
  }
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    const storedData = JSON.parse(localStorage.getItem("userData")) || {};
    console.log("storedData"+storedData);
    console.log(JSON.stringify(storedData));

    setIsLoggedIn(isLoggedIn);
    setData(storedData);
  }, []);
  return (
    <>
      <div className="container profile-page-container">
        <div className="row">
          <div className="col-md-4">
            <div className="Left-Profile">
              <div className="Left-Profile-inner">
                <div>
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                </div>
                <div className="profile-detail">
                {/* <h5>{data.email}</h5> */}
                  <p>Lorem ipsum.{data.email}</p>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
              <hr />
              <div className="EditAccount">
                <div>
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </div>
                <p>Edit Account</p>
              </div>
            </div>

            <div className="Left-Profile-inner2">
              <div className="list-group" id="list-tab" role="tablist">
                <a
                  className="list-group-item list-group-item-action active"
                  id="list-home-list"
                  data-bs-toggle="list"
                  href="#list-home"
                  role="tab"
                  aria-controls="list-home"
                >
                  My orders
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  id="list-profile-list"
                  data-bs-toggle="list"
                  href="#list-profile"
                  role="tab"
                  aria-controls="list-profile"
                >
                  Address Book
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  id="list-messages-list"
                  data-bs-toggle="list"
                  href="#list-messages"
                  role="tab"
                  aria-controls="list-messages"
                >
                  Wishlist
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  id="list-settings-list"
                  data-bs-toggle="list"
                  href="#list-settings"
                  role="tab"
                  aria-controls="list-settings"
                >
                  Help Desk
                </a>
              </div>

              <div className="EditAccount">
                <div>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                </div>
                <p>Logout</p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="tab-content" id="nav-tabContent">
              {/* My orders */}
              <div
                className="tab-pane fade show active"
                id="list-home"
                role="tabpanel"
                aria-labelledby="list-home-list"
              >
                <div className="Right-Profile">
                  <h3>My Account</h3>
                  <hr />

                  <div>
                    <form>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">First name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">Last name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">E-mail Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="E-mail Address"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                      <div className="form-group row user-data">
                        <div className="col-sm-10">
                          <button type="submit" className="btn form-btn">
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <h3>Change Password</h3>
                  <hr />

                  <div>
                    <form>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">Password</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">New Password</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-sm-10">
                          <button type="submit" className="btn form-btn">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Address Book */}
              <div
                className="tab-pane fade"
                id="list-profile"
                role="tabpanel"
                aria-labelledby="list-profile-list"
              >
                <div className="Right-Profile">
                  <h3>Address Book</h3>
                  <hr />

                  <div>
                    <form>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">First name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">Last name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">E-mail Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="E-mail Address"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                      <div className="form-group row user-data">
                        <div className="col-sm-10">
                          <button type="submit" className="btn form-btn">
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <h3>Change Password</h3>
                  <hr />

                  <div>
                    <form>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">Password</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">New Password</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-sm-10">
                          <button type="submit" className="btn form-btn">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Wishlist */}
              <div
                className="tab-pane fade"
                id="list-messages"
                role="tabpanel"
                aria-labelledby="list-messages-list"
              >
                <Wishlist />
              </div>
              {/* Help Desk */}
              <div
                className="tab-pane fade"
                id="list-settings"
                role="tabpanel"
                aria-labelledby="list-settings-list"
              >
                <div className="Right-Profile">
                  <h3>Help Desk</h3>
                  <hr />

                  <div>
                    <form>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">First name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">Last name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">E-mail Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="E-mail Address"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                      <div className="form-group row user-data">
                        <div className="col-sm-10">
                          <button type="submit" className="btn form-btn">
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <h3>Change Password</h3>
                  <hr />

                  <div>
                    <form>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">Password</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">New Password</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-sm-10">
                          <button type="submit" className="btn form-btn">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterRow />
    </>
  );
}

export default ProfilePage;
