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
function AddToCart() {
  // const cartState = useSelector((state) => state.cart);
  const [productDetailArr, setProductDetailArr] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPayble, setTotalPayble] = useState(0);
  const [installationCharges, setInstallationCharges] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString) || {};
    const customerId = userData.customer_id || {};
    const fetchData = async () => {
      try {
        const response = await axios.post("http://13.234.238.29/api/UserCart", {
          customer_id: customerId,
        });
        const cartData = response.data.products;

        // // Extracting relevant data from the cart data
        // //console.log(
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
            seo_url: item.seo_url,
            color: item.color,
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
              color: product.color,
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

    fetchData();
  }, []);

  const handleCartChange = async () => {
    try {
      // Fetch updated cart data
      const userDataString = localStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const customerId = userData.customer_id;
      const response = await axios.post("http://13.234.238.29/api/UserCart", {
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
      // //console.log("wanted to remove", product_id);
      // Remove the product from the database
      const userDataString = localStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const customerId = userData.customer_id;
      const formData = new FormData();
      formData.append("customer_id", customerId);
      formData.append("product_id", product_id);
      const response = await axios.delete("http://13.234.238.29/api/UserCart", {
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //console.log("response", response);

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
                          onRemoveSuccess={() =>
                            onRemoveSuccess(val.product_id)
                          }
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
