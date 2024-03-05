import './PremiumChairs.css'

const PremiumChairs = ({ cattitle }) => {
    
    return (
        <>
            <div className=" mt-3">
                <div className="text-center">
                    <div className="fs-1 fw-bold text-danger">{cattitle? (cattitle.split(' ')[0]): ""} <span className="darkBlue fw-normal">{cattitle?(cattitle.split(' ')[1]): "" }</span> </div>
                    {/* <div>{cattitle}</div> */}
                    <div className="mt-1 fw-semibold subCptRes w-50"><p>It is a long established fact that a reader will be distracted by the readable
                        content of a page when looking at its layout. The point of using Lorem Ipsum
                        is that it has a more-or-less normal distribution of letters, as opposed to using</p>
                    </div>
                </div>


                {/* <div className="px-5 mx-5 dropboxRes mt-5 d-flex justify-content-between">
                    <div>
                        <div className='text-body-secondary fw-semibold'>FILTER BY</div>
                        <div className="d-flex flex-wrap gap-3 mt-2">
                            <div className="dropdown mt-2 arrow">
                                <select id='Price' name='Price' className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp" >
                                    <option>Price</option>
                                    <option>Low to high</option>
                                    <option>High to low</option>
                                    <option>default</option>
                                </select>
                            </div>
                            <div className="dropdown mt-2 arrow">
                                <select id='Arm_Type' name='Arm_Type' className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp" >
                                    <option> Arm type</option>
                                    <option>new to old </option>
                                    <option>old to new</option>
                                    <option>default</option>
                                </select>
                            </div>
                            <div className="dropdown mt-2 arrow">
                                
                                <select id='Date' name='Date' className="form-control border-primary darkBlue fw-semibold dropdownbuttonResp" >
                                    <option> Color </option>
                                    <option> Black </option>
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
                </div> */}

            </div >
        </>
    );
}

export default PremiumChairs;
