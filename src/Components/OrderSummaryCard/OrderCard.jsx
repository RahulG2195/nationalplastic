
const OrderSummaryCard = (props) => {
    return (
        <>

            <div className="d-flex align-items-center gap-2 my-2">
                <div className="orderImage">
                    <img src={props.imgSrc} className="img-fluid rounded-start" alt="..." />
                </div>

                <div>
                    <div class=" ml-3">
                        <div className="fw-semibold medium" >{props.description}</div>
                        <div className="fw-bold medium">Quantitiy : {props.quantity}</div>
                    </div>
                </div>

            </div>
            <div className=" border-bottom border-secondary"></div>

        </>
    )
}
export default OrderSummaryCard