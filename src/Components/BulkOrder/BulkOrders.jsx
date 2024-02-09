import Image from "next/image"
import './BulkOrders.css'
import GetQuoteForm from "./GetQuoteForm"

const BulkOrders = () => {
    return (
        <>
            <div className="orders_main">
                <div className=" d-flex flex-wrap justify-content-center ordersCont mt-5 position-relative">

                    <div className="text-center fw-bold mt-5 ordersLogo">
                        <div className="darkBlue fw-large mt-5">BULK
                            <div className="text-danger">ORDERS</div>
                        </div>
                        <p className="fw-normal mt-2">Tell us your requirement  </p>
                        <p className="fw-normal">and <span className="fw-bold" >get free quotes</span></p>
                    </div>

                    <div className="ordersimg-cont">
                        <Image
                            src="/assets/svg/Group 910.svg"
                            width={100}
                            height={100}
                            layout='responsive'
                            objectFit='cover'
                            alt="Picture of the author" />
                    </div>
                    <div className="bottomForm">
                        <div className="d-flex align-items-center">
                            <div className="frmW">
                                <GetQuoteForm className="sbmtButton" />
                                <div className="getQformBottom"></div>
                                
                            </div>
                            <div className="position-absolute bottomImgOfForm">
                                  <img src="/assets/svg/Group 871.svg" alt=""  />
                                </div>

                            <div>
                                <div className="text-center fw-bold  ">
                                    <div className="mx-5 px-5 darkBlue fs-1 fw-large2 ">GET<span className=" text-danger"> QUOTE</span> </div>
                                </div>
                                <div className="shape"></div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default BulkOrders
