import './Hiring.css'
import Hirirng_Card from '../Hiring_Cards/Hiring_card'


const Hiring = () => {
    return (
        <>
            <div className="main_container">

                <div className="text-center fw-bold mt-5">
                    <div className=" title2 fs-1 ">Our Hiring<span class="fw-bold text-danger"> Process</span> </div>
                    <div className=" mt-1 fw-normal">Current Openings</div>
                </div>

                <div class='d-flex justify-content-evenly gap-5 position-relative mt-5'>


                    <div className="HC1">
                        <Hirirng_Card className="Card1" TitleClass="Apply" IMGClass="IMG1" ImgSrc="/Assets/svg/Group 929.svg" Title="APPLY" Text="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Voluptas earum, ab atque mollitia molestias adipisci rerum accusantium laboriosam,
                      inventore fuga iste vel odio ad esse!" />
                    </div>

                    <div className="HC2">
                        <Hirirng_Card className="Card2" TitleClass="Interview" IMGClass="IMG2" ImgSrc="/Assets/svg/Group 928.svg" Title="INTERVIEW" Text="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Voluptas earum, ab atque mollitia molestias adipisci rerum accusantium laboriosam,
                      inventore fuga iste vel odio ad esse!"  />
                    </div>

                    <div className="HC3">
                        <Hirirng_Card className="Card3" TitleClass="Recruitment" IMGClass="IMG3" ImgSrc="/Assets/svg/Group 914.svg" Title="RECRUITMENT" Text="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Voluptas earum, ab atque mollitia molestias adipisci rerum accusantium laboriosam,
                      inventore fuga iste vel odio ad esse!"  />
                    </div>

                </div>


            </div>


        </>
    )
}
export default Hiring