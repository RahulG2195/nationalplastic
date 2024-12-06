import './PremiumChairs.css'

const PremiumChairs = ({ cattitle }) => {

    return (
        <>
            <div className=" mt-3">
                <div className="text-center">
                    <div className="fs-1 fw-bold text-danger">{cattitle ? (cattitle.split(' ')[0]) : ""} <span className="darkBlue fw-normal">{cattitle ? (cattitle.split(' ')[1]) : ""}</span>  <span className="darkBlue fw-normal">{cattitle ? (cattitle.split(' ')[2]) : ""}</span>
                    </div>

                    <div className="mt-1 fw-semibold subCptRes w-md-50">
                        <p>
                            Explore our range of premium plastic chairs and household items designed to elevate your living room. Stylish, durable, and affordable solutions perfect for modern homes.
                        </p>
                    </div>

                </div>

            </div>
        </>
    );
}

export default PremiumChairs;
