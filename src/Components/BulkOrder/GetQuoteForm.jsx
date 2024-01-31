import './GetQuoteForm.css'
const GetQuoteForm = (props) => {

    return (
        <>
            <div className="GQform rounded p-4 py-5 mt-2">
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

                    <div className="">
                        <textarea className="form-control text-area" rows="4" placeholder="Tell us your requirements"></textarea>
                    </div>
                    <div className="small text-white mb-4">Please include details of product, quantity, type of service etc.*</div>
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="City" />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className={props.className ? props.className : "btn bg-white darkBlue fw-semibold px-4"}
                        >Submit</button>
                    </div>

                </form>
            </div>
        </>

    )
}
export default GetQuoteForm