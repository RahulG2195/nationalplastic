import React from "react";
import './Card.css';

const Card = (props) => {
    return (
        <>
                <div class="card card3 "><img src={props.imgsrc} alt="" class="h-100 w-100" /></div>

        </>
    )
}

export default Card;
