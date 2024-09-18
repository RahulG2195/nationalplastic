"use client";
import Link from "next/link";
import "../../styles/prod_detail.css";
import Image from "next/image";
import ProductDetailSlider from "../ProductDetailSlider/ProductDetailSlider";
import MoreProduct from "./MoreProducts/MoreProduct";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/reducer/cartSlice";
import { addToCartD } from "@/redux/reducer/tempSlice";
import { useParams } from "next/navigation";
import Breadcrump from "../Breadcrump/Breadcrump";
import GetQuoteCustomForm from "../BulkOrder/GetQuoteCustomForm";
import { notifyError } from "@/utils/notify";

function ProdData({ category_id }) {
  const [data, setData] = useState([]);
  const [prodData, setProdData] = useState([]);
  const [prodDataDetail, setProdDataDetail] = useState([]);
  const userState = useSelector((state) => state.userData.isLoggedIn);
  const [seo_url, setSeo_url] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [catlogue, setCatlogue] = useState(null);
  const [short_description, setShort_description] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productId, setProductId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [initialCount, setInitialCount] = useState(1);
  const [Product_Color, setProductColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [product_id, setProduct_id] = useState(null);
  const [availableColor, setAvailableColor] = useState([]);
  const [dataToShow, setdataToShow] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const cartData = useSelector((state) => state.cart.products);
  const tempCartData = useSelector((state) => state.temp.products);


  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const router = useParams();
  const id = router.productId;

  const ProductCount = () => {
    if (!userState) {

      console.log("Its here it should not be i think " + userState);
      const idToBeCompared = Number(localStorage.getItem('product_id'));
      const product = tempCartData.find(item => item.product_id === idToBeCompared);
      const quantity = product ? product.quantity : 1;
      setInitialCount(quantity)
      return;
    }
    const idToBeCompared = Number(localStorage.getItem('product_id'));
    const product = cartData.find(item => item.product_id === idToBeCompared);
    const quantity = product ? product.quantity : 1;
    setInitialCount(quantity)
  }



  const handleIncrement = async () => {
    setInitialCount(initialCount + 1);
  };

  const handleDecrement = async () => {
    console.log("its coming herre toh Y")
    if (initialCount > 0) {
      setInitialCount(initialCount - 1);
    }
  };
  const handleInputChange = (e) => {
    setInitialCount(initialCount)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log("id " + id);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/product-details?id=${id}`);
        const { product, productDetails, colors, category, short_description, meta_description, meta_title } = response.data;
        console.log("Response + Response + Response " + JSON.stringify(response));

        localStorage.setItem("product_id", product.product_id);
        if (!product) {
          setErrorMessage("Sorry, this product is not available");
        } else {
          setData([product]);
          setProdData(productDetails);
          setProdDataDetail(productDetails);

          setProductColor(colors);
          setSelectedColor(product.color);
          setProduct_id(product.product_id);
          setSeo_url(product.cat_seo_url);
          setCatlogue(product.category_name);
          setShort_description(product.descp);
          // CleanCateogoryName(category);
          ProductCount();
          const allColors = colors.map((color) => color.color);
          colorBasedProductsImages(allColors);
        }
      } catch (error) {
        setErrorMessage(error.message || "Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const colorBasedProductsImages = async (colors) => {
    setAvailableColor(colors);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/colorBasedProduct`,
        {
          name: id,
          colors: colors,
        }
      );
      const rawdataToShow = response.data.data;
      setdataToShow(rawdataToShow);
    } catch (error) {
      notifyError(error.message);
    }
  };

  const category = async (catName) => {
    try {
      if (catName) {
        const category = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Products`,
          {
            category_id: catName,
          }
        );
        const { category_name, category_id } = category.data;
        const cleanedName = category_name.replace(/"/g, "");
        setCategoryName(cleanedName);
      }
    } catch (err) {
      notifyError(err.message);
    }
  };

  const fetchPrice = async (storedId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ProductsCat`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ seo_url: id }),
        }
      );

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

  // image change of product on select of radio button
  const handleColorChange = async (event) => {
    setSelectedColor(event.target.value);
    const colorBasedProduct = { color: event.target.value, name: id };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/colorBasedProduct`,
        colorBasedProduct
      );

      const dataBasedOnColor = response.data?.data;
      const isImageAvailable = dataBasedOnColor[0].seo_url_clr;
      const newProductID = dataBasedOnColor[0].product_id;
      setProduct_id(newProductID);
      const NoOfImages = dataBasedOnColor[0].image_name;

      if (NoOfImages || NoOfImages.includes(", ")) {
        setProdData(dataBasedOnColor);
        setData(dataBasedOnColor);
      } else {
        notifyError("Image Not available");
      }
    } catch (err) {
      notifyError("Opps! somethings is wrong");
    }
  };
  const handleCountChange = (newCount) => {
    console.log("newcoutn" + newCount);
    setInitialCount(newCount);
  };

  const handleMoveToCart = async (storedId, quantity) => {
    const data = await fetchPrice(id);
    const price = data.price;
    const discount_price = data.discount_price;
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
    }
  };
  const handleBuyNow = async (storedId, quantity) => {
    const data = await fetchPrice(id);
    const price = data.price;
    const discount_price = data.discount_price;
    switch (userState) {
      case false:
        dispatch(
          addToCartD({
            product_id,
            price,
            discount_price,
            quantity: quantity || 1,
            color: selectedColor,
            from: 0,
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
            from: 0,
          })
        );
        break;
      default:
        console.warn(
          "Unexpected login state. Please handle appropriately.",
          isLoggedInResult
        );
    }
  };

  if (isLoading) {
    return <div className="hv-100">Loading...</div>;
  }

  if (errorMessage) {
    return <center>{errorMessage}</center>;
  }

  const name = data.length > 0 ? data[0].product_name : null;
  const name_cat = data.length > 0 ? data[0].product_name2 : null;
  const price = data.length > 0 ? data[0].price : null;
  const orignalPrice = data.length > 0 ? data[0].discount_price : null;
  const baseImageNames =
    data.length > 0 ? data[0].image_name : "default_chair_img.webp";

  const image = baseImageNames;

  const saving = (orignalPrice - price).toFixed(2);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Breadcrump
              category_id={seo_url}
              category_name={categoryName}
              product_name={name_cat}
              catlogue={catlogue}
            />
          </div>
          <div className="col-md-5  ">
            <ProductDetailSlider imageurl={image} />
          </div>

          <div className="col-md-6 mt-5 mt-md-0">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">
                  <h2 className="prod_nameh2">
                    National Plastic </h2>
                  <h2>{name_cat}{" "}
                    {/* {selectedColor ? `(${selectedColor})` : ""} */}
                  </h2>
                </div>

                {/* <div className="reviews-counter d-flex flex-wrap gap-2"> */}
                {/* <div className="mrp">
                    <h6>
                      <strong className="text-danger"> ₹{price}</strong>
                    </h6>
                    <del> ₹{orignalPrice}</del>
                  </div>
                </div> */}
                <div>
                  <i
                    className="fa fa-star-o rating-star pr-2"
                    style={{ color: "gold" }}
                  />
                  <span className="rating-number">4.8</span>
                </div>
                <div className="shortProdDesc">
                  {prodDataDetail.descp?.includes('<') ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: prodDataDetail.descp }}
                    />
                  ) : (
                    <p>{prodData.descp || prodDataDetail.descp}</p>
                  )}
                </div>
                <div className="prod_type mt-4">
                  <div className="prod_clr">
                    <p>
                      <strong>Color: </strong> {selectedColor}
                    </p>

                    {dataToShow.map((val, index) => {
                      const imageSrc = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${val.image_name}`;
                      return (
                        <label
                          key={index}
                          style={{
                            display: "inline-block",
                            margin: "4px",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="radio"
                            name="prod_clr"
                            id={val.color}
                            value={val.color}
                            checked={selectedColor === val.color}
                            onChange={handleColorChange}
                            style={{ display: "none" }}
                          />
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              position: "relative",
                              borderRadius: "50%",
                              border:
                                selectedColor === val.color
                                  ? "2px solid #000"
                                  : "2px solid transparent",
                              transition: "all 0.3s ease",
                              ...(selectedColor === val.color
                                ? {
                                  boxShadow: "0 0 0 2px #fff, 0 0 0 4px #000",
                                }
                                : {}),
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                              }}
                            >
                              <Image
                                src={imageSrc}
                                alt={val.color}
                                height={100}
                                width={100}
                                layout="responsive"
                                objectFit="cover"
                                style={{
                                  borderRadius: "50%",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                          </div>
                        </label>
                      );
                    })}
                    {/* <label htmlFor="white">White</label> */}
                  </div>
                </div>
              </div>
              <div className="product-ccount">
                <label htmlFor="size">Quantity</label>
                <div className="pb-md-3 row align-items-center">
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <button onClick={() => {
                          if (initialCount > 1) {
                            handleDecrement(); // Call the onDecrement handler
                          }
                        }}>-</button>
                      </span>

                      <input
                        type="text"
                        value={initialCount}
                        className="form-control p-0 text-center"
                        aria-label="Amount (to the nearest dollar)"
                        onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = Number(value);
                          if (!isNaN(numericValue)) {
                            setInitialCount(numericValue);
                          }
                        }}
                      />

                      <span className="input-group-text">
                        <button onClick={() => {
                          handleIncrement(); // Call the onIncrement handler
                        }}>+</button>
                      </span>
                    </div>
                  </div>
                  <div className="col-6 col-md-8 col-lg-6">
                    <button
                      onClick={() => handleMoveToCart(productId, initialCount)}
                      className="m-2 px-md-5 btn "
                      style={{
                        backgroundColor: isHovered ? "#fff" : "#cc0008",
                        color: isHovered ? "#cc0008" : "#fff",
                        border: "1px solid #cc0008",
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <Link
                  href={userState ? "/Address" : "#"}
                  className={`btn m-2 px-md-5 ProdbtnRes ${!userState ? "disabled-button" : ""
                    }`}
                  onClick={() => handleBuyNow(productId)}
                >
                  Buy Now
                </Link>
                <Link href="" className="">
                  <button
                    className="btn btn-danger px-md-5 my-2 ProdbtnRes bulkRes"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Bulk Order
                  </button>
                </Link>
              </div>
              {/* <p className="eye">
                <i className="fa fa-eye"></i> 210 customers are interviewing the
                product
              </p> */}

              {/* terms and conditions */}

              {/* <div className="terms fw-medium term_and_condition">
                <Link href="/TermsAndConditions">Terms and Conditions</Link>
                <ul>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* product info  */}
      {/* <MoreProduct prod_detail={prodData} /> */}
      <div className="prod_detail_sec my-md-5 my-3">
        <div className="container">
          <div className="row">
            <div className="pd_heading">
              <h4>Description</h4>
              <hr />
            </div>
            {
              prodDataDetail.descp?.includes('<') ? (
                <div
                  className="col-md-9"
                  dangerouslySetInnerHTML={{ __html: prodDataDetail.descp }}
                />
              ) : (
                <div className="col-md-9">{prodDataDetail.descp}</div>
              )
            }
            <div className="col-md-3">
              {prodDataDetail.dimension_img ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${prodDataDetail.dimension_img}`}
                  width={100}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                  alt="Dimension image"
                />
              ) : ''}
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          ref={modalRef}
        >
          <div className="modal-dialog">
            <div className="modal-content modal-content-mypopup">
              {/* <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div> */}
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <GetQuoteCustomForm prodName={name} read={"true"} modalRef={modalRef} />
              </div>
              {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProdData;

