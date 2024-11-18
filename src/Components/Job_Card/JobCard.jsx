import './JobCard.css'

const JobCard = ({ job }) => {
    return (
        <>
            <div className="card w-80 mb-3 border-danger jobcard">
                <div className="card-body p-3">
                    <h5 className="text-start py-0 my-0 cardTitle fw-semibold">{job.type}</h5>
                    <p className="text-start fs-6 fw-semibold text-danger py-0 my-0">{job.role}</p>
                    <p className="text-start py-0 my-0 city text-body-secondary">{job.location}</p>
                </div>
            </div>
        </>
    )
}
export default JobCard ;