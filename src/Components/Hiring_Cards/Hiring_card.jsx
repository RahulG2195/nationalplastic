import './Hirirng_Card.css'
import Image from "next/image";


const Hirirng_Card = ({ className, TitleclassName, IMGclassName, ImgSrc, Title, Text }) => {
    return (
        <>

            <div className={`card-group d-flex justify-content-center hiringCardResp`}>
                <div className={`HiringCard p-3 d-flex flex-column ${className}`}>
                    <div className="d-flex justify-content-center">
                        <Image
                            src={ImgSrc} // Path to the image
                            alt="current-image"
                            width={100} // Specify the width
                            height={100} // Specify the height
                            style={{ objectFit: "contain" }} // Optional: Ensure the image maintains aspect ratio
                        />                    </div>
                    <div className="card-body text-center">
                        <h5 className={`${TitleclassName} respHiringCardTitle`}>{Title}</h5>
                        <p className="card-text HText respHiringCardCpt">{Text}</p>
                        <button type="button" className="btn small ReadMoreRespBtn" data-bs-toggle="button">
                            Read More
                        </button>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Hirirng_Card


