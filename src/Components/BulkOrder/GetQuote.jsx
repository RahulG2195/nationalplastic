import TopPics from '../ProductsCatlogue/TopPics'
import TopPicsCard from '../TopPicsCard/TopPicsCard'
import './GetQuote.css'
import GetQuoteForm from './GetQuoteForm';

const GetQuote = () => {
    const imageData = [
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText:"Caption 1" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText:"Caption 2" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText:"Caption 3" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText:"Caption 4" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText:"Caption 5" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText:"Caption 6" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText:"Caption 7" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText:"Caption 8" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText:"Caption 9" },
    ];
    return (
        <>
            <div className="main_container">

                <div className="text-end fw-bold mt-5 mx-5 px-5">
                    <div className="mx-5 px-5 darkBlue fs-1 ">GET<span className=" text-danger"> QUOTE</span> </div>
                </div>

                <div className="row Qt_cont">
                    <div className="col-6 right">

                        <div className="row">
                            {imageData.map((data, index) => (
                                <div key={index} className="col-lg-4 col-md-6 my-4">
                                    <TopPicsCard imgSrc={data.imgSrc} imgtext={data.imgText} />
                                </div>
                            ))}
                        </div>

                    </div>
                    <div class="col-6 left">

                        <GetQuoteForm />

                        <div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default GetQuote 