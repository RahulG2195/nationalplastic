import './JobCard.css'

const JobCard = () => {
    return (
        <>
            <div class="card w-80 mb-3 border-danger">
                <div class="card-body p-3">
                    <h5 class="text-start py-0 my-0 cardTitle">Full Time</h5>
                    <p class="text-start fs-6 fw-semibold text-danger py-0 my-0">Lorem ipsum dolor sit amet.</p>
                    <p class="text-start py-0 my-0 city text-body-secondary">Mumbai, India</p>
                </div>
            </div>
        </>
    )
}
export default JobCard ;