import Image from "next/image";


const TogetherCard = (props) => {
    return (
        <>

            <div class="card border border-0">

                <Image
                    src={props.imgSrc}
                    width={100}
                    height={100}
                    layout='responsive'
                    objectFit='cover'
                    alt="Picture of the author"
                />
                <div class="card-body d-flex gap-1 ">
                    <div><i class="medium fa fa-inr fw-bold " aria-hidden="true"></i></div>
                    <div className='medium fw-bold '>{props.Price}</div>
                </div>
            </div>
        </>
    )
}
export default TogetherCard;