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
  const tempCartStates = useSelector((state) => state.temp);
  const userState = useSelector((state) => state.userData.isLoggedIn);
  const productCount = useSelector((state) => {
    let who;
    if (!userState) {
      who = "temp";
    } else {
      who = "cart";
    }
    const cart = state[who] || {};
    return cart.products?.length || 0;
  });

  // Use useState to manage local product count and update function
  const [count, setCount] = useState(productCount);
  const [productDetailArr, setProductDetailArr] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPayble, setTotalPayble] = useState(0);
  const [installationCharges, setInstallationCharges] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    setCount(productCount); // Update localCount whenever productCount changes
  }, [productCount]);
  useEffect(() => {
    console.log("useEffect called inside addtocart page");
    // console.log();

    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString) || {};
    const customerId = userData.customer_id || null;
    let cartData;
    const tempOrUserData = async () => {
      if (customerId) {
        console.log("If loggedIn user");
        const response = await axios.post(
          "http://thatsyourwebsite.com/api/UserCart",
          {
            customer_id: customerId,
          }
        );
        cartData = response.data.products;
        console.log(cartData);
        fetchData(cartData);
      } else {
        //Logic to Store Temporary Data
        const tempData = tempCartStates || {};
        const productIds = tempData.products
          ? tempData.products.map((product) => product.product_id)
          : [];
        // If else to send request to API depending upon No of Product count
        if (productIds.length === 1) {
          console.log("54");
          const response = await axios.post(
            "http://thatsyourwebsite.com/api/tempData",
            {
              product_id: productIds[0],
            }
          );
          const products = response.data.products;
          const quan = tempData.products[0].quantity;
          let obj = products[0];
          obj.quantity = quan;
          const objToArray = new Array(obj);
          //Single product detail with updated quantity
          fetchData(objToArray);
        } else if (productIds.length > 1) {
          // Send request with multiple product IDs
          const response = await axios.post(
            "http://thatsyourwebsite.com/api/tempData",
            {
              product_ids: productIds,
            }
          );
          // const product = response.data.products;
          console.log("Response Where product count is 1", response);
          const products = response.data.products;
          const tempProducts = tempData.products;
          // console.log();
          // Iterate through products and tempProducts to update quantity
          // console.log(tempProduct);

          console.log(tempProducts);

          products.forEach((product) => {
            const tempProduct = tempProducts.find(
              (tempProd) => tempProd.product_id === product.product_id
            );
            console.log(tempProduct);
            if (tempProduct) {
              // Update quantity if corresponding tempProduct is found
              product.quantity = tempProduct.quantity;
            }
          });

          // If you need to convert the updated products into an array
          const updatedProductsArray = Object.values(products);

          // Now, updatedProductsArray contains products with updated quantities

          //Mutiple product detail with updated quantity
          fetchData(updatedProductsArray);
        }
      }
    };

    const fetchData = async (cartData) => {
      // console.log("cd fetch", cartData);
      // cartData.forEach((item, index) => {
      //   console.log(`Item ${index}:`, item);
      // });
      console.log("Length of cartData:", cartData);
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
        console.log("Response From line Number 132", products);
        // state.products.push(action.payload);

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
        // console.log("Response From line Number 132", products);
        // Calculate total price, discount, total payable, and installation charges
        // Calculate total payable amount, total discount, and total price without discount
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

        console.log("Total payable amount:", totalPayable);
        console.log("Total discount:", totalDiscount);
        console.log("Total price without discount:", totalPriceWithoutDiscount);

        const totalCount = products.length;
        // Update state variables
        setProductDetailArr(products);
        console.log("fdghjjjjjjjjjjjjjjjjjjjjjj", products);
        setTotalPrice(totalPriceWithoutDiscount);
        setDiscount(totalDiscount);
        setTotalPayble(totalPayble);
        setInstallationCharges(40);
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
      const response = await axios.post(
        "http://thatsyourwebsite.com/api/UserCart",
        {
          customer_id: customerId,
        }
      );
      //console.log("response", response);
      const cartData = response.data.products;
      console.log("cartdata: ", cartData);
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
      // Calculate product totals
      // log;
      const productTotals = products.map(
        (product) => product.price * product.discount_price * product.quantity
      );
      console.log(productTotals);

      // Calculate total amount of all products
      const totalPrice = productTotals.reduce((acc, curr) => acc + curr, 0);
      console.log(totalPrice);
      // Calculate total discount (consider using discount_price if available)
      const discount = products.reduce((acc, curr) => {
        // Use discount_price if available, otherwise use regular price for discount calculation
        const discountPerItem = curr.discount_price
          ? curr.price - curr.discount_price
          : 0;
        return acc + discountPerItem * curr.quantity;
      }, 0);
      console.log(discount);
      // Calculate total payable amount (consider discount)
      const totalPayble = totalPrice - discount;
      console.log(totalPayble);

      // Calculate total installation charge
      const installationCharges = products.reduce(
        (acc, curr) => acc + curr.InstallationCharges * curr.quantity,
        0
      );
      console.log(installationCharges);
      const totalCount = products.length;
      console.log(totalCount);
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
    console.log("271");

    if (!userState) {
      console.log("271");

      setProductDetailArr((prevItems) =>
        prevItems.filter((item) => item.product_id !== product_id)
      );
      console.log(JSON.stringify(productDetailArr));
      console.log(productDetailArr);

      // setCount(ProductDetailArr.length);
      // handleCartChange();
      console.log("271");
      console.log(productDetailArr);
    } else {
      try {
        console.log("271");

        const userDataString = localStorage.getItem("userData");
        const userData = JSON.parse(userDataString);
        const customerId = userData.customer_id;
        const formData = new FormData();
        formData.append("customer_id", customerId);
        formData.append("product_id", product_id);
        const response = await axios.delete(
          "http://thatsyourwebsite.com/api/UserCart",
          {
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // If all products are removed, update the state to reflect empty cart
        if (productDetailArr.length === 1) {
          console.log("nopes for product", installationCharges);

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
                <h5>My Cart ( {count} Items)</h5>
              </div>
              {/* <div className="col-md-8 search-pin">
                <div className="LocationIconPin">
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
                </div>
              </div> */}
              <hr />
              <div className="cartList">
                {productDetailArr.length === 0 ? (
                  <h5 className="text-secondary text-center py-2">No products in cart</h5>
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
                              onRemoveSuccess(val.product_id);

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
            <div className="coupenDiv p-4">
              <h6 className="pb-2">Have a coupon Code?</h6>
              <form>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="" aria-label="coupon code" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                      <span class="input-group-text coupon_btn" id="basic-addon2">Apply</span>
                    </div>
                </div>
              </form>
            </div>
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
