import './Registration.css'


const Registration = () => {
    return (
        <>
            <div className=" d-flex justify-content-center">

                <div className="formBody mt-5">

                    <div className="formCont p-5">
                        <form>
                            <div class="row">

                                <div class="mb-3 col-md-4">
                                    <label class="form-label fw-bold">Job Profile*</label>
                                    <input type="text" class="form-control " id="JobProfile" required />
                                </div>
                                <div class="mb-3 col-md-4">
                                    <label class="form-label fw-bold">Full Name*</label>
                                    <input type="text" class="form-control " id="FullName" required />
                                </div>
                                <div class="mb-3 col-md-4">
                                    <label class="form-label fw-bold">Attach CV/Resume/Bio-data*</label>
                                    <input type="file" class="form-control " id="FullName" required />
                                </div>


                                <div class="mb-3 col-md-4">
                                    <label class="form-label fw-bold">Email Address*</label>
                                    <input type="Email" class="form-control " id="Email" required />
                                </div>
                                <div class="mb-3 col-md-4">
                                    <label class="form-label fw-bold">Mobile Number*</label>
                                    <input type="Number" class="form-control " id="MobileNumber" required />
                                </div>
                                <div class="mb-3 col-md-4 d-flex align-items-end justify-content-center gap-5">

                                        <button class="btn btn-danger px-4" type="submit">Submit</button>
                                        <button class="btn btn-danger px-4" type="submit">Reset</button>

                                </div>
                            </div>



                            {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                        </form>
                    </div>



                </div>


            </div>

        </>
    )
}
export default Registration