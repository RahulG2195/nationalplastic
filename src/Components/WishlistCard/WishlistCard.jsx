import React from 'react';
import './WishlistCard.css'
import axios from 'axios';

const WishlistCard = (props) => {
    const handleOnClick = async () => {
        console.log(props.id);
        try {
            // const response = await axios.delete('http://localhost:3000/api/Wishlist', );
          
                props.onDeleteSuccess(props.id);
                // console.log(props.id);
            
        } catch (error) {
            alert("cant delete")
            console.log(error)
        }
    }

    return (
        <div className="wishlist-card pt-2">
            <div className="wishlist-image">
                <img src={props.WishlistImg} className="img-fluid rounded-start" alt="Card Image" />
            </div>
            <div className="wishlist-details d-flex justify-content-evenly px-0">
                <div className='w-50 wishCptResp'>
                    <h5 className="card-title ProductTitle fw-semibold">{props.productName}</h5>
                    <p className="card-text productSubTitle">{props.producDiscription}</p>
                </div>
                <div className=''>
                    <div className="price m-1 fw-bold WishpriceRsp">
                        <div>{props.Price}</div>
                        <div className=' text-body-tertiary text-decoration-line-through'>{props.originalPrice}</div>
                        <div className='text-danger small'>{props.discount}%</div>
                    </div>
                    <div className="wishlist-buttons">
                        <button type="button" className="btn btn-danger moveTocartResp ms-1 me-3">
                            MOVE TO CART
                        </button>
                        <button type="button" className="btn btn-outline-danger delete delResp " onClick={handleOnClick}>
                            <img src="/Assets/svg/Icon core-trash.svg" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;
