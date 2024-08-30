import Image from "next/image";
import IncrementDecrement from "./IncrementDecrement";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToWishlist } from "../../redux/reducer/wishlistSlice";
import Link from "next/link";
import numberWithCommas from '@/utils/formatnumber';
// import axios from "axios";
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
  const Np = "National Plastic"

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

    if (initialCount > 0) {
      if (!isLoggedInResult) {
        dispatch(decreaseQuantityD({ product_id: productId }));
        setInitialCount(initialCount - 1);
      } else {
        dispatch(decreaseQuantity({ product_id: productId }));
        setInitialCount(initialCount - 1);
      }
    }
  };

  const handleAddtoWishlist = async (product_id) => {
    const isLoggedInResult = await isLoggedIn();
    if (!isLoggedInResult) {
      notifyError("Login to Add to cart");
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
    const isLoggedInResult = await isLoggedIn();
    if (!isLoggedInResult) {
      onRemoveSuccess(productId);
      dispatch(removeItemFromCartD({ product_id: product_id }));
    } else {
      onRemoveSuccess(productId);
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
            className="img-fluid d-block w-100" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
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
            <h6 style={{ marginRight: "7px" }}><span className="text-danger" >{Np}</span> {productName}</h6>
          </div>
          <h6 className="py-2">color: {color}</h6>
        </Link>
        {/* <p>{productDesc}</p> */}

        <div className="CartQuantity d-flex flex-wrap">
          <p>Quantity</p>
          {/* Increment Decrement start */}

          <IncrementDecrement
            initialCount={initialCount}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />

          {/* Increment Decrement end */}
          {/* <div className="productPrice">
            <p className="fw-bold">₹ {numberWithCommas(productPrice)}</p>
            <p>
              <del className="fw-semibold">₹ {numberWithCommas(discountedPrice)}</del>
              <span>{discPer}% Off</span>
            </p>
          </div> */}
        </div>
        {/* <div className="InstallationCharges align-items-center">
          <p className="text-secondary me-2">
            {" "}
            Installation Charges : ₹ {installationCharges}
          </p>
          <div className="CouponApplied">
            <Image
              src="/Assets/images/AddTOCart/percentage.png"
              className="img-fluid d-block "
              alt="ome banner 1"
              width={100}
              height={80}
            />
            <p className="text-danger">Coupon Applied</p>
          </div>
        </div> */}

        <div className="InstallationCharges align-items-center my-5">
          <div
            onClick={() => handleAddtoWishlist(productId)}
            className="CouponApplied mx-3"
          >
            <img
              src="/Assets/images/AddTOCart/core-heart.png"
              className="img-fluid d-block"
              alt="ome banner 1"
            />
            <p>Save For Later</p>
          </div>
          <div
            onClick={() => handleRemove(productId)}
            className="CouponApplied "
          >
            <Image
              src="/Assets/images/AddTOCart/Icon-core-trash.png"
              className="img-fluid d-block w-100"
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
