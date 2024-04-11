"use client";
import Image from "next/image";
import "../../styles/addtocart.css";
import CartProduct from "@/Components/AddToCart/CartProduct";
import PriceDetailsCard from "@/Components/PriceDetails/PriceDetailsCard";
import FooterRow from "@/Components/FooterRow/FooterRow";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { addItemToCart, removeItemFromCart } from "@/redux/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { addItemToWishlist } from "@/redux/reducer/wishlistSlice";
import { addItemToCartD, removeItemFromCartD } from "@/redux/reducer/tempSlice";
import { prod } from "../ConstantURL";
import { isLoggedIn } from "@/utils/validation";
function AddToCart() {
  const cartStates = useSelector((state) => state.temp);
  console.log(cartStates);
  const [productDetailArr, setProductDetailArr] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPayble, setTotalPayble] = useState(0);
  const [installationCharges, setInstallationCharges] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(
      "useEffect called----------------------------------------------------------------"
    );
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString) || {};
    const customerId = userData.customer_id || null;
    let cartData;
    const tempOrUserData = async () => {
      if (customerId) {
        console.log("If loggedIn user");
        const response = await axios.post(
          "http://localhost:3000/api/UserCart",
          {
            customer_id: customerId,
          }
        );
        cartData = response.data.products;
        fetchData(cartData);
      } else {
        //Logic to Store Temporary Data
        console.log("^^^^^^^^^^^^^^^^^TEMP^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        const tempData = localStorage.getItem("temp");
        const userData = JSON.parse(tempData) || {};
        console.log("getting LS_data products to get p_id ", userData);
        const productIds = Array.isArray(userData)
          ? userData.map((userData) => userData.product_id)
          : [];

        // If else to send request to API depending upon No of Product count
        if (productIds.length === 1) {
          const response = await axios.post(
            "http://localhost:3000/api/tempData",
            {
              product_id: productIds[0],
            }
          );
          const products = response.data.products;
          const quan = userData[0].quantity;
          console.log(quan);
          console.log(userData);
          console.log("()() ", Array.isArray(products));

          let obj = products[0];

          obj.quantity = quan;
          console.log("-=-", obj);
          const objToArray = new Array(obj);
          console.log(objToArray);

          console.log("9009", objToArray);
          console.log("()() ", Array.isArray(objToArray));

          fetchData(objToArray);
        } else if (productIds.length > 1) {
          // Send request with multiple product IDs
          const response = await axios.post(
            "http://localhost:3000/api/tempData",
            {
              product_ids: productIds,
            }
          );
          // const product = response.data.products;
          console.log("Response Where product count is 1", response);

          const products = response.data.products;
          console.log("()() ", Array.isArray(products));
          console.log("LocalStorage", userData);
          console.log("products: ", products);

          // Loop through each product in the array
          products.forEach((product, index) => {
            // Getting the corresponding user data for the current product
            const userDataForProduct = userData.find(
              (item) => item.id === product.id
            );

            // If userData is found for the current product
            if (userDataForProduct) {
              // Assigning the quantity from userData to the current product object
              product.quantity = userDataForProduct.quantity;

              // Logging the updated product object
              console.log("-=-", product);
            }
          });

          // Creating an array to hold the product objects
          const productsArray = products.map((product) => ({ ...product }));

          // Logging the array of product objects
          console.log(productsArray);

          // Checking if productsArray is an array
          console.log("()() ", Array.isArray(productsArray));
          console.log("(after foreach) ", products);

          fetchData(products);
        }
      }
    };

    const fetchData = async (cartData) => {
      // console.log("cd fetch", cartData);
      // cartData.forEach((item, index) => {
      //   console.log(`Item ${index}:`, item);
      // });
      // console.log("Length of cartData:", cartData.length);
      try {
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
            quantity: item.quantity || 1,
            seo_url: item.seo_url,
            color: item.color,
          }),
          []
        );
        console.log("Response From line Number 132", products);
        // state.products.push(action.payload);

        products.forEach((product) => {
          dispatch(
            addItemToCartD({
              product_id: product.product_id,
              quantity: product.quantity || 1, // Explicitly set quantity to 1
              price: product.price,
              discount_price: product.discount_price,
              color: product.color,
              from: false,
            })
          );
        });
        // console.log("Response From line Number 132", products);
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
        console.log("fdghjjjjjjjjjjjjjjjjjjjjjj", products);
        setTotalPrice(totalPrice);
        setDiscount(discount);
        setTotalPayble(totalPayble);
        setInstallationCharges(installationCharges);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    tempOrUserData();
  }, []);

  const handleCartChange = async () => {
    try {
      // Fetch updated cart data
      const userDataString = localStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const customerId = userData.customer_id;
      const response = await axios.post("http://localhost:3000/api/UserCart", {
        customer_id: customerId,
      });
      //console.log("response", response);
      const cartData = response.data.products;
      //console.log("cartdata: ", cartData);
      // Extracting relevant data from the cart data
      const products = cartData.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        discount_price: item.discount_price,
        image_name: item.image_name,
        description: item.short_description,
        InstallationCharges: item.InstallationCharges,
        quantity: item.cart_quantity,
        seo_url: item.seo_url,
        color: item.color,
      }));
      //console.log("products:-------------------- ", products);

      // Calculate total price, discount, total payable, and installation charges
      const totalPrice = products.reduce(
        (total, product) => total + parseFloat(product.price),
        0
      );
      const discount = products.reduce(
        (total, product) => total + parseFloat(product.discount_price),
        0
      );
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
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const onAddToCart = async (product_id) => {
    dispatch(
      addItemToWishlist({
        product_id: product_id,
      })
    );
  };
  const onRemoveSuccess = async (product_id) => {
    try {
      const userDataString = localStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const customerId = userData.customer_id;
      const formData = new FormData();
      formData.append("customer_id", customerId);
      formData.append("product_id", product_id);
      const response = await axios.delete(
        "http://localhost:3000/api/UserCart",
        {
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // If all products are removed, update the state to reflect empty cart
      if (productDetailArr.length === 1) {
        setProductDetailArr([]);
        setTotalPrice(0);
        setDiscount(0);
        setTotalPayble(0);
        setInstallationCharges(0);
        setTotalCount(0);
        handleCartChange();
      } else {
        // Remove the product from the state
        setProductDetailArr((prevItems) =>
          prevItems.filter((item) => item.product_id !== product_id)
        );

        // Fetch updated cart data
        handleCartChange();
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Error removing item. Please try again later.");
    }
  };
  const updatePriceInCard = (newPrice) => {
    setTotalPrice(newPrice);
  };
  return (
    <>
      <div className="row">
        <div className="ATCflow">
          <p>
            Add to Cart <span> ---------- </span>
          </p>
          <p>
            Address <span> ----------- </span>
          </p>
          <p> Payment</p>
        </div>
      </div>
      <div className="container cartView">
        <div className="row r1">
          <div className="col-md-8">
            <div className="row my-cart">
              <div className="col-md-4 py-3">
                <h5>My Cart ( {totalCount} )</h5>
              </div>
              <div className="col-md-8 search-pin">
                {/* <div className="LocationIconPin">
                  <div className="locationIcon">
                    <div className="iconImage">
                      <Image
                        src="/Assets/images/AddTOCart/Icon-location.png"
                        classname="img-fluid d-block w-3"
                        alt="ome banner 1"
                        width={100}
                        height={80}
                      />
                    </div>
                    <p>Deliver To</p>
                  </div>
                  <div className="locationPin">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Pin code"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <button>Check Now</button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <hr />
              <div>
                {productDetailArr.length === 0 ? (
                  <h2 className="text-secondary">No products in cart</h2>
                ) : (
                  <div className="container RowCont">
                    {productDetailArr.map((val) => (
                      <div className="row" key={val.product_id}>
                        <CartProduct
                          src={`/Assets/images/New-launches-1/${val.image_name}`}
                          productId={val.product_id}
                          productName={val.product_name}
                          productPrice={val.price}
                          discountedPrice={val.discount_price}
                          productDesc={val.description}
                          seourl={val.seo_url}
                          discPer={Math.floor(
                            ((val.discount_price - val.price) /
                              val.discount_price) *
                              100
                          )}
                          color={val.color}
                          installationCharges={val.InstallationCharges}
                          quantity={val.quantity}
                          onRemoveSuccess={() => {
                            if (isLoggedIn()) {
                              console.log("Removing", isLoggedIn);
                              onRemoveSuccess(val.product_id);
                            } else {
                              console.log("Removing", isLoggedIn);
                              console.log("Removing", val.product_id);

                              dispatch(removeItemFromCartD(val.product_id));
                            }
                          }}
                          onAddtowishlist={() =>
                            onAddtowishlist(val.product_id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 place-order">
            <PriceDetailsCard
              itemCount={totalCount}
              cartPrice={totalPrice}
              totalDiscount={discount}
              totalPay={totalPayble}
              InstallationCharges={installationCharges}
              redirect={true}
            />
          </div>
        </div>
      </div>

      <FooterRow />
    </>
  );
}

export default AddToCart;
//console.log("products forEach: " + product.product_id);
//console.log("products forEach: " + product.price);
//console.log("products forEach: " + JSON.stringify(product));
//console.log("products forEach: " + product.cart_ quantity);
// Extracting relevant data from the cart data
//console.log(
//   "-------------------------------------------------------- --" +
//     JSON.stringify(cartData)
// );
// //console.log(
//   "-------------------------------------------------------- --" +
//     typeof cartData
// );
// const isArray = Array.isArray(cartData);
// //console.log(
//   "-------------------------------------------------------- --" +
//     isArray
// );
