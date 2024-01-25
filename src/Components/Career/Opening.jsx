import './Opening.css'
import JobCard from '../Job_Card/JobCard'

const Opening = () => {
    return (
        <>

            < div className=" mt-5 opening">


                <div className="text-center fw-bold">
                    <div className=" title2 fs-1 ">Join<span className="fw-bold text-danger"> US</span> </div>
                    <div className=" mt-1 fw-normal">Current Openings
                    </div>
                </div>
                <div className='d-flex justify-containet justify-content-center'>
                    <div className="Card-container mt-4 border-top">
                        <h5 className="px-3 my-4 text-body-secondary">Full Time</h5>

                        <div className="container text-center">
                            <div className="row">
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                                <div className="col-md-4"><JobCard /></div>
                            </div>
                        </div>

                    </div>



                </div>
            </div>

        </>
    )
}
export default Opening;