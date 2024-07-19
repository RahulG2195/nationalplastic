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
import PreChairsCard from "@/Components/preChairsCard/preChairsCard.jsx";

const notify = () => {
  toast.error("Login To Add to CART", {
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
  const router = useParams();
  const id = router.productName;
  const { searchParams } = props;
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allproducts, setAllproducts] = useState([]);
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [query, setQuery] = useState({});
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getFirstImageName = (imageName) => {
    const images = imageName
      ? imageName.split(",").map((image) => image.trim())
      : [];
    return images[0];
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const storeSearchedProduct = (productName) => {
    if (typeof window !== 'undefined') {
      // Get the existing searched products from localStorage
      const existingSearches = JSON.parse(localStorage.getItem('searchedProducts') || '[]');
      
      // Add the new search to the beginning of the array
      const updatedSearches = [productName, ...existingSearches.filter(item => item !== productName)];
      
      // Limit the array to a maximum of 10 items (or any other number you prefer)
      const limitedSearches = updatedSearches.slice(0, 10);
      
      // Store the updated list back in localStorage
      localStorage.setItem('searchedProducts', JSON.stringify(limitedSearches));
    }
  };

  

  const fetchData = async () => {
    try {
      //   const value = params.get("query");
      setQuery(id);
      setPage(1);
      setProducts([]);
      setDiscounts([]);
      setLoading(true);
      setError(null);
      storeSearchedProduct(id);

      if (query.trim() === "") {
        setLoading(false);
        return;
      }

      const isBrowser = typeof window !== "undefined";
      if (isBrowser) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Search`, {
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
      setError(error);
      console.error("Error fetching product data:", error);
      throw error;
    }
  };

  const handleMoveToCart = async (product_id) => {
    const isLoggedInResult = await isLoggedIn();
    const data = await fetchPrice(product_id);
    const price = data.price;
    const discount_price = data.discount_price;
    // const product_id = data.product_id;
    switch (isLoggedInResult) {
      case false:
        dispatch(
          addToCartD({
            product_id,
            price,
            discount_price,
            quantity: typeof quantity !== "undefined" ? quantity : 1,
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
      // Consider additional actions for unexpected login states
    }
  };

  const fetchWishlistItems = async () => {
    try {
      const userDataString = localStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const customerId = userData.customer_id;
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/wishListUser`, {
        customer_id: customerId,
      });
      setWishlistItems(response.data.Wishlist);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  const handleAddToWishlist = async (
    product_id,
    product_name,
    short_description,
    price,
    discount_price,
    discount,
    ChairImg
  ) => {
    try {
      const isLoggedInResult = await isLoggedIn();
      if (!isLoggedInResult) {
        notifyError();
        router.push("/Login");
      } else {
        dispatch(
          addItemToWishlist({
            product_id: product_id,
          })
        );
        notify();
        fetchWishlistItems();
      }
    } catch (error) {
      notifyinfo();
      console.error("Error:", error);
    }
  };

  

  const notifyinfo = () => {
    toast.success("Already in WISHLIST", {
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

  return (
    <>
      <div className="container newProdCard">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <p className="darkBlue fw-bold my-4 mx-2">
              {allproducts.length} products found
            </p>

            <div className="row">
              {products.map((product, index) => {
                const images = product.image_name ? product.image_name.split(', ').map(image => image.trim()) : [];
                return <div
                  key={index}
                  className="col-12 col-sm-6 col-xs-4 col-md-6 col-lg-3 newProdCard">
                  <PreChairsCard
                    ChairImg={`/Assets/images/products/${images[0]}`}
                    id={product.seo_url}
                    Title={product.product_name}
                    // Discription={product.short_description}
                    Price={product.price}
                    orignalPrice={product.discount_price}
                    discount_percentage={product.discount_percentage}
                    onaddToWishlist={() =>
                      handleAddToWishlist(
                        product.product_id,
                        product.product_name,
                        product.short_description,
                        product.price,
                        product.discount_price,
                        product.discount_percentage,
                        product.image_name
                      )
                    }
                    onAddToCart={() => handleMoveToCart(product.product_id)}
                    recentClass="reventHoverView"
                  />
                </div>
              })}
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
