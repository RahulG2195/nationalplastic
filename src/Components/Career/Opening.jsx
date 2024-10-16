import JobCard from '../Job_Card/JobCard'

const Opening = () => {
    return (
        <>

            < div className=" mt-5 opening">


                <div className="text-center fw-bold">
                    <div className=" title2 fs-1 darkBlue ">Join<span className="fw-bold text-danger"> US</span> </div>
                    <div className=" mt-1 fw-normal">Current Openings
                    </div>
                </div>
                <div className='d-flex justify-containet justify-content-center'>
                    <div className="Card-container mt-4 border-top">

                        <h5 className="px-3 my-4 fw-bold d-inline-block">Full Time</h5>
                         <span className='px-3 py-2 bg-body-secondary rounded-pill small fw-bold'>9 jOBS</span>
                       

                        <div className="container text-center">
                            <div className="row">
                                {/* <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div> */}
                                <div className="container text-center">
                                    <div className="row">
                                        {[...Array(9)].map((_, index) => (
                                            <div className="col-md-4" key={index}>
                                                <JobCard />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
export default Opening;