import './Hirirng_Card.css'

const Hirirng_Card = (props) => {
    return (
        <>

            <div className="card-group d-flex justify-content-center hiringCardResp "  >
                <div className=" HiringCard p-3 d-flex flex-column " >
                    <div className="d-flex justify-content-center" >
                        <img className={`${props.IMGclassName} card-img-top`} src={props.ImgSrc} alt="image by author" />
                    </div>
                    <div className="card-body text-center">
                        <h5 className={`${props.TitleclassName} respHiringCardTitle`}>{props.Title}</h5>
                        <p className="card-text HText respHiringCardCpt ">{props.Text}</p>
                        <button type="button" class="btn small ReadMoreRespBtn" data-bs-toggle="button">read More</button>

                    </div>
                </div>
            </div>




        </>
    )
}

export default Hirirng_Card


