import Image from "next/image";
import './TopPicsCard.css'

const TopPicsCard = (props) => {
   
    return (
        <>
            <div className="main">

                <div className="circularCard d-flex flex-column align-items-center position-relative">
                    <div className="circularimg ">

                        <Image
                        className="image"
                            src={props.imgSrc}
                            width={100}
                            height={100}
                            layout='responsive'
                            objectFit='cover'
                            alt="Picture of the author"
                        />
                    </div>


                    {props.imgtext.trim() === '' ? (
                        <div className="z-5 no-hover">
                            <button className="btn small bg-danger p-1 fw-semibold text-white" >Get Quote</button>
                            <button className="btn small bg-black p-1 fw-semibold text-white mx-2" >Get Quote</button>
                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                        </div>
                    ) : (<div className="circularText text-danger mt-2 fw-semibold">{props.imgtext}</div>
                    )}


                </div>

            </div>
        </>
    )
}
export default TopPicsCard