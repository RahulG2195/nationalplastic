import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../redux/reducer/wishlistSlice";
import Link from "next/link";
import numberWithCommas from '@/utils/formatnumber';
import {
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
} from "../../redux/reducer/cartSlice";
import {
  increaseQuantityD,
  decreaseQuantityD,
  removeItemFromCartD,
} from "../../redux/reducer/tempSlice";
import { isLoggedIn } from "../../utils/validation";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { notifyError } from "../../utils/notify";

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
  const dispatch = useDispatch();
  const Np = "National Plastic";

  const handleIncrement = async () => {
    const isLoggedInResult = await isLoggedIn();
    if (!isLoggedInResult) {
      await dispatch(increaseQuantityD({ product_id: productId }));
      setInitialCount(initialCount + 1);
    } else {
      await dispatch(increaseQuantity({ product_id: productId }));
      setInitialCount(initialCount + 1);
    }
  };

  const handleDecrement = async () => {
    const isLoggedInResult = await isLoggedIn();
    if (initialCount > 1) { // Adjusted to prevent negative quantity
      if (!isLoggedInResult) {
        await dispatch(decreaseQuantityD({ product_id: productId }));
        setInitialCount(initialCount - 1);
      } else {
        await dispatch(decreaseQuantity({ product_id: productId }));
        setInitialCount(initialCount - 1);
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (!isNaN(numericValue) && numericValue > 0) {
      setInitialCount(numericValue);
    }
    logit();

  };

  const logit = () => {
    console.log("numeric" + typeof(initialCount));
    console.log("numeric " + initialCount);
  }

  const handleAddtoWishlist = async (product_id) => {
    const isLoggedInResult = await isLoggedIn();
    if (!isLoggedInResult) {
      notifyError("Login to Add to cart");
      router.push("/Login");
    } else {
      dispatch(addItemToWishlist({ product_id: product_id }));
    }
  };

  const handleRemove = async (product_id) => {
    const isLoggedInResult = await isLoggedIn();
    onRemoveSuccess(productId);
    if (!isLoggedInResult) {
      dispatch(removeItemFromCartD({ product_id: product_id }));
    } else {
      dispatch(removeItemFromCart({ product_id: product_id }));
    }
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
            className="img-fluid d-block w-100"
            alt="Product Image"
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
            <h6 style={{ marginRight: "7px" }}>
              <span className="text-danger">{Np}</span> {productName}
            </h6>
          </div>
          <h6 className="py-2">Color: {color}</h6>
        </Link>

        <div className="CartQuantity d-flex flex-wrap">
          <p>Quantity</p>

          {/* Inline Increment/Decrement */}
          <div className="input-group">
            <span className="input-group-text">
              <button
                onClick={handleDecrement}
                disabled={initialCount <= 1} // Prevent going below 1
              >
                -
              </button>
            </span>
            <input
              type="text"
              value={initialCount}
              className="form-control p-0 text-center"
              aria-label="Quantity"
              onChange={handleInputChange}
            />
            <span className="input-group-text">
              <button onClick={handleIncrement}>+</button>
            </span>
          </div>

          {/* Price Section */}
          {/* <div className="productPrice">
            <p className="fw-bold">₹ {numberWithCommas(productPrice)}</p>
            <p>
              <del className="fw-semibold">₹ {numberWithCommas(discountedPrice)}</del>
              <span>{discPer}% Off</span>
            </p>
          </div> */}
        </div>

        <div className="InstallationCharges align-items-center my-5">
          <div onClick={() => handleAddtoWishlist(productId)} className="CouponApplied mx-3">
            <img
              src="/Assets/images/AddTOCart/core-heart.png"
              className="img-fluid d-block"
              alt="Wishlist"
            />
            <p>Save For Later</p>
          </div>
          <div onClick={() => handleRemove(productId)} className="CouponApplied">
            <Image
              src="/Assets/images/AddTOCart/Icon-core-trash.png"
              className="img-fluid d-block w-100"
              alt="Remove"
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
