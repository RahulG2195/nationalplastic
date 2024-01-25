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
                    <div className="fs-1 fw-bold text-danger">Premium <span className="title2 fw-normal">Chairs</span> </div>
                    <div className="mt-1 fw-semibold">It is a long established fact that a reader will be distracted by the readable <br />
                        content of a page when looking at its layout. The point of using Lorem Ipsum <br />
                        is that it has a more-or-less normal distribution of letters, as opposed to using</div>
                </div>


                <div className="px-5 mx-5 mt-5 d-flex justify-content-between">
                    <div>
                        <div className='text-body-secondary fw-semibold'>FILTER BY</div>
                        <div className="d-flex gap-3 mt-2">
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
