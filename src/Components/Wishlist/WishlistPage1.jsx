import './Wishlist.css'
import WishlistCard from '../WishlistCard/WishlistCard'

const WishlistPage1 = () => {
    return (
        <>

            <div className="main_container">

                <div className="d-flex justify-content-center">
                    <div className="WCcontainer border-0 ">

                        <h4 className='p-4 fw-bold'>Wishlist</h4>

                        <div className='center'>
                            < WishlistCard
                                WishlistImg="https://picsum.photos/id/0/367/267"
                                productName="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                producDiscription="Lorem ipsum dolor sit amet."
                                Price="RS 00,000" orignalPrice="RS 00,000"
                            />
                            < WishlistCard
                                WishlistImg="https://picsum.photos/id/0/367/267"
                                productName="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                producDiscription="Lorem ipsum dolor sit amet."
                                Price="RS 00,000" orignalPrice="RS 00,000"
                            />
                            < WishlistCard
                                WishlistImg="https://picsum.photos/id/0/367/267"
                                productName="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                producDiscription="Lorem ipsum dolor sit amet."
                                Price="RS 00,000" orignalPrice="RS 00,000"
                            />
                            < WishlistCard
                                WishlistImg="https://picsum.photos/id/0/367/267"
                                productName="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                producDiscription="Lorem ipsum dolor sit amet."
                                Price="RS 00,000" orignalPrice="RS 00,000"
                            />
                        </div>

                    </div>
                </div>

                <div className="features d-flex justify-content-center gap-5 flex-wrap m-5 px-5">

                    <div className="shop d-flex justify-content-center feature " >
                        <div className="icon">
                            <img src="/Assets/images/shop/shop.png" alt="" />
                        </div>
                        <div className="FeatureText mx-2 ">
                            <h5 className='fw-semibold'>50+</h5>
                            <h6>Experienced Stores <br />across India</h6>
                        </div>
                    </div>



                    <div className="shop d-flex justify-content-center feature " >
                        <div className="icon">
                            <img src="/Assets/images/Shipping-01/Shipping-01.png" alt="" />
                        </div>
                        <div className="FeatureText mx-2 ">
                            <h5 className='fw-semibold'>350+</h5>
                            <h6> Delivery Centres <br /> Across India</h6>
                        </div>
                    </div>



                    <div className="shop d-flex justify-content-center feature " >
                        <div className="icon">
                            <img src="/Assets/images/reputation/reputation.png" alt="" />
                        </div>
                        <div className="FeatureText mx-2 ">
                            <h5 className='fw-semibold'>20 lakh+</h5>
                            <h6>Satisfied<br />Customer</h6>
                        </div>
                    </div>



                    <div className="shop d-flex justify-content-center feature " >
                        <div className="icon">
                            <img src="/Assets/images/warranty/warranty.png" alt="" />
                        </div>
                        <div className="FeatureText mx-2 ">
                            <h5 className='fw-semibold'>1 year*</h5>
                            <h6>Guaranteed <br />Warranty</h6>
                        </div>
                    </div>



                </div>
            </div>
        </>
    )
}
export default WishlistPage1