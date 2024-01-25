import './Registration.css'


const Registration = () => {
    return (
        <>
            <div className=" d-flex justify-content-center">

                <div className="formBody mt-5">

                    <div className="formCont p-5">
                        <form>
                            <div className="row">

                                <div className="mb-3 col-md-4">
                                    <label className="form-label fw-bold">Job Profile*</label>
                                    <input type="text" className="form-control " id="JobProfile" required />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label fw-bold">Full Name*</label>
                                    <input type="text" className="form-control " id="FullName" required />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label fw-bold">Attach CV/Resume/Bio-data*</label>
                                    <input type="file" className="form-control " id="FullName" required />
                                </div>


                                <div className="mb-3 col-md-4">
                                    <label className="form-label fw-bold">Email Address*</label>
                                    <input type="Email" className="form-control " id="Email" required />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label fw-bold">Mobile Number*</label>
                                    <input type="Number" className="form-control " id="MobileNumber" required />
                                </div>
                                <div className="mb-3 col-md-4 d-flex align-items-end justify-content-center gap-5">

                                        <button className="btn btn-danger px-4" type="submit">Submit</button>
                                        <button className="btn btn-danger px-4" type="submit">Reset</button>

                                </div>
                            </div>



                            {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                        </form>
                    </div>



                </div>


            </div>

        </>
    )
}
export default Registration