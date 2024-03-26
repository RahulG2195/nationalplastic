"use client";
import Link from "next/link";
import "../../styles/prod_detail.css";
import Image from "next/image";
import NoCostEmi from "../NoCostEmi/NoCostEmi";
import ProductDetailSlider from "../ProductDetailSlider/ProductDetailSlider";
import MoreProduct from "./MoreProducts/MoreProduct";
// import RecentlyViewedDetails from "./RecentlyViewedDetails/RecentlyViewedDetails";
// import CustomerReview from "./CustomerReview/CustomerReview";
// import Faqs from "../FAQs/Faqs";
// import FooterRow from "../FooterRow/FooterRow";
// import TabContent from "./TabContent/TabContent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/reducer/cartSlice";
// import { Message } from "@mui/icons-material";
// import Breadcrump from "@/app/Breadcromp/page";
// import RecentlyViewed from "../ProductsCatlogue/RecentlyViewed";
import { useParams } from "next/navigation";

function ProdData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productId, setProductId] = useState(null);
  // const [productName, setProductName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();
  const router = useParams();
  const id = router.productId;
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedId = id;
        const productName = id;
        setProductId(storedId);

        const response = await axios.get(
          "http://localhost:3000/api/Products"
        );
        let filteredData = [];
        // if (productName) {
        //   filteredData = response.data.products.filter(
        //     (item) =>
        //       item.product_name.toLowerCase() === productName.toLowerCase()
        //   );
        //   localStorage.clear();
        // }
        if (storedId || productName) {
          filteredData = response.data.products.filter(
            (item) =>
              item.product_id == storedId ||
              item.seo_url.toLowerCase() === productName.toLowerCase()
          );
        }
        if (filteredData.length === 0) {
          setErrorMessage("Sorry, this product is not available");
        } else {
          setData(filteredData);
        }
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Error fetching data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoveToCart = (storedId) => {
    dispatch(addToCart({ product_id: storedId }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
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

      <div className="px-4">
        {/* <div className="heading-section"><h2>Product Details</h2></div> */}
        <div className="row">
          <div className="col-md-6">
            <ProductDetailSlider imageurl={image} />
          </div>

          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name text-center">
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
                      <strong>Color: </strong> Gold
                    </p>
                    <input
                      type="radio"
                      name="prod_clr"
                      id="gold"
                      value="gold"
                      className="productDetailsRadio m-1"
                    />
                    <input
                      type="radio"
                      name="prod_clr"
                      id="gold"
                      value="white"
                      className="productDetailsRadio m-1"
                    />
                  </div>
                  <div className="prod_size">
                    <div>
                      <strong>Size: </strong> 0000
                    </div>
                    <input
                      type="text"
                      name="prod_size"
                      id="size"
                      placeholder="000"
                    />
                  </div>
                </div>
              </div>
              <div className="bulk_order_div">
                <Link href="/BulkOrder" className="">
                  <button className="btn btn-danger px-5 my-2 ProdbtnRes bulkRes">
                    Bulk Order
                  </button>
                </Link>
              </div>
              {/* <div className="row">
              <div className="col-md-6">
                <label htmlFor="size">Size</label>
                <select id="size" name="size" className="form-control">
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="color">Color</label>
                <select id="color" name="color" className="form-control">
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Red</option>
                </select>
              </div>
            </div> */}

              <div className="product-count">
                <label htmlFor="size">Quantity</label>
                <form action="#" className="display-flex">
                  <button onClick={decrement} className="qtyminus">
                    -
                  </button>
                  <input
                    type="text"
                    name="quantity"
                    defaultValue={count}
                    className="qty"
                  />
                  <button onClick={increment} className="qtyplus">
                    +
                  </button>
                </form>
                <p
                  onClick={() => handleMoveToCart(productId)}
                  className="btn bg-danger text-white m-2 px-5 ProdbtnRes"
                >
                  Add to Cart
                </p>
                <Link
                  href="/Address"
                  className="btn bg-danger text-white m-2 px-5 ProdbtnRes"
                >
                  Buy Now
                </Link>
              </div>
              <p className="eye">
                <i className="fa fa-eye"></i> 210 customers are interviewing the
                product
              </p>
              <div className="terms fw-medium small">
                <Link href="TearnsAndConditions">Terms and Conditions</Link>
                <ul>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                </ul>
              </div>
              <div className="d-flex flex-wrap justify-content-center position-relative align-items-center m-4 ChkAvblityRes">
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
                      className="btn rounded-0 bg-danger text-white p-2"
                    >
                      CheckNow
                    </a>
                  </div>
                </div>
              </div>

              <div className="freuently_bought mb-2">
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

                  <div className="com_price text-top m-3">
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
              </div>
            </div>
          </div>
        </div>

        <MoreProduct />
      </div>
    </>
  );
}

export default ProdData;
