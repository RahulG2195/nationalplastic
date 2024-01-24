
const OrderSummaryCard = (props) => {
    return (
        <>

            <div class="d-flex align-items-center gap-2 my-2">
                <div class="orderImage">
                    <img src={props.imgSrc} class="img-fluid rounded-start" alt="..." />
                </div>

                <div>
                    <div class=" ml-3">
                        <div >{props.description}</div>
                        <div>Quantitiy : {props.quantity}</div>
                    </div>
                </div>

            </div>
            <div className=" border-bottom border-secondary"></div>

        </>
    )
}
export default OrderSummaryCard