"use client";
import React, { useEffect, useState } from "react";
import "./PreChairCards.css";
import axios from "axios";
import { DotLoader } from "react-spinners";
// import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/reducer/cartSlice";
import { addToCartD } from "@/redux/reducer/tempSlice";

import { addItemToWishlist } from "@/redux/reducer/wishlistSlice";
import PremiumChairs from "../ProductsCatlogue/PremiumChairs";
import PreChairsCard from "../preChairsCard/preChairsCard";
import { useParams } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { isLoggedIn } from "@/utils/validation";
import { useRouter } from "next/navigation";

const notify = () => {
  toast.error("Login To Add to WISHLIST", {
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

// import InfiniteScroll from "react-infinite-scroll-component";

const PreChairsCards = () => {
  const [cat_id, setCat_id] = useState(null)
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedArmType, setSelectedArmType] = useState(null);
  const [selectedPriceSort, setSelectedPriceSort] = useState(null);
  const [categoryType, setCategoryType] = useState();

  const [FetchClr, setFetchClr] = useState([]);
  const [FetchType, setFetchType] = useState([]);
  const Np = "National Plastic"
  const BaseUrl = "https://nationalplastic.com";
  
  const router = useParams();
  const seo_url = router.productCatId;
  const route = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [selectedColor, selectedArmType, selectedPriceSort, categoryType,]);

  const fetchData = async () => {
    try {

      const catResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categoryFromSeo?query=${seo_url}`);
      const data = catResponse.data.shopbyroom[0];
      setCategoryType(data.tag_name)
      setCat_id(data.tag_id);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ProductsCat?query=${data.tag_id}`);

      const fetchedData = response.data;
      setFetchClr(fetchedData.color);
      setFetchType(fetchedData.armType);
      
      if (fetchedData?.ShopByroomData) {
        let filteredData = fetchedData.ShopByroomData;
        if (selectedColor) {
          filteredData = filteredData.filter(
            (item) =>
              item.color &&
              item.color.toLowerCase() === selectedColor.toLowerCase()
          );
        }

        if (selectedArmType) {
          filteredData = filteredData.filter(
            (item) =>
              item.armType &&
              item.armType.toLowerCase() === selectedArmType.toLowerCase()
          );
        }

        if (selectedPriceSort) {
          filteredData.sort((a, b) => {
            if (selectedPriceSort === "asc") {
              return a.price - b.price;
            } else if (selectedPriceSort === "desc") {
              return b.price - a.price;
            }
            return 0;
          });
        }


        setProducts(filteredData);


      } else {

        setProducts(filteredData);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setIsLoading(false);
    }
  };

  
  const handleAddToWishlist = async (product_id) => {
    const isLoggedInResult = await isLoggedIn();
    switch (isLoggedInResult) {
      case false:
        notify();
        route.push("/Login");
        break;
      case true:
        dispatch(
          addItemToWishlist({
            product_id: product_id,
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


  const handleMoveToCart = async (product_id) => {
    const isLoggedInResult = await isLoggedIn();
    const data = await fetchPrice(product_id);
    const price = data.price;
    const discount_price = data.discount_price;
    switch (isLoggedInResult) {
      case false:
        dispatch(
          addToCartD({
            product_id,
            price,
            discount_price,
            quantity: 1,
          })
        );
        break;
      case true:
        dispatch(
          addToCart({
            product_id: product_id,
            price: price,
            discount_price: discount_price,
            quantity: 1,
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
  const fetchPrice = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/ProductsCat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: id }),
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

  const handleArmType = (event) => {
    const selectedArmType = event.target.value;
    setSelectedArmType(selectedArmType === "all" ? null : selectedArmType);
  };

  const handleColor = (event) => {
    const selectedColor = event.target.value;
    setSelectedColor(selectedColor === "all" ? null : selectedColor);
  };

  const handlePriceSort = (event) => {
    const selectedPriceSort = event.target.value;
    setSelectedPriceSort(
      selectedPriceSort === "all" ? null : selectedPriceSort
    );
  };

  return (
    <>

      <div className="container mt-5">
        <PremiumChairs cattitle={categoryType} />

        <div className="dropboxRes my-md-5 my-3 d-flex justify-content-between">
          <div>
            <div className="text-body-secondary fw-semibold">FILTER BY</div>
            <div className="d-flex flex-wrap gap-3 mt-2">
              <div className="dropdown mt-2 arrow">
                <select
                  id="Price"
                  name="Price"
                  className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp"
                  onChange={handlePriceSort}
                >
                  <option value="all">Price</option>
                  <option value="asc">Low to high</option>
                  <option value="desc">High to low</option>
                </select>
              </div>
              <div className="dropdown mt-2 arrow">
                <select
                  id="Arm_Type"
                  name="Arm_Type"
                  className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp"
                  onChange={handleArmType}
                >
                  <option value="all">Arm type</option>
                  {FetchType.map((val) => (
                    <option key={val.category_id} value={val.armType}>
                      {val.armType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="dropdown mt-2 arrow">
                <select
                  id="Color"
                  name="Color"
                  className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp"
                  onChange={handleColor}
                >
                  <option value="all">Color</option>
                  {FetchClr.map((val) => (
                    <option key={val.category_id} value={val.color}>
                      {val.color}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <center className="spinner">
            <DotLoader color={"#36D7B7"} loading={isLoading} />
          </center>
        ) : products.length === 0 ? (
          <div className="text-center mt-5">
            <h3 className="text-muted">No products available</h3>
          </div>
        ) : (
          <>
            {/* <InfiniteScroll
            dataLength={products.length}
            next={() => setPage(page + 1)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more products to load</p>}
          > */}
            <div className="row">
              {products.map((product, index) => {
                const images = product.image_name ? product.image_name.split(', ').map(image => image.trim()) : [];
                return <div
                  key={index}
                  className="PreCardSm col-12 col-sm-6 col-xs-4 col-md-6 col-lg-3 newProdCard"
                >
                  <PreChairsCard
                    ChairImg={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${images[0]}`}
                    id={product.seo_url}
                    Title={`${product.product_name}`}
                    Color= {`${product.color}`}
                    Discription={product.short_description}
                    Price={product.price}
                    orignalPrice={product.discount_price}
                    // Discount={Math.floor(
                    //   ((product.discount_price - product.price) /
                    //     product.discount_price) *
                    //   100
                    // )}
                    Discount={product.discount_percentage}
                    onaddToWishlist={() =>
                      handleAddToWishlist(product.product_id)
                    }
                    onAddToCart={() => handleMoveToCart(product.product_id)}
                  />
                </div>
              })}
            </div>
            {/* </InfiniteScroll> */}
          </>
        )}
      </div>
    </>
  );
};

export default PreChairsCards;
//commented for prechairs cards
