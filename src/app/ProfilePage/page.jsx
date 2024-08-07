"use client";
import FooterRow from "@/Components/FooterRow/FooterRow";
import "../../styles/profilepage.css";
import Wishlist from "../Wishlist/page";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
// import { useRouter } from "next/router";
import { notify, notifyError } from "@/utils/notify.js";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from 'next/image';

import CancelProdChargeAfterTwentyFourHr, { ReturnProductBeforeFourteenDays } from "@/utils/CancelProduct";
import {
  isValidPassword,
  isValidReason, // Address validations
} from "@/utils/validation";
import ProdEmail from "@/Components/ReturnProdEmail/prodEmail";
import Cookies from 'js-cookie';
import { signOut } from "next-auth/react";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
function ProfilePage() {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [InitialName, setInitialName] = useState('');
  const userEmail = useSelector((state) => state.userData.email);
  const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
  const [editable, setEditable] = useState(false);
  const [adress2, setAdress2] = useState("");
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [ReturnSingleProd, setReturnSingleProd] = useState([]);
  const [VerifyReturnDays, setVerifyReturnDays] = useState([]);
  // const [firstImage , setFirstImage] = useState("Altis-chair-Black-(45)-white bg.webp");
  // redirect to admin to admin panel 
  useEffect(() => {
    const IsAdmin = localStorage.getItem('isAdmin');
    if (IsAdmin == 'true') {
      router.push("/admin")
    }
  }, []);

  useEffect(() => {
    localStorage.getItem("isLoggedIn") === "true"
      ? true
      : (window.location.href = "Login");

    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true"
        ? true
        : (window.location.href = "Login");

    const storedData = JSON.parse(localStorage.getItem("userData")) || {};
    // Retrieve data from local storage
    const userDataString = localStorage.getItem("userData");
    // Convert the retrieved data from string to JSON object
    const userDataID = JSON.parse(userDataString);

    // Example: Accessing the email property

    // setIsLoggedIn(isLoggedIn);
    setData(storedData);
  }, []);


  // Get user ID from context (replace with your logic)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newPassword || !confirmPassword) {
      setError("Missing required fields (newPassword, confirmPassword)");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const requestData = {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        Id: cust_id,
      };

      // Send DELETE request to the API endpoint
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/Users`, requestData);

      if (response.data.status === 200) {
        setSuccess("Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Internal server error");
    }
  };

  const handleInputAddressChange = (event) => {
    setAdress2(event.target.value);
  };

  const updateAddressTwo = async (event) => {
    event.preventDefault();
    const data = {
      Adress2: adress2,
      Id: cust_id,
    };
    if (!isValidReason(adress2)) {
      toast.error("Please enter a  Valid address.");
      return;
    }
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/UserProfile`, data);
    const status = response.statusCode || response.status;
    if (status === 200) {
      notify("Updated address");
    } else {
      notifyError(response.message);
    }

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


  const cust_id = messages.length > 0 ? messages[0].customer_id : null;
  const email_id = messages.length > 0 ? messages[0].Email : null;

  const [editedData, setEditedData] = useState({
    Id: "",
    Phone: "",
    Address: "",
  });

  const [basicInfo, setBasicInfo] = useState({
    mobile_number1: '',
    email: ''
  });
  const [initialBasicInfo, setInitialBasicInfo] = useState({});

  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const response = await axios.get('/api/basicInfo');
        const basicInfoData = response.data.basicInfo;
        setBasicInfo(basicInfoData);
        setInitialBasicInfo(basicInfoData);
      } catch (error) {
        console.error('There was an error fetching the basic info!', error);
      }
    };

    fetchBasicInfo();
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const formData = { email: userEmail, getProfile: true, };

        const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/Users`, formData);

        const userData = response.data.message[0]; // Directly access response.data.message
        const { customer_id, Email, FirstName, LasttName } = userData; // Destructure from userData, not from JSON.stringify
        setFirstName(FirstName)
        setLastName(LasttName)
        const UpdateData = { email: Email, customer_id: customer_id, };

        // get order data 
        const OrderResponse = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/UserOrder`, UpdateData);
        setOrderData(OrderResponse.data.orderData);

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
  }, [userEmail]);

  useEffect(() => {

    if (FirstName && LastName) {
      setInitialName(FirstName[0].toUpperCase() + LastName[0].toUpperCase());
    }
    else {
      setInitialName('N' + 'P');
    }
  }, [FirstName, LastName]);


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
    if (name === "address") {
      const allowedChars = /^[a-zA-Z0-9\s]+$/; // Regular expression for allowed characters
      if (!allowedChars.test(value)) {
        errorMessage =
          "Address can only contain spaces, numbers, and letters (a-z, A-Z).";
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
    try {
      const updatedData = {
        ...editedData, // Copy existing properties from editedData
        Id: cust_id, // Add or update Id property
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/UserProfile`, updatedData);

      notify("UserProfile updated");
      toast.success("Data updated successfully");
    } catch (error) {
      notifyError(error.message);
      console.error("Error updating data:", error);
      toast.error("Error updating data. Please try again.");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    confirm({
      title: 'Are you sure you want to log out?',
      icon: <ExclamationCircleOutlined />,
      content: 'Your session will be ended and you will be redirected to the home page.',
      okText: 'Yes, log out',
      cancelText: 'No, stay logged in',
      onOk() {
        localStorage.clear();
        signOut();
        setData({}); // Clear user data
        axios.delete("api/Users")
          .then(() => {
            window.location.href = "/";
          })
          .catch((error) => {
            console.error("Error during logout:", error.message);
            notifyError("logout", error.message);
          });
      },
      onCancel() {
      },
    });
  };

  const CancelProduct = async (prod_id, user_id, od_id) => {
    try {

      const checkorderStatus = orderData.filter((od) => od.prod_id == prod_id && od.customer_id == user_id && od.od_id == od_id);

      const extraAmt = CancelProdChargeAfterTwentyFourHr(checkorderStatus[0]['order_status_date']);
      const orderStatus = checkorderStatus[0]['order_status'];

      if (extraAmt > 0 && orderStatus >= 2) {
        const confirm = window.confirm('Cancelling the order will incur a fee of ₹50. Do you want to proceed?');

        if (!confirm) {
          // User chose not to proceed
          return;

        } else {
          const ProdData = { prod_id: prod_id, user_id: user_id, extraCharge: extraAmt, order_id: checkorderStatus[0].order_id, type: 'Cancel' };
          var res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/UserOrder`, ProdData);
        }

      } else {
        const ProdData = { prod_id: prod_id, user_id: user_id, extraCharge: extraAmt, order_id: checkorderStatus[0].order_id, type: 'Cancel' };
        var res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/UserOrder`, ProdData);
      }


      // setCancelProdCharge()
      if (res.data.message === 'Order status Updated') {

        notify("Your order cancel Request has been sent");
        toast.success("Your order cancel Request has been sent");

      } else {

        notify("Your order cancel Request fail");
        toast.success("Your order cancel Request fail");

      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const ReturnProduct = async (prod_id, user_id, od_id) => {

    try {

      const GetSingleData = orderData.filter((od) => od.prod_id == prod_id && od.customer_id == user_id && od.od_id == od_id)
      const fourteendayvalidate = ReturnProductBeforeFourteenDays(GetSingleData[0]['order_status_date']);

      setReturnSingleProd(GetSingleData);
      setVerifyReturnDays(fourteendayvalidate)

      if (fourteendayvalidate > 0) {
        const ProdData = { prod_id: prod_id, user_id: user_id, order_id: GetSingleData[0].order_id, type: 'return' };
        var res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/UserOrder`, ProdData);

        if (res.data.message === 'Order status Updated') {

          notify("Your order Return Request has been sent");
          toast.success("Your order Return Request has been sent");

        } else {

          notify("Your order Return Request fail");
          toast.success("Your order Return Request fail");

        }
      }


    } catch (error) {
      console.error('Error:', error);
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
                  {/* <i className="fa fa-user-circle" aria-hidden="true"></i> */}
                  <span className="InitialName profileInitialName">{InitialName}</span>
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
                                <textarea
                                  className="form-control fw-semibold"
                                  name="Address"
                                  readOnly={!editable}
                                  onChange={handleInputChange}
                                >
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

                              <textarea
                                required
                                type="text"
                                className="form-control fw-semibold"
                                placeholder="Please Enter Address"
                                // placeholder={
                                //   message.Adress2 || "Please enter Address"
                                // }
                                // defaultValue={
                                //   message.Adress2 || "Please enter Address"
                                // }
                                onChange={handleInputAddressChange}
                              ></textarea>
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
                      <a href={`tel: ${basicInfo.mobile_number1}`}>
                        <strong>Give a call :</strong>
                        <u> +91-{basicInfo.mobile_number1}</u>
                      </a>
                    </div>
                    <div className="col-md-6">
                      <a href="mail:nationalplastic@gmail.com">
                        <strong>Or Send Mail to us : </strong>
                        <u>{basicInfo.email}</u>
                      </a>
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

                  <table className="table table-bordered table-responsive border-primary table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {orderData && orderData.length > 0 ? (
                      <tbody>
                        {
                          orderData.map((data, index) => {
                            let vdate = ReturnProductBeforeFourteenDays(data['order_status_date']);
                            if (data.image_name) {
                              var images = data ? data.image_name.split(', ').map(image => image.trim()) : [];
                              // setFirstImage(images[0]);
                            }

                            let ReturnCancelBtn;

                            {/* order status == delivered  */ }
                            if (data.order_status === 5 && vdate <= 14) {

                              if (data['per_order_status'] == 0 && data['return_order'] == 0) {
                                ReturnCancelBtn = <button className="btn btn-light btn-rounded" disabled>Return confirmation Sent</button>
                              } else {
                                ReturnCancelBtn = <button className="btn btn-danger btn-rounded" data-bs-toggle="modal" data-bs-target="#ReturnProd" onClick={() => ReturnProduct(data.product_id, data.customer_id, data.od_id)}>Return order</button>
                              }


                            } else if (data.order_status === 1 || data.order_status === 2 || data.order_status === 3 || data.order_status === 4) {

                              if (data.per_order_status === 1) {

                                ReturnCancelBtn = <button className="btn btn-warning btn-rounded" onClick={() => CancelProduct(data.product_id, data.customer_id, data.od_id)}>Cancel order</button>

                              } else {

                                {/* once order status get 0 in db it will show order cancelled  */ }
                                ReturnCancelBtn = <button className="btn btn-light btn-rounded" disabled>Order Canceled</button>

                              }

                            } else if (data.order_status == 6) {

                              ReturnCancelBtn = <button className="btn btn-light btn-rounded" disabled>Order Canceled</button>

                            } else if (data.order_status == 7) {
                              ReturnCancelBtn = <button className="btn btn-light btn-rounded" disabled>Order Returned</button>
                            } else {
                              ReturnCancelBtn = <button className="btn btn-light btn-rounded" disabled>Order Placed</button>;
                            }
                            return <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                <Link href={`/ProductDetail/${data.seo_url}`}>
                                  <Image
                                    src={images && images.length > 0 ? `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${images[0]}` : '/Altis-chair-Black-(45)-white bg.webp'}
                                    height={50}
                                    width={50}
                                    alt="prod_image"
                                  />
                                </Link>
                              </td>
                              <td><Link href={`/ProductDetail/${data.seo_url}`}>{data.product_name}</Link></td>
                              <td>{data.quantity}</td>
                              <td>₹ {data.quantity * data.prod_price} </td>
                              <td>
                                {ReturnCancelBtn}
                              </td>
                            </tr>
                          })
                        }
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="6" className="text-center">No order data available</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
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
                    <form onSubmit={handleSubmit}>
                      <div className="row user-data">
                        <div className="col">
                          <label htmlFor="">New Password</label>
                          <input
                            type="password"
                            required
                            className="form-control fw-semibold"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="">Confirm Password</label>
                          <input
                            type="password"
                            required
                            className="form-control fw-semibold"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}
                      {success && (
                        <div className="alert alert-success">{success}</div>
                      )}

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

      {/* popup */}
      <div>
        <div
          className="modal fade"
          id="ReturnProd"
          tabIndex={-1}
          aria-labelledby="ReturnProdLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content modal-content-mypopup">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
                {
                  ReturnSingleProd.length > 0 ?
                    <ProdEmail OId={ReturnSingleProd[0]['od_id']} cID={ReturnSingleProd[0]['customer_id']} cEmail={ReturnSingleProd[0]['customer_email']} cPhone={ReturnSingleProd[0]['Phone']} pID={ReturnSingleProd[0]['prod_id']} price={ReturnSingleProd[0]['prod_price']} qty={ReturnSingleProd[0]['quantity']}></ProdEmail>
                    : ''
                }

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ProfilePage;
