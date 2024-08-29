"use client";
import Image from "next/image";
import "../../styles/addtocart.css";
import CartProduct from "../../Components/AddToCart/CartProduct";
import PriceDetailsCard from "../../Components/PriceDetails/PriceDetailsCard";
// import FooterRow from "@/Components/FooterRow/FooterRow";
import FooterRow from "../../Components/FooterRow/FooterRow.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  addItemToCart,
  removeItemFromCart,
  addToCart,
} from "@/redux/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { addItemToWishlist } from "@/redux/reducer/wishlistSlice";
import {
  addItemToCartD,
  removeItemFromCartD,
  setInitialCountD,
} from "@/redux/reducer/tempSlice";
import { prod } from "../ConstantURL";
import { isLoggedIn } from "@/utils/validation";
import { emptyTempSlice } from "@/redux/reducer/tempSlice";
import { notify, notifyError } from "@/utils/notify";
import { Button } from "reactstrap";
import { applyDiscount } from "@/redux/reducer/couponSlice";
import AddHeader from "@/Components/Address/Adress";

function AddToCart() {
  const CartStates = useSelector((state) => state.cart);
  const tempCartStates = useSelector((state) => state.temp);
  const userState = useSelector((state) => state.userData.isLoggedIn);
  const productCount = useSelector((state) => {
    const cartType = state.userData.isLoggedIn ? state.cart : state.temp;
    return cartType?.products?.length || 0;
  });
  const userID = useSelector((state) => state.userData.customer_id || null);

  // Use useState to manage local product count and update function
  const [count, setCount] = useState(productCount);
  const [productDetailArr, setProductDetailArr] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPayble, setTotalPayble] = useState(0);
  const [installationCharges, setInstallationCharges] = useState(0);
  const [Updated, setUpdated] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [displayCouponCode, setDisplayCouponCode] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const StoreGuestData = async (products) => {
    // Check if user is logged in and products array has items
    if ((await isLoggedIn()) && products.length > 0) {
      try {
        // Use Promise.all to await all dispatch calls in parallel
        await products.map(async (product) => {
          await dispatch(
            addToCart({
              product_id: product.product_id,
              quantity: product.quantity || 1,
              price: product.price,
              discount_price: product.discount_price,
              color: product.color,
              from: 0,
            })
          );
        });

        // After all products are added to the cart, perform final actions
        dispatch(emptyTempSlice());
        setUpdated(false);
      } catch (error) {
        console.error("Error while storing guest data:", error);
        throw error; // Propagate the error further if necessary
      }
    }
  };

  useEffect(() => {
    setCount(productCount); // Update localCount whenever productCount changes
  }, [productCount]);

  useEffect(() => {
    let cartData;
    const tempOrUserData = async () => {
      if (userID) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/UserCart`,
          {
            customer_id: userID,
          }
        );
        cartData = response.data.products;

        if (tempCartStates.products.length > 0 && Updated) {
          const tempData = tempCartStates.products;
          StoreGuestData(tempData);
        }
        fetchData(cartData);
      } else {
        //Logic to Store Temporary Data
        const tempData = tempCartStates || {};
        const productIds = tempData.products
          ? tempData.products.map((product) => product.product_id)
          : [];
        // If else to send request to API depending upon No of Product count
        if (productIds.length === 1) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/tempData`,
            {
              product_id: productIds[0],
            }
          );
          const products = response.data.products;
          let obj = products[0];
          obj.quantity = tempData.products[0].quantity;
          obj.color = tempData.products[0].color;

          const objToArray = new Array(obj);
          //Single product detail with updated quantity

          fetchData(objToArray);
        } else if (productIds.length > 1) {
          // Send request with multiple product IDs
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/tempData`,
            {
              product_ids: productIds,
            }
          );
          // const product = response.data.products;
          const products = response.data.products;
          const tempProducts = tempData.products;
          // Iterate through products and tempProducts to update quantity

          products.forEach((product) => {
            const tempProduct = tempProducts.find(
              (tempProd) => tempProd.product_id === product.product_id
            );

            if (tempProduct) {
              product.quantity = tempProduct.quantity;
              product.color = tempProduct.color;
            }
          });

          // If you need to convert the updated products into an array
          const updatedProductsArray = Object.values(products);

          fetchData(updatedProductsArray);
        }
      }
    };
    const ColorBasedImage = async (color, product_id) => {
      const colorBasedProduct = { color: color, product_id: product_id };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/colorBasedProduct`,
        colorBasedProduct
      );
      const dataBasedOnColor = response.data?.data;
      const NoOfImages = dataBasedOnColor[0].image_name;
    };

    const fetchData = async (cartData) => {
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
            quantity: item.cart_quantity || item.quantity || 1,
            seo_url: item.seo_url,
            color: item.color,
          }),
          []
        );

        const cartLen = CartStates.products.length;

        if (isLoggedIn() && cartLen == 0) {
          products.forEach((product) => {
            dispatch(
              addItemToCart({
                product_id: product.product_id,
                quantity: product.quantity || 1, // Explicitly set quantity to 1
                price: product.price,
                discount_price: product.discount_price,
                color: product.color,
                from: false,
              })
            );
          });
        }
        setProductDetailArr(products);

        const { totalPayable, totalDiscount, totalPriceWithoutDiscount } =
          products.reduce(
            (totals, product) => {
              const productTotal =
                parseFloat(product.price) * parseFloat(product.quantity);
              const discountedProductTotal = product.discount_price
                ? parseFloat(product.discount_price) *
                  parseFloat(product.quantity)
                : productTotal;

              totals.totalPriceWithoutDiscount += productTotal;
              totals.totalPayable += discountedProductTotal;
              totals.totalDiscount +=
                parseFloat(productTotal) - parseFloat(discountedProductTotal);

              return totals;
            },
            { totalPayable: 0, totalDiscount: 0, totalPriceWithoutDiscount: 0 }
          );

        const totalCount = products.length;
        // Update state variables
        setTotalPrice(totalPriceWithoutDiscount);
        setDiscount(totalDiscount);
        setTotalPayble(totalPayble);
        setInstallationCharges(40);
        setTotalCount(totalCount);
        if (isLoggedIn()) {
          dispatch(setInitialCountD);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    tempOrUserData();
  }, [Updated]);

  const handleCartChange = async () => {
    try {
      // Fetch updated cart data

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/UserCart`,
        {
          customer_id: userID,
        }
      );
      const cartData = response.data.products;
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
      // Calculate total price, discount, total payable, and installation charges
      // Calculate product totals
      const productTotals = products.map(
        (product) =>
          parseFloat(product.price) -
          parseFloat(product.discount_price) * parseFloat(product.quantity)
      );
      // Calculate total amount of all products
      const totalPrice = productTotals.reduce(
        (acc, curr) => parseFloat(acc) + parseFloat(curr),
        0
      );
      // Calculate total discount (consider using discount_price if available)
      const discount = products.reduce((acc, curr) => {
        // Use discount_price if available, otherwise use regular price for discount calculation
        const discountPerItem = curr.discount_price
          ? curr.price - curr.discount_price
          : 0;
        return acc + discountPerItem * curr.quantity;
      }, 0);
      // Calculate total payable amount (consider discount)
      const totalPayble = parseFloat(totalPrice) - parseFloat(discount);

      // Calculate total installation charge
      const installationCharges = products.reduce(
        (acc, curr) => acc + curr.InstallationCharges * curr.quantity,
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

  const onRemoveSuccess = async (product_id) => {
    if (!userState) {
      setProductDetailArr((prevItems) =>
        prevItems.filter((item) => item.product_id !== product_id)
      );
    } else {
      try {
        const formData = new FormData();
        formData.append("customer_id", userID);
        formData.append("product_id", product_id);
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/UserCart`,
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
        alert("Error removing item. Please try again later.");
      }
    }
  };
  const handleInputChange = (event) => {
    // event.target.value;
    setIsDisabled(false);
    const data = event.target.value
    setCouponCode(data.toUpperCase());
    setDisplayCouponCode(data.toUpperCase());
    if (data.length > 6) {
      validateCouponCode(data);
    }
  };

  const applyCouponCode = async (message) => {
    const discount_percentage = parseInt(message);
    dispatch(
      applyDiscount({
        discountPercentage: discount_percentage,
        couponCode: couponCode,
      })
    );
  };

  const validateCouponCode = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("api/couponValidation", {
        code: couponCode,
      });
      if (response.data.status === 200) {
        await applyCouponCode(response?.data?.message);
        notify("Coupon code Applied!");
      } else {
        notifyError(response.data.message);
      }
    } catch (e) {
      notifyError("failed to validate coupon code");
    }
  };
  return (
    <>
      <div className="row">
        <div>
          <AddHeader />
        </div>
      </div>
      <div className="container cartView">
        <div className="row r1">
          <div className="col-md-8">
            <div className="row my-cart">
              <div className="col-md-4 py-3">
                <h5>My Cart ( {count} Items)</h5>
              </div>
              <hr />
              <div className="cartList">
                {productDetailArr.length === 0 ? (
                  <h5 className="text-secondary text-center py-2">
                    No products in cart
                  </h5>
                ) : (
                  <div className="container RowCont">
                    {productDetailArr.map((val) => {
                      const images = val
                        ? val.image_name
                            .split(", ")
                            .map((image) => image.trim())
                        : [];
                      return (
                        <div className="row" key={val.product_id}>
                          <CartProduct
                            src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${images[0]}`}
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
                                onRemoveSuccess(val.product_id);
                              } else {
                                onRemoveSuccess(val.product_id);

                                dispatch(removeItemFromCartD(val.product_id));
                              }
                            }}
                            onAddtowishlist={() =>
                              onAddtowishlist(val.product_id)
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 place-order">
            {/* <div className="coupenDiv p-4">
              <h6 className="pb-2">Have a coupon Code?</h6>
              <form onSubmit={validateCouponCode}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter coupon code"
                    aria-label="coupon code"
                    aria-describedby="basic-addon2"
                    onChange={handleInputChange}
                    value={displayCouponCode}
                    maxLength={7}
                  />
                  <div className="input-group-append">
                    <Button className="input-group-text coupon_btn" id="basic-addon2" type="submit" disabled={isDisabled}>
                      Apply
                    </Button>
                  </div>
                </div>
              </form>
            </div> */}
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
