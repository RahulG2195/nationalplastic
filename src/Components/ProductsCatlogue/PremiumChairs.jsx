import './PremiumChairs.css'

const PremiumChairs = () => {
    const filters = [
        { label: "Price", options: ["Action", "Another action", "Something else here"] },
        { label: "Arm type", options: ["Action", "Another action", "Something else here"] },
        { label: "Color", options: ["Action", "Another action", "Something else here"] },
        { label: "Discount", options: ["Action", "Another action", "Something else here"] },
    ];

    return (
        <>
            <div className=" mt-3">
                <div className="text-center">
                    <div className="fs-1 fw-bold text-danger">Premium <span className="darkBlue fw-normal">Chairs</span> </div>
                    <div className="mt-1 subCptRes fw-semibold"><p>It is a long established fact that a reader will be distracted by the readable</p>
                        <p>content of a page when looking at its layout. The point of using Lorem Ipsum </p>
                        <p>is that it has a more-or-less normal distribution of letters, as opposed to using</p>
                    </div>
                </div>


                <div className="px-5 mx-5 dropboxRes mt-5 d-flex justify-content-between">
                    <div>
                        <div className='text-body-secondary fw-semibold'>FILTER BY</div>
                        <div className="d-flex flex-wrap gap-3 mt-2">
                            {filters.map((filter, index) => (
                                <div key={index} className="dropdown arrow">
                                    <button className="btn bg-transperent dropdown-toggle rounded-pill fw-semibold" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {filter.label}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {filter.options.map((option, optionIndex) => (
                                            <li key={optionIndex}><a className="dropdown-item" href="#">{option}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className='text-body-secondary fw-semibold'>SORT BY</div>
                        <div className="dropdown mt-2 arrow">
                            <button className="btn bg-transperent dropdown-toggle rounded-pill fw-semibold" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Date: New to Old
                            </button>
                            <ul className="dropdown-menu" >
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}

export default PremiumChairs;
