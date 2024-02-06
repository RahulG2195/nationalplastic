const OrderSummaryCard = (props) => {
    return (
        <>
            <div className="d-flex align-items-center gap-2 my-2">
                <div className="orderImage">
                    <img src={props.imgSrc} className="img-fluid rounded-start" alt="..." style={{ maxWidth: "70px", maxHeight: "70px" }} />
                </div>

                <div>
                    <div className="ml-3">
                        <div className="fw-semibold medium">{props.description}</div>
                        <div className="fw-bold medium">Quantity: {props.quantity}</div>
                    </div>
                </div>
            </div>
            <div className="border-bottom border-secondary mb-2"></div>
        </>
    )
}
export default OrderSummaryCard;
