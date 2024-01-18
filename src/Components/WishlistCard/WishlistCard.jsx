import './WishlistCard.css'
const WishlistCard = (props) => {
    return (
        <>

            <div className='media'>
                <div className="card mx-auto mb-3 border-0 BG-gray ">


                    <div className="card mb-3 w-100 border-0 ">
                        <div className="row g-0 ">
                            <div className="col-md-2 d-flex align-items-center justify-content-center">
                                <img src={props.WishlistImg} className="img-fluid rounded-start" alt="Card Image" />
                            </div>
                            <div className="col-md-10 BG-gray px-4">
                                    <div className="row">
                                        <div className="col-md-6 d-flex flex-column justify-content-center">
                                            <h5 className="card-title ProductTitle">{props.productName}</h5>
                                            <p className="card-text productSubTitle">{props.producDiscription}</p>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-between align-items-center bottom">
                                            <div className="price">
                                                <p style={{ marginBottom: '0' }} className='p1 fw-semibold'>{props.Price}</p>
                                                <p style={{ marginTop: '-8px' }} className='p2'> <s>{props.orignalPrice}</s></p>
                                            </div>

                                            <button type="button" className="btn btn-danger">
                                                MOVE TO CART
                                            </button>
                                            <div className="delete">
                                                <img src="/Assets/svg/Icon core-trash.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>





                </div>
            </div>

        </>
    )
}
export default WishlistCard