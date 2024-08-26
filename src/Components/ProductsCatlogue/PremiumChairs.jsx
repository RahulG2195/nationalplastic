import './PremiumChairs.css'

const PremiumChairs = ({ cattitle }) => {
    
    return (
        <>
            <div className=" mt-3">
                <div className="text-center">
                    <div className="fs-1 fw-bold text-danger">{cattitle? (cattitle.split(' ')[0]): "" } <span className="darkBlue fw-normal">{cattitle?(cattitle.split(' ')[1]): "" }</span>  <span className="darkBlue fw-normal">{cattitle?(cattitle.split(' ')[2]): "" }</span>
                     </div>
                     
                    <div className="mt-1 fw-semibold subCptRes w-50"><p>It is a long established fact that a reader will be distracted by the readable
                        content of a page when looking at its layout. The point of using Lorem Ipsum
                        is that it has a more-or-less normal distribution of letters, as opposed to using</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default PremiumChairs;
