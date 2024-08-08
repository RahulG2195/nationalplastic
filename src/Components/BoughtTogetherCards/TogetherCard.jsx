import Image from "next/image";


const TogetherCard = (props) => {
    return (
        <>

            <div className="card bought_card border border-0">
                <div className="card-headers">
                <div className="overlay"></div>
                    <Image
                        src={props.imgSrc}
                        width={25}
                        height={25}
                        layout='responsive'
                        objectFit='cover'
                        alt="Picture of the author"
                    />
                    <div className="prod_name">
                    <h5>{props.prod_name}</h5>
                </div>
                </div>
                <div className="card-body d-flex gap-1">
                {props.caption ? null : <div><i className="medium fa fa-inr fw-bold" aria-hidden="true"></i></div>}
                     <div className='medium fw-bold mb-2 brought_price'> {props.caption ?props.caption : props.Price}</div>
                </div>
                
            </div>
        </>
    )
}
export default TogetherCard;