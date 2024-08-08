import Image from "next/image";
import "./BulkOrders.css";
import GetQuoteForm from "./GetQuoteForm";

const BulkOrders = () => {
  return (
    <>
      <div className="orders_main">
        <div className="d-flex flex-wrap justify-content-center ordersCont mt-5 position-relative ordrmainMargin">
          <div className="text-center fw-bold ordersLogo">
            <div className="darkBlue fw-large">
              BULK
              <div className="text-danger">ORDERS</div>
            </div>
            <p className="fw-normal mt-2">Tell us your requirement </p>
            <p className="fw-normal">
              and <span className="fw-bold">get free quotes</span>
            </p>
          </div>
          <div className="ordersimg-cont">
            <Image
              src="/Assets/svg/Group 910.svg"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
              alt="Picture of the author"
            />
          </div>

          <div className="bottomForm container text-center">
            <div className="row">
              <div className="col-md-8">
                {/* <div className="frmW">
                  <GetQuoteForm
                    className="sbmtButton"
                    bottomclass="getbottomform rounded-5 w-100"
                  />

                  <div className="getQformBottom w-100"></div>
                  <div className="bottomImgOfForm position-absolute">
                    <Image
                      src="/Assets/svg/Group 871.svg"
                      width={100}
                      height={100}
                      layout="responsive"
                      objectFit="cover"
                      alt="Picture of the author"
                    />
                  </div>
                </div> */}
              </div>

              <div className="col-md-4 colResText">
                <div className="text-center fw-bold">
                  <div className="mx-5 px-md-5 darkBlue fs-1 fw-large2 GQRespTxt hide">
                    GET<span className="text-danger"> QUOTE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkOrders;
