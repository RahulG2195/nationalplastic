import Image from "next/image";


const TogetherCard = (props) => {
    return (
        <>

            <div className="card border border-0">
                <div className="card-header">
                    <Image
                        src={props.imgSrc}
                        width={25}
                        height={25}
                        layout='responsive'
                        objectFit='cover'
                        alt="Picture of the author"
                    />
                    {/* <img src={props.imgSrc} alt="" /> */}
                </div>
                <div className="card-body d-flex gap-1 ">
                {props.caption ? null : <div><i className="medium fa fa-inr fw-bold" aria-hidden="true"></i></div>}
                     <div className='medium fw-bold '> {props.caption ?props.caption : props.Price}</div>
                </div>
            </div>
        </>
    )
}
export default TogetherCard;