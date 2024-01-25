import './JobCard.css'

const JobCard = () => {
    return (
        <>
            <div className="card w-80 mb-3 border-danger">
                <div className="card-body p-3">
                    <h5 className="text-start py-0 my-0 cardTitle">Full Time</h5>
                    <p className="text-start fs-6 fw-semibold text-danger py-0 my-0">Lorem ipsum dolor sit amet.</p>
                    <p className="text-start py-0 my-0 city text-body-secondary">Mumbai, India</p>
                </div>
            </div>
        </>
    )
}
export default JobCard ;