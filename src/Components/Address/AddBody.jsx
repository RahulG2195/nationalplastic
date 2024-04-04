"use client";
import React, { useState, useEffect } from "react";
import FooterRow from "../FooterRow/FooterRow";
import OrderSummaryCard from "../OrderSummaryCard/OrderCard";
import PriceDetailsCard from "../PriceDetails/PriceDetailsCard";
import "./AddBody.css";
// import React, { useEffect, useState } from "react";
import axios from "axios";
import { addItemToCart } from "@/redux/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const AddBody = () => {
  const [productDetailArr, setProductDetailArr] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPayble, setTotalPayble] = useState(0);
  const [installationCharges, setInstallationCharges] = useState(0);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [Phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleEdit = () => {
    setEditable(!editable);
  };

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = () => {
    // Here you can perform any action with the submitted address, like sending it to an API
    //console.log("Submitted Address:", address);
    setEditable(false);
    // Reset the address input after submission
    setAddress("");
  };
  const getAdress = async () => {
    const email = localStorage.getItem("userData");
    const data = JSON.parse(email);
    const useremail = data.email;
    const formData = {
      email: useremail,
      getProfile: true,
    };

    const response = await axios.put(
      "http://localhost:3000/api/Users",
      formData
    );
    const userData = response.data.message[0];
    //console.log("userData", userData);
    //console.log("userData", JSON.stringify(userData));

    const { Address, FirstName, Phone } = userData;
    const addressString = JSON.stringify(Address);
    const addressWithoutQuotes = addressString.replace(/^"|"$/g, "");
    setAddress(addressWithoutQuotes);
    setFirstName(FirstName);
    setPhone(Phone);
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString) || {};
    const DummyData = localStorage.getItem("temp");
    const Dummies = JSON.parse(DummyData) || {};

    const customerId = userData.customer_id || {};

    const fetchData = async () => {
      let cartData;
      try {
        if (!Dummies) {
          //console.log("Dummies ", Dummies);
          //console.log("Dummies ", JSON.stringify(Dummies));
          cartData = Dummies;
        } else {
          const response = await axios.post(
            "http://localhost:3000/api/UserCart",
            {
              customer_id: customerId,
            }
          );
          getAdress();
          cartData = response.data.products;
        }

        const products = cartData.map(
          (item) => ({
            product_id: item.product_id,
            product_name: item.product_name,
            price: item.price,
            discount_price: item.discount_price,
            discount_percentage: item.discount_percentage,
            image_name: item.image_name,
            description: item.short_description,
            InstallationCharges: item.InstallationCharges,
            quantity: item.cart_quantity,
          }),
          []
        );

        products.forEach((product) => {
          //console.log("products forEach: " + product.product_id);
          //console.log("products forEach: " + product.price);
          //console.log("products forEach: " + JSON.stringify(product));
          // //console.log("products forEach: " + product.cart_ quantity);

          dispatch(
            addItemToCart({
              product_id: product.product_id,
              quantity: product.quantity, // Explicitly set quantity to 1
              price: product.price,
              discount_price: product.discount_price,
              from: false,
            })
          );
        });

        // Calculate total price, discount, total payable, and installation charges
        const totalPrice = products.reduce(
          (total, product) => total + parseFloat(product.discount_price),
          0
        );
        const discount = products
          .reduce((total, product) => {
            const discountAmount =
              parseFloat(product.discount_price) - parseFloat(product.price);
            return total + discountAmount;
          }, 0)
          .toFixed(2);
        const totalPayble = products.reduce(
          (total, product) =>
            total +
            parseFloat(product.price) +
            parseFloat(product.InstallationCharges),
          0
        );
        const installationCharges = products.reduce(
          (total, product) => total + parseFloat(product.InstallationCharges),
          0
        );
        const totalCount = products.length;

        // Update state variables
        setProductDetailArr(products);
        setTotalPrice(totalPrice);
        setDiscount(discount);
        setTotalPayble(totalPayble);
        setInstallationCharges(installationCharges);
        setTotalCount(totalCount);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="main_container  position-relative">
        <div className="container text-center mb-5 pb-5">
          <div className="row gap-5 ">
            <div className="col-md-8 px-5 Addleft">
              <div className="bordrBtm ">
                <p className="text-start fw-semibold confirm bordrBtm p-3">
                  Confirm Order
                </p>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div className="medium fw-bold">SHIPPING ADDRESS</div>
                  <div
                    onClick={handleEdit}
                    className="text-danger fw-bold mb onHOverFocus"
                  >
                    Change Address
                  </div>
                </div>
                <div>
                  <p className="fw-bold text-start py-1">{name}</p>
                </div>
                <div className="text-start customerAddress">
                  {editable ? (
                    <div className="medium fw-semibold checkOutCptResp flex">
                      <input
                        type="text"
                        value={address}
                        onChange={handleChange}
                        className="form-control"
                        placeholder={address}
                      />
                      <button
                        onClick={handleSubmit}
                        className="sizing rounded-2 fw-semibold bg-success text-white border-0"
                      >
                        Submit{" "}
                      </button>
                    </div>
                  ) : (
                    <div className="medium fw-semibold checkOutCptResp flex">
                      <span
                        type="text"
                        value={address}
                        onChange={handleChange}
                        className="fw-semibold"
                        placeholder={address}
                        readOnly={true}
                      >
                        {address}
                      </span>
                    </div>
                  )}
                  <div className="my-3 medium fw-bold">
                    <div className="text-start fw-bold mt-3">
                      {FirstName !== undefined ? FirstName : null}
                    </div>
                    <div className="text-start fw-bold mt-3">
                      {Phone !== undefined ? Phone : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-start fw-bold mt-3">Service Lift</div>
              <div className="d-flex align-items-center gap-5 liftOptionsResp">
                <div className="form-check py-3">
                  <input
                    className="form-check-input border-black"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label "
                    htmlFor="flexRadioDefault1"
                  >
                    Available
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input border-black"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Not Available
                  </label>
                </div>
              </div>
              <div className="buying text-start mt-4 p-3 bg-white">
                <input
                  className="form-check-input border-black"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-danger mx-2 fw-bold "
                  htmlFor="flexCheckDefault"
                >
                  Buying for your Business?
                </label>
              </div>

              <form className="text-start mt-3">
                <div className="mb-3 d-flex flex-wrap gap-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-danger px-5 SaveBtnResp"
                >
                  Save
                </button>
                <p className="small fw-semibold py-2">
                  Note : After placing an order, GSTIN cannot be changed.
                  Registration state must match either with the billing or the
                  shipping state.
                </p>
              </form>
            </div>

            <div className="col-md-3 AddRight text-start">
              <div className="row">
                <div className="col-md-12 BGcolor summary mb-2 p-3">
                  <PriceDetailsCard
                    itemCount={totalCount}
                    cartPrice={totalPrice}
                    totalDiscount={discount}
                    totalPay={totalPayble}
                    InstallationCharges={installationCharges}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 BGcolor">
                  <p className="text-start fw-semibold confirm bordrBtm p-3">
                    Order Summary
                  </p>
                  <div>
                    {productDetailArr.length === 0 ? (
                      <h2 className="text-secondary">No products in cart</h2>
                    ) : (
                      <div className="container">
                        {productDetailArr.map((val) => (
                          <div className="row" key={val.product_id}>
                            <OrderSummaryCard
                              imgSrc={`/Assets/images/New-launches-1/${val.image_name}`}
                              description={val.product_name}
                              quantity={val.quantity}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn border Darkblue fw-semibold border-danger mt-2 viewMoreResp"
                    >
                      View More . . .{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-3">
          {" "}
          <FooterRow />
        </div>
      </div>
    </>
  );
};

export default AddBody;
