import Image from "next/image";
import IncrementDecrement from "./IncrementDecrement";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToWishlist } from "@/redux/reducer/wishlistSlice";
import Link from "next/link";
// import axios from "axios";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
} from "@/redux/reducer/cartSlice";
import { isLoggedIn } from "@/utils/validation";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

const CartProduct = ({
  src,
  productName,
  productDesc,
  discountedPrice,
  productPrice,
  discPer,
  installationCharges,
  productId,
  onRemoveSuccess,
  quantity,
  seourl,
  color,

}) => {
  const router = useRouter();

  const [initialCount, setInitialCount] = useState(quantity);
  // Set initial count to 1 by default
  // const dispatch = useDispatch();

  const handleIncrement = async () => {
    await dispatch(increaseQuantity({ product_id: productId }));
    setInitialCount(initialCount + 1);
  };
  const handleDecrement = async () => {
    if (initialCount > 0) {
      await dispatch(decreaseQuantity({ product_id: productId }));
      setInitialCount(initialCount - 1); // Decrement by 1
    }
  };
  const dispatch = useDispatch();

  const handleAddtoWishlist = async (product_id) => {
    //console.log("want to cart tp wish", product_id);
    const isLoggedInResult = await isLoggedIn();
    //console.log("state", isLoggedInResult);
    //console.log("state", typeof isLoggedInResult);
    if (!isLoggedInResult) {
      notifyError();
      router.push("/Login");
    } else {
      dispatch(
        addItemToWishlist({
          product_id: product_id,
        })
      );
    }
  };

  const handleRemove = async (product_id) => {
    onRemoveSuccess(productId);
    await dispatch(removeItemFromCart({ product_id: product_id }));
    //console.log(product_id);
  };

  const setid = () => {
    localStorage.setItem("myId", productId);
  };

  return (
    <>
      <div className="col-md-4">
        <Link onClick={setid} href={`/ProductDetail/${seourl}`}>
          <Image
            src={src}
            classname="img-fluid d-block w-100" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
            alt="Team Member"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </Link>
      </div>

      <div className="col-md-8 card-Quantity-section">
<Link onClick={setid} href={`/ProductDetail/${seourl}`}>
          <div style={{ display: "flex" }}>
            <h6 style={{ marginRight: "7px" }}>{productName}</h6>
          </div>
          <h11>color:{color}</h11>
        </Link>
        <p>{productDesc}</p>

        <div className="CartQuantity d-flex flex-wrap">
          <p>Quantity</p>
          {/* Increment Decrement start */}

          <IncrementDecrement
            initialCount={initialCount}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />

          {/* Increment Decrement end */}
          <div className="productPrice">
            <p className="fw-bold">RS {productPrice}</p>
            <p>
              <del className="fw-semibold"> {discountedPrice}</del>
              <span>{discPer}% Off</span>
            </p>
          </div>
        </div>
        <div className="InstallationCharges align-items-center">
          <p className="text-secondary me-2">
            {" "}
            Installation Charges : Rs {installationCharges}
          </p>
          <div className="CouponApplied">
            <Image
              src="/Assets/images/AddTOCart/percentage.png"
              classname="img-fluid d-block "
              alt="ome banner 1"
              width={100}
              height={80}
            />
            <p className="text-danger">Coupon Applied</p>
          </div>
        </div>

        <div className="InstallationCharges align-items-center my-5">
          <div
            onClick={() => handleAddtoWishlist(productId)}
            className="CouponApplied mx-3"
          >
            <Image
              src="/Assets/images/AddTOCart/core-heart.png"
              classname="img-fluid d-block w-100"
              alt="ome banner 1"
              width={100}
              height={80}
            />
            <p>Save For Later</p>
          </div>
          <div
            onClick={() => handleRemove(productId)}
            className="CouponApplied "
          >
            <Image
              src="/Assets/images/AddTOCart/Icon-core-trash.png"
              classname="img-fluid d-block w-100"
              alt="ome banner 1"
              width={100}
              height={80}
            />
            <p>Remove</p>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
export default CartProduct;
