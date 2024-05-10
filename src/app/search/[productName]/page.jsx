"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "@/redux/reducer/wishlistSlice";
import { addToCart } from "@/redux/reducer/cartSlice";
import { addToCartD } from "@/redux/reducer/tempSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { isLoggedIn } from "@/utils/validation";
import { Bounce, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

const notifyError = () => {
  toast.error("Login To Add To WishList", {
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

const Search = (props) => {
  //   const router = useRouter();
  //   const router = useParams();
  const router = useParams();
  const id = router.productName;
  //   const { query } = router.query; // This will give you the value after '/'

  console.log(router);
  console.log(id);

  //   const id = routers.productName;
  const { searchParams } = props;
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allproducts, setAllproducts] = useState([]);
  const dispatch = useDispatch();
  const [query, setQuery] = useState({});
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [query, page]);

  const fetchData = async () => {
    try {
      //   const value = params.get("query");
      setQuery(id);
      setPage(1);
      setProducts([]);
      setDiscounts([]);
      setLoading(true);
      setError(null);

      if (query.trim() === "") {
        setLoading(false);
        return;
      }

      const isBrowser = typeof window !== "undefined";
      if (isBrowser) {
        const response = await axios.post("/api/search", {
          productName: query,
        });
        const newProducts = response.data.products;
        const all = response.data.allproducts;

        setAllproducts(all);
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setHasMore(newProducts.length > 0);
        const calculatedDiscounts = newProducts.map((product) => {
          const discountPercentage =
            product.discount_price && product.price
              ? Math.floor(
                  ((product.discount_price - product.price) /
                    product.discount_price) *
                    100
                )
              : 0;
          return discountPercentage;
        });
        setDiscounts((prevDiscounts) => [
          ...prevDiscounts,
          ...calculatedDiscounts,
        ]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error searching products:", error);
    }
  };

  const fetchPrice = async (id) => {
    try {
      const response = await fetch("/api/ProductsCat", {
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
      setError(error);
      console.error("Error fetching product data:", error);
      throw error;
    }
  };

  const handleAddToCart = async (id) => {
    const isLoggedInResult = await isLoggedIn();
    const data = await fetchPrice(id);
    const price = data.price;
    const discount_price = data.discount_price;

    switch (isLoggedInResult) {
      case false:
        dispatch(
          addToCartD({
            product_id: id,
            price,
            discount_price,
            quantity: quantity || 1,
          })
        );
        break;
      case true:
        dispatch(
          addToCart({
            product_id: id,
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
      // Consider additional actions for unexpected login states
    }
  };

  const handleAddWishlist = async (id) => {
    const isLoggedInResult = await isLoggedIn();

    if (!isLoggedInResult) {
      notifyError();
      //   router.push("/Login");
    } else {
      dispatch(
        addItemToWishlist({
          product_id: id,
        })
      );
    }
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <p className="darkBlue fw-bold my-4 mx-2">
              {allproducts.length} products found
            </p>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {products.map((product, index) => (
                <div key={product.id} className="col">
                  <div className="preCont cards p-1 position-relative">
                    <Link href={`/ProductDetail/${product.product_id}`}>
                      <div className="card-header">
                        <img
                          src={`/Assets/images/products/${product.image_name}`}
                          className="card-img-top"
                          alt="..."
                        />
                      </div>
                    </Link>
                    <div className="card-body">
                      <div className="PreFoot mt-2 ">
                        <div className="class d-flex justify-content-between my-2 ">
                          <Link href={`/ProductDetail/${product.product_id}`}>
                            <div className="left fw-bold text-danger">
                              {product.product_name}
                            </div>
                          </Link>
                          <div className="right">
                            <i
                              onClick={() =>
                                handleAddToCart(product.product_id)
                              }
                            >
                              {" "}
                              <ShoppingCartOutlinedIcon />{" "}
                            </i>
                            <i
                              onClick={() =>
                                handleAddWishlist(product.product_id)
                              }
                              className={` ${
                                product.inWishlist
                                  ? "fa fa-heart"
                                  : "fa fa-heart-o ms-3"
                              }`}
                              style={
                                product.inWishlist
                                  ? { fontSize: "20px", color: "#DC3545" }
                                  : {}
                              }
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                        <div className="text-left fw-medium my-2 DESCresp">
                          {product.short_description}
                        </div>
                        <div className="rs d-flex justify-content-between align-items-center ">
                          <div className="d-flex gap-2 align-items-center">
                            <div>
                              {" "}
                              <i
                                className="medium fa fa-inr fw-bold priceResp"
                                aria-hidden="true"
                              ></i>{" "}
                            </div>
                            <div className="medium fw-bold priceResp">
                              {product.price}
                            </div>
                            <div className="small text-secondary text text-decoration-line-through">
                              {product.discount_price}
                            </div>
                          </div>
                          <div className="d-flex fw-semibold text-danger ">
                            <div>{discounts[index]}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <InfiniteScroll
              dataLength={products.length}
              next={() => setPage(page + 1)}
              hasMore={hasMore}
              endMessage={<p>No more products to load</p>}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Search;
