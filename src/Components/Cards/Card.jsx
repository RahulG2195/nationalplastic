import React from "react";
import './Card.css';

const Card = (props) => {
    return (
        <>
                <div className="card card3 nMimages"><img src={props.imgsrc} alt="" className="h-100 w-100  " /></div>

        </>
    )
}

export default Card;
