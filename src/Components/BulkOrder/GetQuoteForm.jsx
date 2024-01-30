import './GetQuoteForm.css'
const GetQuoteForm = () => {
    return (
        <>
            <div className="GQform mt-5 pt-5 bg-darkBlue rounded p-4">
                <form>
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Your Name" />
                    </div>

                    <div className="mb-4">
                        <input type="email" className="form-control" placeholder="Your Email Address" />
                    </div>

                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Enter Product Name" />
                    </div>

                    <div className="mb-4">
                        <div className="input-group">
                            <span className="input-group-text">+91</span>
                            <input type="tel" className="form-control" placeholder="Your Mobile Number" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <textarea className="form-control text-area" rows="4" placeholder="Tell us your requirements"></textarea>
                    </div>

                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="City" />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn bg-white darkBlue fw-semibold px-4">Submit</button>
                    </div>

                </form>
            </div>
        </>

    )
}
export default GetQuoteForm