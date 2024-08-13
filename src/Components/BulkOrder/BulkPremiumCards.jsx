import PreChairsCard from "@/Components/preChairsCard/preChairsCard.jsx";
import { Bounce, toast } from "react-toastify";

const BulkPremiumCards = ({ proddata }) => {
  const chairData = [
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg:
        "${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
  ];
  const Np = "National Plastic";

  const handleAddToWishlist = async (
    product_id,
  
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
      theme: "light",
      transition: Bounce,
    });
  };



  return (
    <>
      <div className="container mt-5">
        <div className="row ">
          {proddata.map((chair) => {
            const images = chair.image_name
              ? chair.image_name.split(", ").map((image) => image.trim())
              : [];
            return (
              <div
                key={chair.product_id}
                className="PreCardSm col-12 col-sm-6 col-xs-4 col-md-6 col-lg-3 newProdCard"
              >
                <PreChairsCard
                  id={chair.product_id}
                  ChairImg={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${images[0]}`}
                  Title={`${chair.product_name}`}
                  Color={`${chair.color}`}
                  Discription={chair.short_description}
                  Discount={chair.discount_percentage}
                  showGetQuote={true}
                  onaddToWishlist={() =>
                    handleAddToWishlist(
                      chair.product_id,
        
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default BulkPremiumCards;
