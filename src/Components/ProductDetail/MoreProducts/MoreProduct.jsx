import "../../../styles/prod_detail.css"


const MoreProduct = () => {
    return (
        <>

            <div className="text-center">
                <div className="darkBlue fs-1 fw-bold"> More Product <span className="text-danger">Details</span> </div>
                <div className=" mt-1 fw-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has <br />
                    been the industry's standard dummy text ever since the 1500s,
                </div>
            </div>
            <div className="product-info-tabs">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a
                            className="nav-link active"
                            id="description-tab"
                            data-toggle="tab"
                            href="#description"
                            role="tab"
                            aria-controls="description"
                            aria-selected="true"
                        >
                            Description
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            Merchant Details
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            Care & Instruction
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            Delivery Instructions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            Warranty
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                           T & C
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            FAQ'S
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            Disclaimer
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default MoreProduct