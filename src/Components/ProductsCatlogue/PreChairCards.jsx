"use client";
import React, { useEffect, useState } from "react";
import "./PreChairCards.css";
import axios from "axios";
import { DotLoader } from "react-spinners";
// import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/reducer/cartSlice";
import { addItemToWishlist } from "@/redux/reducer/wishlistSlice";
import PremiumChairs from "./PremiumChairs";
import PreChairsCard from "../../Components/preChairsCard/preChairsCard";

// import InfiniteScroll from "react-infinite-scroll-component";

const PreChairsCards = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedArmType, setSelectedArmType] = useState(null);
  const [selectedPriceSort, setSelectedPriceSort] = useState(null);
  const [categoryType, setCategoryType] = useState();
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);
  // const [length, setlength] = useState([]);

  const dispatch = useDispatch();
  // const chairData = [
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  //   {
  //     ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
  //     Title: "SHAMIYANA",
  //     Discription: "Lorem ipsum dolor sit amet.",
  //     Price: "00,000",
  //     orignalPrice: "00,000",
  //     Discount: "20%",
  //   },
  // ];

  useEffect(() => {
    fetchData();
  }, [selectedColor, selectedArmType, selectedPriceSort, categoryType]);

  const fetchData = async () => {
    try {
      const categoryTitle = localStorage.getItem("category");
      setCategoryType(categoryTitle);

      const response = await axios.get(
        `http://localhost:3000/api/ProductsCat?query=${categoryTitle}`
      );
      console.log("API Response:", response.data); // Log API response

      const fetchedData = response.data;
      console.log("Fetched data:", fetchedData);

      if (fetchedData?.products) {
        let filteredData = fetchedData.products;

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

        if (categoryType) {
          filteredData = filteredData.filter(
            (item) =>
              item.categoryType &&
              item.categoryType.toLowerCase() == categoryType.toLowerCase()
          );
        }

        setProducts(filteredData);

        // if (page === 1) {
        //   setlength(filteredData);
        // }

        // setHasMore(filteredData.length > 0);
      } else {
        setProducts(filteredData);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setIsLoading(false);
    }
  };

  const handleAddToWishlist = (product_id) => {
    dispatch(
      addItemToWishlist({
        product_id: product_id,
      })
    );
  };

  const handleMoveToCart = (product_id) => {
    dispatch(
      addToCart({
        product_id: product_id,
      })
    );
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
    <div className="container mt-5">
      <PremiumChairs cattitle={categoryType} />

      <div className="dropboxRes mt-5 d-flex justify-content-between">
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
                <option>with arm tent</option>
                <option>without arm tent</option>
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
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
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
            {products.map((product) => (
              <div
                key={product.product_id}
                className="PreCardSm col-6 col-sm-6 col-xs-4 col-md-6 col-lg-3"
              >
                <PreChairsCard
                  ChairImg={`/Assets/images/New-launches-1/${product.image_name}`}
                  id={product.seo_url}
                  Title={product.product_name}
                  Discription={product.short_description}
                  Price={product.price}
                  orignalPrice={product.discount_price}
                  Discount={Math.floor(
                    ((product.discount_price - product.price) /
                      product.discount_price) *
                      100
                  )}
                  onaddToWishlist={() =>
                    handleAddToWishlist(product.product_id)
                  }
                  onAddToCart={() => handleMoveToCart(product.product_id)}
                />
              </div>
            ))}
          </div>
          {/* </InfiniteScroll> */}
        </>
      )}
    </div>
  );
};

export default PreChairsCards;
//commented for prechairs cards
