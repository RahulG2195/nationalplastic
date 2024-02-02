import TopPicsCard from '../TopPicsCard/TopPicsCard';

const TopPics = () => {
    // Define an array of objects with imgSrc and imgText properties
    const topPicsData = [
        { imgSrc: "/assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png", imgText: "Karnival Chair" },
        { imgSrc: "/assets/images/circular/Atlantis-Chair.jpg-2/Atlantis-Chair.jpg-2.png", imgText: "Atlantis Chair" },
        { imgSrc: "/assets/images/circular/Karen-Chair.jpg-2/Karen-Chair.jpg-2.png", imgText: "Karen Chair" },
        { imgSrc: "/assets/images/circular/Orca-Chair 2/Orca-Chair 2.png", imgText: "Orca Chair" },
        { imgSrc: "/assets/images/circular/Magna-Chair.jpg-2/Magna-Chair.jpg-2.png", imgText: "Magna Chair" },
        { imgSrc: "/assets/images/circular/Saab-Chair.jpg-2/Saab-Chair.jpg-2.png", imgText: "Saab Chair" },
        { imgSrc: "/assets/images/circular/Leisure-Chair.jpg-2/Leisure-Chair.jpg-2.png", imgText: "Leisure Chair" },
        { imgSrc: "/assets/images/circular/Merc-Sofa-Chair.jpg-2/Merc-Sofa-Chair.jpg-2.png", imgText: "Merc Sofa Chair" },
        { imgSrc: "/assets/images/circular/Omega-Chair.jpg-2/Omega-Chair.jpg-2.png", imgText: "Omega Chair" },
        { imgSrc: "/assets/images/circular/Storm-Chair/Storm-Chair.png", imgText: "Storm Chair" },
        { imgSrc: "/assets/images/circular/Solace-chair/Solace-chair.png", imgText: "Solace Chair" },
        { imgSrc: "/assets/images/circular/Ghost-Chair/Ghost-Chair.png", imgText: "Ghost Chair" },
    ];

    return (
        <>
            <div className="main_container mt-5">
                <div className="text-center mt-5">
                    <div className="fs-1 fw-bold text-danger"> Top Pics <span className="darkBlue fw-normal">For you</span> </div>
                    <div className="mt-1 fw-semibold subCptRes">
                        <p>It is a long established fact that a reader will be distracted by the </p> <p>readable content of a page when looking at its layout.</p>
                    </div>
                </div>

                <div className='d-flex justify-content-center gap-2 flex-wrap'>
                    <div className="container text-center mt-5 d-flex justify-content-center">
                        <div className="row">
                            {topPicsData.map((data, index) => (
                                <div key={index} className="col-lg-2 col-sm-6 col-xs-12 col-md-4 my-4">
                                    <TopPicsCard imgSrc={data.imgSrc} imgtext={data.imgText} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopPics;
