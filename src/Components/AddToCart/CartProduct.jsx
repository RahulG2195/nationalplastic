import Image from "next/image";
import IncrementDecrement from "./IncrementDecrement";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import axios from "axios";

const CartProduct = ({ src, productName, productDesc, discountedPrice, productPrice, productId, onRemoveSuccess }) => {
  const [initialCount, setInitialCount] = useState(1); // Set initial count to 1 by default

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const isProductInCart = cartItems.some(item => item.productId === productId);
    // console.log("this is item ", item.productId)
    if (isProductInCart) {
      setInitialCount(initialCount + 1);
    }
  }, [cartItems, productId]); 
  const handleRemove = async () => {
    try {
      onRemoveSuccess(productId);
    } catch (error) {
      alert("Cannot delete");
      console.log(error);
    }
  };
  return (
    <>
      <div className="col-md-2">
        <Image
          src={src}
          className="img-fluid d-block w-100" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
          alt="Team Member"
          width={100}
          height={100}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      
      <div className="col-md-10 card-Quantity-section">
        <h6> {productName} </h6>
        <p>{productDesc}</p>
        <div className="CartQuantity">
          <p>Quantity</p>
          {/* Increment Decrement start */}
          <IncrementDecrement initialCount={initialCount}/>
          {/* Increment Decrement end */}
          <div className="productPrice">
            <p>{productPrice}</p>
            <p>
              <del> {discountedPrice}</del>
              <span>30% Off</span>
            </p>
          </div>
        </div>
        <div className="InstallationCharges">
          <p> Installation Charges : Rs 000 </p>
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
          <div className="CouponApplied">
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
