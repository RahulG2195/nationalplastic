import Image from "next/image";
import "../../styles/trackYourOrder.css";
function TrackYourOrder() {
  return (
    <>
      <div className="container">
        <div className="row TrackOrder">
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <Image
              src="/Assets/images/catalogue/trackYourOrder.png"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 TYOdiv">
            <h1 className="headingTYO">Track Your Order</h1>
            <h4 className="TYODesc">Find out the exact location of your </h4>
            <h4 className="TYODesc"> product and get the relevant alerts.</h4>
          </div>
        </div>

        <div className="row">
          <div className="TOInnerDiv">
            <div className="DataInnerDiv">
              <form action="#">
                {/* <div className="radioBtn">
                  <p>Search By :</p>
                  <input type="radio" id="" name="" value="Order Id/ No" />
                  <label htmlFor="Order Id/ No">Order Id/ No</label>
                  <input type="radio" id="" name="" value="Tracking ID/ AWB" />
                  <label htmlFor="Tracking ID/ AWB">Tracking ID/ AWB</label>
                </div> */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Order Id/ No"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">
                      Track Your Order
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TrackYourOrder;
