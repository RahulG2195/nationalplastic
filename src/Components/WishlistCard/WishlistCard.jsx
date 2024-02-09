import './WishlistCard.css'
const WishlistCard = (props) => {
    return (
        <>

            <div className='media'>
                <div className="card mx-auto mb-3 border-0 BG-gray mt-3 p-3">


                    <div className="card mb-3 w-100 border-0 ">
                        <div className="row g-0 d-flex align-items-center BG-gray ">
                            <div className="col-md-2 d-flex align-items-center justify-content-center icont">
                                <img src={props.WishlistImg} className="img-fluid rounded-start" alt="Card Image" />
                            </div>
                            <div class="col-md-10 BG-gray px-4">
                                    <div className="row">
                                        <div className="col-md-6 d-flex flex-column justify-content-center">
                                            <h5 className="card-title ProductTitle">{props.productName}</h5>
                                            <p className="card-text productSubTitle">{props.producDiscription}</p>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-between align-items-center bottom">
                                            <div className="price">
                                                <p className='p1 fw-semibold'>{props.Price}</p>
                                                <div className='p200 fw-semibold '> <s>{props.originalPrice}</s> <span className='text-danger'>{props.discount}%off</span> </div>
                                                
                                            </div>

                                            <button type="button" className="btn btn-danger">
                                                MOVE TO CART
                                            </button>
                                            <div className="delete">
                                                <img src="/assets/svg/Icon core-trash.svg" alt="" />
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