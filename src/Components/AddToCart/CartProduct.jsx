import Image from "next/image";
import IncrementDecrement from "./IncrementDecrement";
const CartProduct = ({src, productName, productDesc, discountedPrice, productPrice }) => {

  return (
    <>
                  <div className="col-md-2">
                    <Image
                      src= {src}
                      classname="img-fluid d-block w-100"
                      alt="ome banner 1"
                      width={100}
                      height={80}
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
                        <p className="Coupontext">Coupon Applied</p>
                      </div>
                    </div>
                    <div className="InstallationCharges">
                      <div className="CouponApplied SaveForLater">
                      <i class="fa fa-heart-o" aria-hidden="true"></i>
                        <p>Save For Later</p>
                      </div>
                      <div className="CouponApplied SaveForLater">
                      <i class="fa fa-trash-o" aria-hidden="true"></i>
                        <p>Remove</p>
                      </div>
                    </div>
                  </div>  
                  <hr/>
    </>
  );
};
export default CartProduct;
