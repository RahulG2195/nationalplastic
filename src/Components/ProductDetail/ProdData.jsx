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

function ProdData({ category_id }) {
  const [data, setData] = useState([]);
  const [prodData, setProdData] = useState([]);
  const userState = useSelector((state) => state.userData.isLoggedIn);
  const [categoryId, setCategoryId] = useState(null); // For Id of category to send to breadcrumbs
  const [categoryName, setCategoryName] = useState(null); // For Name of category to send to breadcrumbs
  const [isLoading, setIsLoading] = useState(true);
  const [productId, setProductId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [initialCount, setInitialCount] = useState(1);
  const [Product_Color, setProductColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
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

          const catName = filteredData[0].category_id;
          category(catName);
          setCategoryId(catName);

          // get all color as per prod name
          productColor = response.data.prod_clr.filter(
            (val) => val.product_name == filteredData[0].product_name
          );
          // console.log("get all color as per prod name", productColor);
          // console.log(response.data.prod_detail);
          // console.log(filteredData[0].product_id);

          productDetailArr = response.data.prod_detail.filter(
            (item) => item.prod_id == filteredData[0].product_id
          );
          // console.log("1", productDetailArr);
        }
        if (filteredData.length === 0) {
          setErrorMessage("Sorry, this product is not available");
        } else {
          setData(filteredData);
          setProdData(productDetailArr);
          setProductColor(productColor);
          setSelectedColor(filteredData[0].color);
        }
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Error fetching data");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const category = async (catName) => {
    try {
      if (catName) {
        const category = await axios.put("/api/Products", {
          category_id: catName,
        });
        const { category_name, category_id } = category.data;
        const cleanedName = category_name.replace(/"/g, "");
        setCategoryName(cleanedName);
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const fetchPrice = async (storedId) => {
    try {
      const response = await fetch("/api/ProductsCat", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seo_url: storedId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      throw error;
    }
  };

  const handleColorChange = async (event) => {
    setSelectedColor(event.target.value);
    console.log("selectedColor", event.target.value);
    console.log("id: ", id);
    const colorBasedProduct = { color: event.target.value, name: id };
    console.log(colorBasedProduct);
    try {
      const response = await axios.post(
        "/api/colorBasedProduct",
        colorBasedProduct
      );
      console.log(JSON.stringify(response));
      const data = response.data?.data;
      console.log("Data: " + JSON.stringify(data));
      setProdData(data);

      // console.log("OYESSresponse: " + JSON.stringify(rdata));
    } catch (err) {
      console.log("16|05|24 ", err.message);
    }
  };

  const handleMoveToCart = async (storedId, quantity) => {
    const data = await fetchPrice(storedId);
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
  // const image = data.length > 0 ? data[0].image_name : null;

  const generateImageUrls = (baseNames, color) => {
    const imageSuffixes = ["(front).webp", "(45D).webp", "(45).webp"];
    console.log("Base names: " + baseNames);
    console.log("Base color: " + color);

    const imageList = baseNames.split(",").map((image) => image.trim());
    // Clean up each image URL by removing leading/trailing spaces and extra parentheses
    const cleanedImages = imageList.map((image) =>
      image.replace(/^\s+|\s+$|\(|\)/g, "")
    );
    let updatedFilenames = cleanedImages.map((filename) => {
      return filename.replace(/(-in-size|-chairs)-?[\w()-]+/i, `$1-${color}`);
    });
    console.log("updatedFilenames: " + updatedFilenames);
    console.log("cleanedImages", cleanedImages);

    // Generate the new URLs
    return cleanedImages.map((base, index) => {
      // Split the base name to identify the point where the new color should be inserted
      const parts = base.split(/(size|chairs)/i);
      console.log("parts", parts);
      const cleanedBase = parts.join("");
      console.log("cleanedBase", cleanedBase);
      return `${cleanedBase}-${color}${imageSuffixes[index]}`;
    });
  };

  const baseImageNames = data.length > 0 ? data[0].image_name : [];
  console.log("baseImageNames ", baseImageNames);
  const image = baseImageNames;
  // && selectedColor
  // ? generateImageUrls(baseImageNames, selectedColor)
  // : null;
  const saving = (orignalPrice - price).toFixed(2);
  console.log("Image", image);
  return (
    <>
      {/* <Breadcrump productName = {name} /> */}
      <div className="container">
        {/* <div className="heading-section"><h2>Product Details</h2></div> */}
        <div className="row">
          <div className="col-12">
            <Breadcrump
              category_id={categoryId}
              category_name={categoryName}
              product_name={name}
            />
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
                    {Product_Color.map((val, index) => {
                      return (
                        <input
                          type="radio"
                          name="prod_clr"
                          id={val.color}
                          value={val.color}
                          checked={selectedColor === val.color}
                          onChange={handleColorChange}
                          key={index}
                          className="productDetailsRadio m-1"
                          style={{ "--radio-color": val.color_code }}
                        />
                      );
                    })}
                    {/* <label htmlFor="white">White</label> */}
                  </div>
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
