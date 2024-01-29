import { DEV_MIDDLEWARE_MANIFEST } from 'next/dist/shared/lib/constants'
import './Hirirng_Card.css'

const Hirirng_Card = (props) => {
    return (
        <>

            <div className="card-group d-flex justify-content-center {props.className}"  >
                <div className=" HiringCard p-3 d-flex flex-column " >
                    <div className="d-flex justify-content-center" >
                        <img className={props.IMGClass} src={props.ImgSrc} className="card-img-top " alt="image by author" />
                    </div>
                    <div className="card-body text-center">
                        <h5 className={props.TitleClass} >{props.Title}</h5>
                        <p className="card-text HText">{props.Text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hirirng_Card