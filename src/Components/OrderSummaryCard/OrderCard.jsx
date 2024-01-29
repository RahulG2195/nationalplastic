
const OrderSummaryCard = (props) => {
    return (
        <>

            <div className="d-flex align-items-center gap-2 my-2">
                <div className="orderImage">
                    <img src={props.imgSrc} className="img-fluid rounded-start" alt="..." />
                </div>

                <div>
<<<<<<< HEAD
                    <div className=" ml-3">
                        <div >{props.description}</div>
                        <div>Quantitiy : {props.quantity}</div>
=======
                    <div class=" ml-3">
                        <div className="fw-semibold medium" >{props.description}</div>
                        <div className="fw-bold medium">Quantitiy : {props.quantity}</div>
>>>>>>> 5a91d9bee69df6670363c806bac3052cc358c16f
                    </div>
                </div>

            </div>
            <div className=" border-bottom border-secondary"></div>

        </>
    )
}
export default OrderSummaryCard