import { DEV_MIDDLEWARE_MANIFEST } from 'next/dist/shared/lib/constants'
import './Hirirng_Card.css'

const Hirirng_Card = (props) => {
    return (
        <>

            <div class="card-group d-flex justify-content-center {props.className}"  >
                <div class=" HiringCard p-3 d-flex flex-column " >
                    <div class="d-flex justify-content-center" >
                        <img className={props.IMGClass} src={props.ImgSrc} class="card-img-top " alt="image by author" />
                    </div>
                    <div class="card-body text-center">
                        <h5 className={props.TitleClass} >{props.Title}</h5>
                        <p class="card-text HText">{props.Text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hirirng_Card