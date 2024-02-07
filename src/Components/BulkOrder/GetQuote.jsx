import TopPics from '../ProductsCatlogue/TopPics';
import TopPicsCard from '../TopPicsCard/TopPicsCard';
import GetQuoteForm from './GetQuoteForm';
import './GetQuote.css';

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
                <div className="row Qt_cont mt-5">
                    <div className="col-lg-6 col-md-12">
                        <div className="row">
                            {imageData.map((data, index) => (
                                <div key={index} className="col-lg-4 col-md-4 col-sm-4 col-xs-6 mt-5">
                                    <TopPicsCard imgSrc={data.imgSrc} imgtext={data.imgText} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12 mt-5">
                        <div className="text-center fw-bold">
                            <div className="darkBlue fs-1">GET <span className="text-danger">QUOTE</span></div>
                        </div>
                        <GetQuoteForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GetQuote;
