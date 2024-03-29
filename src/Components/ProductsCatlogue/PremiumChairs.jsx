import './PremiumChairs.css'

const PremiumChairs = () => {


    return (
        <>
            <div className=" mt-3">
                <div className="text-center">
                    <div className="fs-1 fw-bold text-danger">Premium <span className="darkBlue fw-normal">Chairs</span> </div>
                    <div className="mt-1 fw-semibold subCptRes w-50"><p>It is a long established fact that a reader will be distracted by the readable
                        content of a page when looking at its layout. The point of using Lorem Ipsum
                        is that it has a more-or-less normal distribution of letters, as opposed to using</p>
                    </div>
                </div>


                <div className="px-5 mx-5 dropboxRes mt-5 d-flex justify-content-between">
                    <div>
                        <div className='text-body-secondary fw-semibold'>FILTER BY</div>
                        <div className="d-flex flex-wrap gap-3 mt-2">
                            <div className="dropdown mt-2 arrow">
                                <label htmlFor='Date' className='darkBlue fw-semibold dropdownbuttonResp' >
                                    Price:
                                </label>
                                <select id='Date' name='Date' className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp" >
                                    <option>Low to high</option>
                                    <option>High to low</option>
                                    <option>default</option>
                                </select>
                            </div>
                            <div className="dropdown mt-2 arrow">
                                <label htmlFor='Date' className='darkBlue fw-semibold dropdownbuttonResp' >
                                    Arm Type:
                                </label>
                                <select id='Date' name='Date' className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp" >
                                    <option>new to old </option>
                                    <option>old to new</option>
                                    <option>default</option>
                                </select>
                            </div>
                            <div className="dropdown mt-2 arrow">
                                <label htmlFor='Date' className='darkBlue fw-semibold dropdownbuttonResp' >
                                    Color:
                                </label>
                                <select id='Date' name='Date' className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp" >
                                    <option> Black </option>
                                    <option>Blue</option>
                                    <option>Red</option>
                                </select>
                            </div>
                            <div className="dropdown mt-2 arrow">
                                <label htmlFor='Date' className='darkBlue fw-semibold dropdownbuttonResp' >
                                    Discount:
                                </label>
                                <select id='Date' name='Date' className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp" >
                                    <option>new to old </option>
                                    <option>old to new</option>
                                    <option>default</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div>
                        <div className='text-body-secondary fw-semibold'>SORT BY</div>
                        <div className="dropdown mt-2 arrow">
                            <label htmlFor='Date' className='darkBlue fw-semibold dropdownbuttonResp' >
                                Date:
                            </label>
                            <select id='Date' name='Date' className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp" >
                                <option>new to old </option>
                                <option>old to new</option>
                                <option>default</option>
                            </select>
                        </div>

                    </div>
                </div>

            </div >
        </>
    );
}

export default PremiumChairs;
