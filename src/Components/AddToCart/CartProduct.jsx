import Image from "next/image";
import IncrementDecrement from "./IncrementDecrement";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart, initialCount } from "@/redux/reducer/cartSlice";
import { addItemToWishlist } from "@/redux/reducer/wishlistSlice";
import Link from "next/link";
// import axios from "axios";
import { increaseQuantity } from "@/redux/reducer/cartSlice";

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
}) => {
  const [initialCount, setInitialCount] = useState(1);
  // Set initial count to 1 by default
  // const dispatch = useDispatch();

  const handleIncrement = () => {
    setInitialCount(initialCount + 1);
    dispatch(increaseQuantity({ product_id: productId }));
  };

  // const [cartItems, setCartItems] = useState([]);

  // const cartInitialCount = useSelector(state => state.cart.initialCount);

  // useEffect(() => {
  //   // Update the initialCount state with the value from the Redux store
  //   setInitialCount(cartInitialCount);
  // }, [cartInitialCount]); // Run this effect whenever cartInitialCount changes

  // useEffect(() => {
  //   // const isProductInCart = cartItems.some(item => item.productId === productId);
  //   // console.log("this is item ", item.productId)

  //   // if (isProductInCart) {
  //   //   setInitialCount(initialCount + 1);
  //   // }
  // }, [cartItems, productId]);

  // const handleAddToCart = async () => {
  //   try {
  //     dispatch(addToCart({ product_id: productId }, initialCount));
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //   }
  // };
  // useEffect(() => {
  //   // Update the count from the Redux store
  //   setInitialCount(initialCount);
  //   // console.log("in cart is ",initialCount+1);
  // }, [initialCount]);

  const dispatch = useDispatch();

  const handleAddtoWishlist = (product_id) => {
    console.log("want to cart tp wish", product_id);

    dispatch(
      addItemToWishlist({
        product_id: product_id,
      })
    );
  };

  const handleRemove = async () => {
    try {
      onRemoveSuccess(productId);
    } catch (error) {
      alert("Cannot delete");
      console.log(error);
    }
  };

  const setid = () => {
    localStorage.setItem("myId", productId);
  };

  return (
    <>
      <div className="col-md-2">
        <Link onClick={setid} href={`/ProductDetail`}>
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

      <div className="col-md-10 card-Quantity-section">
        <Link onClick={setid} href={`/ProductDetail`}>
          <h6> {productName} </h6>
        </Link>
        <p>{productDesc}</p>
        <div className="CartQuantity">
          <p>Quantity</p>
          {/* Increment Decrement start */}
          <IncrementDecrement
            initialCount={initialCount}
            onIncrement={handleIncrement}
          />
          {/* Increment Decrement end */}
          <div className="productPrice">
            <p>{productPrice}</p>
            <p>
              <del> {discountedPrice}</del>
              <span>{discPer}%</span>
            </p>
          </div>
        </div>
        <div className="InstallationCharges">
          <p> Installation Charges : Rs{installationCharges}</p>
          <div className="CouponApplied">
            <Image
              src="/Assets/images/AddTOCart/percentage.png"
              classname="img-fluid d-block w-100"
              alt="ome banner 1"
              width={100}
              height={80}
            />
            <p>Coupon Applied</p>
          </div>
        </div>

        <div className="InstallationCharges">
          <div
            onClick={() => handleAddtoWishlist(productId)}
            className="CouponApplied"
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
          <div onClick={handleRemove} className="CouponApplied">
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
