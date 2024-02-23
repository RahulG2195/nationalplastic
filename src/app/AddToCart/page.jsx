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
  const [totalCount, setTotalCount] = useState(0)
  const [totalPrice,setTotalPrice] = useState(0)
  console.log(totalPrice)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/Cart");
        
        setProductDetailArr(response.data.mycart);
        setTotalCount(response.data.mycart.length);
        const Prices = response.data.mycart.reduce((total, item) => total + Number(item.price), 0);
        setTotalPrice(Prices);

        console.log("here is total",totalPrice)

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);


  const onRemoveSuccess = async (product_id) => {
    console.log("wanted to remove", product_id)
    try {
      await axios.delete(`http://localhost:3000/api/Cart`, { data: { product_id } });
      setProductDetailArr(prevItems => prevItems.filter(item => item.product_id !== product_id))

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
                      discountedPrice={val.original_price}
                      productDesc={val.description}
                      onRemoveSuccess={() => onRemoveSuccess(val.product_id)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 place-order">
            <PriceDetailsCard
            cartPrice={totalPrice}
            />
          </div>
        </div>
      </div>

      <FooterRow />
    </>
  );
}

export default AddToCart;
