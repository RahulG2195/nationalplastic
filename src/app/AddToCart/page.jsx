"use client"
import Image from "next/image";
import "../../styles/addtocart.css";
import CartProduct from "@/Components/AddToCart/CartProduct";
import PriceDetailsCard from "@/Components/PriceDetails/PriceDetailsCard";
import FooterRow from "@/Components/FooterRow/FooterRow";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AddToCart() {
  const [productDetailArr, setProductDetailArr] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPayble, setTotalPayble] = useState(0);
  const [installationCharges, setInstallationCharges] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/Cart");
        const cartData = response.data.products;
        
        // Extracting relevant data from the cart data
        const products = cartData.map(item => ({
          product_id: item.product_id,
          product_name: item.product_name,
          price: item.price,
          discount_price: item.discount_price,
          image_name: item.image_name,
          description: item.short_description,
          InstallationCharges: item.InstallationCharges
        }));

        // Calculate total price, discount, total payable, and installation charges
        const totalPrice = products.reduce((total, product) => total + parseFloat(product.price), 0);
        const discount = products.reduce((total, product) => total + parseFloat(product.discount_price), 0);
        const totalPayble = products.reduce((total, product) => total + parseFloat(product.price) + parseFloat(product.InstallationCharges), 0);
        const installationCharges = products.reduce((total, product) => total + parseFloat(product.InstallationCharges), 0);
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

    fetchData();
  }, [totalPrice]);

  const handleCartChange = async () => {
    try {
      // Fetch updated cart data
      const response = await axios.get("http://localhost:3000/api/Cart");
      const cartData = response.data.products;
  
      // Extracting relevant data from the cart data
      const products = cartData.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        discount_price: item.discount_price,
        image_name: item.image_name,
        description: item.short_description,
        InstallationCharges: item.InstallationCharges
      }));
  
      // Calculate total price, discount, total payable, and installation charges
      const totalPrice = products.reduce((total, product) => total + parseFloat(product.price), 0);
      const discount = products.reduce((total, product) => total + parseFloat(product.discount_price), 0);
      const totalPayble = products.reduce((total, product) => total + parseFloat(product.price) + parseFloat(product.InstallationCharges), 0);
      const installationCharges = products.reduce((total, product) => total + parseFloat(product.InstallationCharges), 0);
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
    try {
      console.log("wanted to remove", product_id);
      // Remove the product from the database
      await axios.delete(`http://localhost:3000/api/Cart`, { data: { product_id } });
  
      // If all products are removed, update the state to reflect empty cart
      if (productDetailArr.length === 1) {
        setProductDetailArr([]);
        setTotalPrice(0);
        setDiscount(0);
        setTotalPayble(0);
        setInstallationCharges(0);
        setTotalCount(0);
      } else {
        // Remove the product from the state
        setProductDetailArr(prevItems => prevItems.filter(item => item.product_id !== product_id));
  
        // Fetch updated cart data
        handleCartChange();
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Error removing item. Please try again later.");
    }
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
        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <div className="row my-cart">
              <div className="col-md-4">
                <h5>My Cart ({totalCount})</h5>
              </div>
              <div className="col-md-8 search-pin">
                <div className="LocationIconPin">
                  <div className="locationIcon">
                    <div className="iconImage">
                      <Image
                        src="/Assets/images/AddTOCart/Icon-location.png"
                        className="img-fluid d-block w-3"
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
              </div>
              <hr />

              <div className="container">
                {productDetailArr.map((val) => (
                  <div className="row" key={val.product_id}>
                    <CartProduct
                      src={`/Assets/images/New-launches-1/${val.image_name}`}
                      productId={val.product_id}
                      productName={val.product_name}
                      productPrice={val.price}
                      discountedPrice={val.discount_price}
                      productDesc={val.description}
                      onRemoveSuccess={() => onRemoveSuccess(val.product_id)}
                    />
                  </div>
                ))}
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
            />
          </div>
        </div>
      </div>

      <FooterRow />
    </>
  );
}

export default AddToCart;
