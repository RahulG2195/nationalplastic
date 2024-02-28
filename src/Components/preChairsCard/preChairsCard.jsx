"use client"
import Link from 'next/link'
import './PreChairsCard.css'
import { useEffect } from 'react'

const PreChairsCard = (props) => {

    const setid = () => {
        localStorage.setItem('myId', props.id);
    };

    const handleAddToCart = () => {
        props.onAddToCart(props.id)
    }

    const handleAddWishlist = () => {
        props.onaddToWishlist(props.id, props.Title, props.Discription, props.Price, props.orignalPrice, props.Discount, props.ChairImg)
    }

    return (
        <>

            <div className='preCont cards mt-3 p-1 position-relative  my-4 '>
                {/* <Link onClick={setid} href={`/ProductDetail`}> */}
                <Link href={`/ProductDetail?id=${props.id}`}>

                    <div className='card-header'>
                        <img src={props.ChairImg} className="card-img-top" alt="..." />
                    </div>
                </Link>
                <div className="card-body">
                    <div className="PreFoot mt-2 ">

                        <div className="class d-flex flex-wrap justify-content-between my-2 ">
                            <Link href="/ProductDetail"><div className="left fw-bold text-danger">{props.Title}</div></Link>
                            <div className="right">
                                <i onClick={handleAddToCart} className="fa fa-cart-arrow-down fa-lg" aria-hidden="true"></i>
                                <i onClick={handleAddWishlist} className="fa fa-heart-o ms-3" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div className='text-center fw-medium my-2 DESCresp'>{props.Discription}</div>

                        <div className="rs d-flex flex-wrap  justify-content-between align-items-center ">
                            <div className='d-flex gap-2 align-items-center'>
                                <div> <i className="medium fa fa-inr fw-bold priceResp" aria-hidden="true"></i> </div>
                                <div className='medium fw-bold priceResp'>{props.Price}</div>
                                <div className='small text-secondary text text-decoration-line-through'>{props.orignalPrice}</div>

                            </div>
                            <div className='d-flex flex-wrap fw-semibold text-danger '>
                                <div>{props.Discount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PreChairsCard