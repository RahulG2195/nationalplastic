import Image from "next/image";
import IncrementDecrement from "./IncrementDecrement";
const CartProduct = ({src, productName, productDesc, discountedPrice, productPrice }) => {

  return (
    <>
                  <div className="col-md-2">
                    <Image
                      src={image}
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
                    <h6> consetetur sadipscing elitr,</h6>
                    <p>{productDesc}</p>
                    <div className="CartQuantity">
                      <p>Quantity</p>
                      {/* Increment Decrement start */}
                      <IncrementDecrement />
                      {/* Increment Decrement end */}
                      <div className="productPrice">
                        <p>{discountedPrice}</p>
                        <p>
                          <del> {productPrice}</del>
                          <span>30% Off</span>
                        </p>
                      </div>
                    </div>
                    <div className="InstallationCharges">
                      <p> Installation Charges : Rs 000 </p>
                      <div className="CouponApplied">
                        <Image
                          src="/assets/images/AddTOCart/percentage.png"
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
                          src="/assets/images/AddTOCart/core-heart.png"
                          classname="img-fluid d-block w-100"
                          alt="ome banner 1"
                          width={100}
                          height={80}
                        />
                        <p>Save For Later</p>
                      </div>
                      <div className="CouponApplied">
                        <Image
                          src="/assets/images/AddTOCart/Icon-core-trash.png"
                          classname="img-fluid d-block w-100"
                          alt="ome banner 1"
                          width={100}
                          height={80}
                        />
                        <p>Remove</p>
                      </div>
                    </div>
                  </div>  
                  <hr/>
    </>
  );
};
export default CartProduct;
