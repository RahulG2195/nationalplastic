import Link from "next/link";
import "../../styles/prod_detail.css";
import Image from "next/image";
import NoCostEmi from "../NoCostEmi/NoCostEmi";
import ProductDetailSlider from "../ProductDetailSlider/ProductDetailSlider";
import MoreProduct from "./MoreProducts/MoreProduct";
import RecentlyViewedDetails from "./RecentlyViewedDetails/RecentlyViewedDetails";
import CustomerReview from "./CustomerReview/CustomerReview";
import Faqs from "../FAQs/Faqs";
import FooterRow from "../FooterRow/FooterRow";
import TabContent from "./TabContent/TabContent";
// import RecentlyViewed from "../ProductsCatlogue/RecentlyViewed";

function ProdData() {
  return (
    <>
      <div className="px-4">
        <div className="heading-section">{/* <h2>Product Details</h2> */}</div>
        <div className="row">
          <div className="col-md-6">
            <ProductDetailSlider />
          </div>

          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name text-center">
                  <h2>Karnival Chair</h2>
                </div>

                <div className="reviews-counter d-flex flex-wrap gap-2">
                  <div className="mrp">
                    <h6>
                      <strong>MRP ₹0000</strong>
                    </h6>
                    <del> ₹0000</del>
                  </div>

                  <div className="d-flex flex-wrap align-items-center">
                    <div className="discount discRes"><p>Save <span>₹</span> 600</p></div>
                    <div className="inc small"><small>(incl. of all taxes)</small></div>
                  </div>

                </div>

                <div className="prod_type mt-4">
                  <div className="prod_clr">
                    <p>
                      <strong>Color: </strong> Gold
                    </p>
                    <input type="radio" name="prod_clr" id="gold" value="gold" className="productDetailsRadio m-1" />
                    <input type="radio" name="prod_clr" id="gold" value="white" className="productDetailsRadio m-1" />
                  </div>
                  <div className="prod_size">
                    <div><strong>Size: </strong> 0000</div>
                    <input type="text" name="prod_size" id="size" placeholder="000" />
                  </div>
                </div>

              </div>
              <div className="bulk_order_div">
                <Link href='/BulkOrder' className=""><button className="btn btn-danger px-5 my-2 ProdbtnRes bulkRes">Bulk Order</button></Link>
              </div>
              {/* <div className="row">
              <div className="col-md-6">
                <label htmlFor="size">Size</label>
                <select id="size" name="size" className="form-control">
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="color">Color</label>
                <select id="color" name="color" className="form-control">
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Red</option>
                </select>
              </div>
            </div> */}

              <div className="product-count">
                <label htmlFor="size">Quantity</label>
                <form action="#" className="display-flex">
                  <div className="qtyminus">-</div>
                  <input
                    type="text"
                    name="quantity"
                    defaultValue={1}
                    className="qty"
                  />
                  <div className="qtyplus">+</div>
                </form>
                <Link href="/AddToCart" className="btn bg-danger text-white m-2 px-5 ProdbtnRes">
                  Add to Cart
                </Link>
                <Link href="/Address" className="btn bg-danger text-white m-2 px-5 ProdbtnRes">
                  Buy Now
                </Link>
              </div>
              <p className="eye"><i className="fa fa-eye"></i> 210 customers are interviewing the product</p>
              <div className="terms fw-medium small">
                <Link href="TearnsAndConditions">Terms and Conditions</Link>
                <ul>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                </ul>
              </div>
              <div className="d-flex flex-wrap justify-content-center position-relative align-items-center m-4 ChkAvblityRes">
                <p className="fw-semibold m-2">Check Availability</p>
                <div className="d-flex flex-wrap justify-content-center align-items-center reschkAvbl">
                  <div><input className="p-2" type="text" placeholder="Enter Your Pin Code" /></div>
                  <div className="ChckBtnRes"><a href="#" className="btn rounded-0 bg-danger text-white p-2">CheckNow</a></div>
                </div>
              </div>

              <div className="freuently_bought mb-2">
                <h6 className="m-3">Frequently Bought Together</h6>
                <div className="combile_price d-flex flex-wrap">

                  <div className="relevent_img d-flex gap-2 align-items-center">
                    <Image src='/Assets/images/Single Altis Image.png' width={100} height={100} layout="responsive" objectFit="cover" alt="img1" />
                    <span><i className="fa fa-plus"></i></span>
                    <Image src="/Assets/images/Single Altis Image.png" width={100} height={100} layout="responsive" objectFit="cover" alt="img1" />
                    <span><i className="fa fa-plus"></i></span>
                    <Image src='/Assets/images/Single Altis Image.png' width={100} height={100} layout="responsive" objectFit="cover" alt="img1" />
                  </div>

                  <div className="com_price text-top m-3">
                    <p>Total Price: 0000/-</p>
                    <button type="button" class="btn rounded-0 btn-outline-danger py-1 px-4 fw-semibold medium">Add selected to cart</button>
                  </div>

                </div>
                <NoCostEmi />
              </div>
            </div>
          </div>
        </div>

        <MoreProduct />

        <div className="listTabContent">
          <TabContent />
        </div>
      </div>


    </>

  );
}

export default ProdData;