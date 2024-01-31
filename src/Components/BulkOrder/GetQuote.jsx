import TopPics from '../ProductsCatlogue/TopPics'
import TopPicsCard from '../TopPicsCard/TopPicsCard'
import './GetQuote.css'
import GetQuoteForm from './GetQuoteForm';

const GetQuote = () => {
    const imageData = [
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText: "" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText: "" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText: "" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText: "" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText: "" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText: "" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText: "" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText: "" },
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText: "" },
    ];
    return (
        <>
            <div className="main_container">

                {/* <div className="text-end fw-bold mt-5 mx-5 px-5">
                    <div className="mx-5 px-5 darkBlue fs-1 ">GET<span className=" text-danger"> QUOTE</span> </div>
                </div> */}

                <div className="row Qt_cont mt-5">
                    <div className="col-6 right">

                        <div className="row">
                            {imageData.map((data, index) => (
                                <div key={index} className="col-lg-4 col-md-6 mt-5">
                                    <TopPicsCard imgSrc={data.imgSrc} imgtext={data.imgText} />
                                </div>
                            ))}
                        </div>

                    </div>
                    <div class="col-6 left">
                        <div className="text-center fw-bold  ">
                            <div className="mx-5 px-5 darkBlue fs-1 ">GET<span className=" text-danger"> QUOTE</span> </div>
                        </div>

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