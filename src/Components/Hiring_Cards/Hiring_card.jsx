import './Hirirng_Card.css'


const Hirirng_Card = ({ className, TitleclassName, IMGclassName, ImgSrc, Title, Text }) => {
    return (
        <>

            <div className={`card-group d-flex justify-content-center hiringCardResp`}>
                <div className={`HiringCard p-3 d-flex flex-column ${className}`}>
                    <div className="d-flex justify-content-center">
                        <img
                            src={ImgSrc} // Path to the image
                            alt="Description of image"
                            width="100"
                            height="100"
                        />                 </div>
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


