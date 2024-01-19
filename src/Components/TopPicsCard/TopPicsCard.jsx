import Image from "next/image";
import './TopPicsCard.css'

const TopPicsCard = (props) => {
    return (
        <>
            <div className="main">

                <div className="circularCard d-flex flex-column align-items-center position-relative">
                    <div className="circularimg ">

                        <Image
                            src={props.imgSrc}
                            width={100}
                            height={100}
                            layout='responsive'
                            objectFit='cover'
                            alt="Picture of the author"
                        />
                    </div>
                    <div className="circularText text-danger mt-2 fw-semibold">{props.imgtext}</div>
                </div>

            </div>
        </>
    )
}
export default TopPicsCard