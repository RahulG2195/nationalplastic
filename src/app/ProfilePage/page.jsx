"use client";
import FooterRow from "@/Components/FooterRow/FooterRow";
import "../../styles/profilepage.css";
import Wishlist from "../Wishlist/page";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import { notify, notifyError } from "@/utils/notify.js";
import { useSelector } from "react-redux";

function ProfilePage() {

  useEffect(() => {
    localStorage.getItem("isLoggedIn") === "true"
      ? true
      : (window.location.href = "Login");

    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true"
        ? true
        : (window.location.href = "Login");

    // //console.log("isLoggedIn+++++", isLoggedIn)
    const storedData = JSON.parse(localStorage.getItem("userData")) || {};
    // Retrieve data from local storage
    const userDataString = localStorage.getItem("userData");
    // Convert the retrieved data from string to JSON object
    const userDataID = JSON.parse(userDataString);
    // //console.log("userDataID....", isLoggedIn);

    // Example: Accessing the email property

    // setIsLoggedIn(isLoggedIn);
    setData(storedData);
  }, []);
  const userEmail = useSelector((state) => state.userData.email);

  const [editable, setEditable] = useState(false);
  const [adress2, setAdress2] = useState("");

  const handleInputAddressChange = (event) => {
    setAdress2(event.target.value);
  };

  const updateAddressTwo = async (event) => {
    event.preventDefault();
    const data = {
      Adress2: adress2,
      Id: cust_id,
    };
    console.log("Address2:", adress2);
    const response = await axios.put(
      "http://localhost:3000/api/UserProfile",
      data
    );
    const status = response.statusCode || response.status;
    if (status === 200) {
      notify("Updated address");
    } else {
      notifyError(response.message);
    }
    console.log(response.body);

    setAdress2("");
  };

  const allowEdit = () => {
    setEditable(!editable);
  };

  const [idd, setIdd] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
    address: "",
  });
  const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
  const cust_id = messages.length > 0 ? messages[0].customer_id : null;
  const email_id = messages.length > 0 ? messages[0].Email : null;

  const [editedData, setEditedData] = useState({
    Id: "",
    Phone: "",
    Address: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("mahn");
        const formData = {
          email: userEmail,
          getProfile: true,
        };
        console.log("Error fetching user data:", formData);

        const response = await axios.put("/api/Users", formData);
        console.log("Error fetching user data:", response);

        const userData = response.data.message[0]; // Directly access response.data.message
        const { customer_id, Email } = userData; // Destructure from userData, not from JSON.stringify
        const UpdateData = {
          email: Email,
          customer_id: customer_id,
        };
        localStorage.setItem("userData", JSON.stringify(UpdateData));
        const responseData = response.data;
        const messageArray = responseData.message;
        setMessages(messageArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
      Id: cust_id,
    }));

    let errorMessage = "";

    // Validate phone number
    if (name === "phone") {
      const phoneNumber = value.replace(/\D/g, ""); // Remove non-digit characters
      if (phoneNumber.length !== 10) {
        errorMessage = "Phone number must be 10 digits";
      }
    }

    // Update the form data state and the error message for the current input field
    setFormData((prev) => ({
      ...prev,
      // [name]: name === 'image' ? files[0] : value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    //console.log("event" + e.target);
    try {
      // Gather form data from the event target
      const formData = new FormData(e.target);
      //console.log(".........formData", formData);
      const email = formData.get("email");
      const phone = formData.get("phone");
      const address = formData.get("address");

      const userData = {
        Email: email,
        Phone: phone,
        Address: address,
      };
      const response = await axios.post(
        "/api/UserProfile",
        editedData
      );
      toast.success("Data updated successfully");
      if (response.status == 200) {
        fetchUserData();
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data. Please try again.");
    }
  };

  async function handleLogout(e) {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      setData({}); // Clear user data
      window.location.href = "/";
    }
  }

  return (
    <>
      <div className="container profile-page-container mb-5">
        <div className="row">
          <div className="col-md-4">
            <div className="Left-Profile">
              <div className="Left-Profile-inner">
                <div>
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                </div>
                <div className="profile-detail">
                  <p className="fw-semibold darkBlue">Hello,</p>
                  <p className="fw-bold">{data.email}</p>
                </div>
              </div>
              <hr />
              <div className="EditAccount " onClick={allowEdit}>
                <div>
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </div>
                <p className="fw-semibold">Edit Account</p>
              </div>
            </div>

            <div className="Left-Profile-inner2">
              <div className="list-group" id="list-tab" role="tablist">
                <a
                  className="list-group-item list-group-item-action active fw-semibold "
                  id="list-home-list"
                  data-bs-toggle="list"
                  href="#list-home"
                  role="tab"
                  aria-controls="list-home"
                >
                  My Profile
                </a>
                <a
                  className="list-group-item list-group-item-action fw-semibold"
                  id="list-order-list"
                  data-bs-toggle="list"
                  href="#list-order"
                  role="tab"
                  aria-controls="list-order"
                >
                  Order List
                </a>
                <a
                  className="list-group-item list-group-item-action fw-semibold"
                  id="list-Password-list"
                  data-bs-toggle="list"
                  href="#list-Password"
                  role="tab"
                  aria-controls="list-Password"
                >
                  Change Password
                </a>
                <a
                  className="list-group-item list-group-item-action fw-semibold"
                  id="list-messages-list"
                  data-bs-toggle="list"
                  href="#list-messages"
                  role="tab"
                  aria-controls="list-messages"
                >
                  Wishlist
                </a>
                <a
                  className="list-group-item list-group-item-action fw-semibold"
                  id="list-settings-list"
                  data-bs-toggle="list"
                  href="#list-settings"
                  role="tab"
                  aria-controls="list-settings"
                >
                  Help Desk
                </a>
                <a
                  className="d-flex list-group-item list-group-item-action fw-semibold logout_btn"
                  id="list-settings-lists"
                  data-bs-toggle="list"
                  onClick={handleLogout}
                >
                  <div>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </div>
                  <p className="fw-semibold">Logout</p>
                </a>
              </div>

              {/* <div onClick={handleLogout} className="EditAccount list-group-item list-group-item-action fw-semibold">
                <div>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                </div>
                <p className="fw-semibold">Logout</p>
              </div> */}
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
                  <h3 className="fs-4 fw-semibold ">My Account</h3>
                  <hr />
                  <div>
                    <div>
                      {/* {Array.isArray(messages) && messages.length > 0 ? (messages.map((message, index) => (
                        <div key={index}>
                          <p>Customer ID: {message.customer_id}</p>
                          <p>First Name: {message.FirstName}</p>
                          <p>Last Name: {message.LasttName}</p>
                          <p>Email: {message.Email}</p>
                          <p>Phone: {message.Phone}</p>
                          <p>Address: {message.Address}</p>
                          <p>Address2: {message.Adress2}</p>
                          <p>Password: {message.Password}</p>
                        </div>
                      ))
                      ) : (
                        <div>You are not loggedin</div>
                      )
                    } */}

                      {Array.isArray(messages) ||
                        (messages.length > 0 && messages != null) ? (
                        messages.map((message, index) => (
                          <form key={index} onSubmit={handleEdit}>
                            <div className="row user-data">
                              <input
                                type="hidden"
                                className="form-control"
                                name="Id"
                                readOnly
                              />

                              <div className="col-md-6">
                                <label htmlFor="">First Name</label>
                                <input
                                  type="text"
                                  className="form-control fw-semibold"
                                  placeholder={`${message.FirstName} `}
                                  readOnly
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="">Last Name</label>
                                <input
                                  type="text"
                                  className="form-control fw-semibold"
                                  placeholder={`${message.LasttName}`}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="row user-data">
                              <div className="col-md-6">
                                <label htmlFor="email">E-mail Address</label>
                                <input
                                  // name="email"
                                  type="text"
                                  className="form-control  fw-semibold"
                                  placeholder={message.Email}
                                  name="Email"
                                  onChange={handleInputChange}
                                  readOnly
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="">Mobile Number</label>
                                <input
                                  // name="phone"
                                  type="text"
                                  className="form-control  fw-semibold"
                                  placeholder={message.Phone}
                                  defaultValue={message.Phone}
                                  name="Phone"
                                  onChange={handleInputChange}
                                  readOnly={!editable}
                                />
                              </div>
                            </div>
                            <div className="row user-data">
                              <div className="col">
                                <label htmlFor="">Address</label>
                                <textarea className="form-control fw-semibold" name="Address" readOnly={!editable}>
                                  {message.Address}
                                </textarea>
                              </div>
                            </div>
                            <div className="form-group row user-data">
                              <div className="col-sm-10">
                                <button
                                  type="submit"
                                  className="btn form-btn"
                                  hidden={!editable}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </form>
                        ))
                      ) : (
                        <div className="text-danger">You are not loggedin</div>
                      )}
                    </div>
                  </div>
                  <h3 className="fs-4 fw-semibold">Add Secondary Address</h3>
                  <hr />

                  <div>
                    {(Array.isArray(messages) && messages.length > 0) ||
                      messages !== null ? (
                      messages.map((message, index) => (
                        <form key={index} onSubmit={updateAddressTwo}>
                          <div className="row user-data">
                            <div className="col">
                              <label htmlFor="">Secondary Address</label>
                              {/* <input
                                required
                                type="text"
                                className="form-control fw-semibold"
                                placeholder={
                                  message.Adress2 || "Please enter Address"
                                }
                                defaultValue={
                                  message.Adress2 || "Please enter Address"
                                }
                                onChange={handleInputAddressChange}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col-sm-10">
                              <button type="submit" className="btn form-btn">
                                {message.Adress2 ? "Update" : "Add"}
                              </button>
                            </div>
                          </div>
                        </form>
                      ))
                    ) : (
                      <div className="text-danger">You are.##############</div>
                    )}
                  </div>
                </div>
              </div>
              {/* Address Book */}
              {/* <div
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
                            className="form-control fw-semibold"
                            placeholder="First name"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">Last name</label>
                          <input
                            type="text"
                            className="form-control fw-semibold"
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">E-mail Address</label>
                          <input
                            type="text"
                            className="form-control fw-semibold"
                            placeholder="E-mail Address"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control fw-semibold"
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
                            className="form-control fw-semibold"
                            placeholder="First name"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">New Password</label>
                          <input
                            type="text"
                            className="form-control fw-semibold"
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
              </div> */}

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
                  <div className="row mx-auto">
                    <div className="col-md-6">
                      <a href="tel: +91000000000"><strong>Give a call :</strong><u> 0000000000000 </u></a>
                    </div>
                    <div className="col-md-6">
                      <a href="mail:nationalplastic@gmail.com"><strong>Or Send Mail to us :</strong><u>nationaplastic@gmail.com </u></a>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="list-order"
                role="tabpanel"
                aria-labelledby="list-settings-list"
              >
                <div className="Right-Profile">
                  <h3>Order List </h3>
                  <hr />

                  <h5 className="text-center p-2">No Order Placed </h5>
                  <hr />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="list-Password"
                role="tabpanel"
                aria-labelledby="list-settings-list"
              >
                <div className="Right-Profile">
                  <h3>Change Password</h3>
                  <hr />
                  <div>
                    <form>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">New Password</label>
                          <input
                            type="password"
                            required
                            className="form-control fw-semibold"
                            placeholder="New Password"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">Confirm Password</label>
                          <input
                            type="password"
                            required
                            className="form-control fw-semibold"
                            placeholder="Confirm Password"
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

      <div className="my-5">
        <FooterRow />
      </div>
    </>
  );
}

export default ProfilePage;
