"use client";
import Link from "next/link";
import "../../styles/prod_detail.css";
import Image from "next/image";
import NoCostEmi from "../NoCostEmi/NoCostEmi";
import ProductDetailSlider from "../ProductDetailSlider/ProductDetailSlider";
import MoreProduct from "./MoreProducts/MoreProduct";
import IncrementDecrement from "@/Components/AddToCart/IncrementDecrement";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/reducer/cartSlice";
import { addToCartD } from "@/redux/reducer/tempSlice";

import { Bounce, toast } from "react-toastify";
import { useParams } from "next/navigation";
import { isLoggedIn } from "@/utils/validation";
import Breadcrump from "../Breadcrump/Breadcrump";
import GetQuoteCustomForm from "../BulkOrder/GetQuoteCustomForm";

function ProdData() {
  const [data, setData] = useState([]);
  const [prodData, setProdData] = useState([]);
  const userState = useSelector((state) => state.userData.isLoggedIn);

  const [isLoading, setIsLoading] = useState(true);
  const [productId, setProductId] = useState(null);
  // const [productName, setProductName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [initialCount, setInitialCount] = useState(1);
  const [Product_Color, setProductColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  const notify = () => {
    toast.error("Login To Buy now", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const dispatch = useDispatch();
  const router = useParams();
  const id = router.productId;

  // const increment = () => {
  //   setCount(count + 1);
  // };
  
  const handleIncrement = async () => {
    // await dispatch(increaseQuantity({ product_id: productId }));
    setInitialCount(initialCount + 1);
  };
  const handleDecrement = async () => {
    if (initialCount > 0) {
      // await dispatch(decreaseQuantity({ product_id: productId }));
      setInitialCount(initialCount - 1); // Decrement by 1
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedId = id;
        const productName = id;
        setProductId(storedId);

        const response = await axios.get("/api/Products");
        let filteredData = [];
        let productDetailArr = [];
        let productColor = [];
        if (storedId || productName) {
          filteredData = response.data.products.filter(
            (item) =>
              item.product_id == storedId ||
              item.seo_url.toLowerCase() === productName.toLowerCase()
          );


          // get all color as per prod name
          productColor = response.data.prod_clr.filter(
            (val) =>
              val.product_name == filteredData[0].product_name
          );

          // productDetailArr = response.data.prod_detail.filter(
          //   (item) => item.prod_id == filteredData[0].product_id
          // );
        }
        if (filteredData.length === 0) {
          setErrorMessage("Sorry, this product is not available");
        } else {
          setData(filteredData);
          setProdData(productDetailArr);
          setProductColor(productColor);
          setSelectedColor(filteredData[0].color)
        }
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Error fetching data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchPrice = async (storedId) => {
    //console.log("Fetching price", storedId);
    try {
      const response = await fetch("/api/ProductsCat", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seo_url: storedId }),
      });
      //console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const data = await response.json();
      //console.log(" data ", data);

      return data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      throw error;
    }
  };


  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleMoveToCart = async (storedId, quantity) => {
    //console.log("state", isLoggedInResult);
    //console.log("state", typeof isLoggedInResult);
    const data = await fetchPrice(storedId);
    //console.log(data);

    const price = data.price;
    const discount_price = data.discount_price;
    const product_id = data.product_id;
    switch (userState) {
      case false:
        dispatch(
          addToCartD({
            product_id,
            price,
            discount_price,
            quantity: quantity || 1,
            color: selectedColor,
          })
        );
        break;
      case true:
        dispatch(
          addToCart({
            product_id,
            price,
            discount_price,
            quantity: quantity || 1,
            color: selectedColor,
          })
        );
        break;
      default:
        console.warn(
          "Unexpected login state. Please handle appropriately.",
          isLoggedInResult
        );
      // Consider additional actions for unexpected login states
    }
  };

  if (isLoading) {
    return <div className="hv-100">Loading...</div>;
  }

  if (errorMessage) {
    return <center>{errorMessage}</center>;
  }

  const name = data.length > 0 ? data[0].product_name : null;
  const price = data.length > 0 ? data[0].price : null;
  const orignalPrice = data.length > 0 ? data[0].discount_price : null;
  const image = data.length > 0 ? data[0].image_name : null;
  const saving = (orignalPrice - price).toFixed(2);
  
  return (
    <>
      {/* <Breadcrump productName = {name} /> */}
      <div className="container">
        {/* <div className="heading-section"><h2>Product Details</h2></div> */}
        <div className="row">
          <div className="col-12">
            <Breadcrump />
          </div>
          <div className="col-md-6">
            <ProductDetailSlider imageurl={image} />
          </div>

          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">
                  <h2>{name}</h2>
                </div>

                <div className="reviews-counter d-flex flex-wrap gap-2">
                  <div className="mrp">
                    <h6>
                      <strong>MRP ₹{price}</strong>
                    </h6>
                    <del> ₹{orignalPrice}</del>
                  </div>

                  <div className="d-flex flex-wrap align-items-center">
                    <div className="discount discRes">
                      <p>
                        Save <span>₹</span> {saving}
                      </p>
                    </div>
                    <div className="inc small">
                      <small>(incl. of all taxes)</small>
                    </div>
                  </div>
                </div>

                <div className="prod_type mt-4">
                  <div className="prod_clr">
                    <p>
                      <strong>Color: </strong> {selectedColor}
                    </p>
                    {
                      
                      Product_Color.map((val, index) => {
                       return <input
                          type="radio"
                          name="prod_clr"
                          id={val.color}
                          value={val.color}
                          checked={selectedColor === val.color}
                          onChange={handleColorChange}
                          key={index}
                          className="productDetailsRadio m-1"
                          style={{ '--radio-color': val.color_code }}
                        />
                    })
                    }
                    {/* <label htmlFor="white">White</label> */}
                  </div>
                  {/* <div className="prod_size">
                    <div>
                      <strong>Size: </strong> 0000
                    </div>
                    <input
                      type="text"
                      name="prod_size"
                      id="size"
                      placeholder="Ex: 111"
                    />
                  </div> */}
                </div>
              </div>
              <div className="bulk_order_div">
                {/* <Link href="/BulkOrder" className=""> */}
                <button
                  className="btn btn-danger px-md-5 my-2 ProdbtnRes bulkRes  "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Bulk Order
                </button>
                {/* </Link> */}
              </div>
              <div className="product-ccount">
                <label htmlFor="size">Quantity</label>
                <IncrementDecrement
                  initialCount={initialCount}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
                <p
                  onClick={() => handleMoveToCart(productId, initialCount)}
                  className="btn m-2 px-md-5 ProdbtnRes"
                >
                  Add to Cart
                </p>
                <Link
                  href={userState ? "/Address" : "#"}
                  className={`btn bg-danger text-white m-2 px-md-5 ProdbtnRes ${
                    !userState ? "disabled-button" : ""
                  }`}
                  onClick={() => handleMoveToCart(productId)}
                >
                  Buy Now
                </Link>
              </div>
              <p className="eye">
                <i className="fa fa-eye"></i> 210 customers are interviewing the
                product
              </p>
              <div className="terms fw-medium term_and_condition">
                <Link href="TearnsAndConditions">Terms and Conditions</Link>
                <ul>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                </ul>
              </div>
              {/* <div className=" d-flex flex-wrap justify-content-center position-relative align-items-center m-4 ChkAvblityRes">
                <p className="fw-semibold m-2">Check Availability</p>
                <div className="d-flex flex-wrap justify-content-center align-items-center reschkAvbl">
                  <div>
                    <input
                      className="p-2"
                      type="text"
                      placeholder="Enter Your Pin Code"
                    />
                  </div>
                  <div className="ChckBtnRes">
                    <a
                      href="#"
                      className="btn rounded-0 text-white p-2"
                    >
                      CheckNow
                    </a>
                  </div>
                </div>
              </div> */}

              {/* <div className="freuently_bought mb-2">
                <h6 className="m-3">Frequently Bought Together</h6>
                <div className="combile_price d-flex flex-wrap">
                  <div className="relevent_img d-flex gap-2 align-items-center">
                    <Image
                      src="/Assets/images/Single Altis Image.png"
                      width={100}
                      height={100}
                      layout="responsive"
                      objectFit="cover"
                      alt="img1"
                    />
                    <span>
                      <i className="fa fa-plus"></i>
                    </span>
                    <Image
                      src="/Assets/images/Single Altis Image.png"
                      width={100}
                      height={100}
                      layout="responsive"
                      objectFit="cover"
                      alt="img1"
                    />
                    <span>
                      <i className="fa fa-plus"></i>
                    </span>
                    <Image
                      src="/Assets/images/Single Altis Image.png"
                      width={100}
                      height={100}
                      layout="responsive"
                      objectFit="cover"
                      alt="img1"
                    />
                  </div>

                  <div className="com_price text-top m-3 text-center">
                    <p>Total Price: 0000/-</p>
                    <button
                      type="button"
                      class="btn rounded-0 btn-outline-danger py-1 px-4 fw-semibold medium"
                    >
                      Add selected to cart
                    </button>
                  </div>
                </div>
                <NoCostEmi />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* product info  */}
      <MoreProduct prod_detail={prodData} />

      <div>
        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content modal-content-mypopup">
              {/* <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div> */}
              <div class="modal-body">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <GetQuoteCustomForm prodName={name} />
              </div>
              {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProdData;
