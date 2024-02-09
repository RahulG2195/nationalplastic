import './NoCostEmi.css'
const NoCostEmi = () => {
    return (
        <>

            <div className="Imgbottom d-flex align-items-center mt-3 gap-5">

                <div className="cont">
                    <div className="img">
                        <img src="/Assets/svg/Path 52.svg" alt="" />
                    </div>
                    <div className="text">
                        <h5 className="fw-semibold">NO COST EMI</h5>
                        <h6>on leading banks</h6>
                    </div>
                </div>


                <div className="cont Banks d-flex align-items-center justify-content-center gap-2">
                    <div className="d-flex flex-column ">
                        <img src="/Assets/images/2560px-ICICI_Bank_Logo.svg/2560px-ICICI_Bank_Logo.svg.png" alt="" />
                        <img src="/Assets\images\HDFC-Bank-logo-removebg-preview\HDFC-Bank-logo-removebg-preview.png" alt="" />
                    </div>
                    <div className="d-flex flex-column  ">
                        <img src="/Assets\images\AXISBank_Logo.svg\AXISBank_Logo.svg.png" alt="" />
                        <img src="/Assets\images\Yes_Bank_SVG_Logo.svg\Yes_Bank_SVG_Logo.svg.png" alt="" />
                    </div>
                    <img className='kotak'  src="/Assets\images\kotak-bank-logo-removebg-preview\kotak-bank-logo-removebg-preview.png" alt="" />
                </div>

            </div>
        </>
    )
}

export default NoCostEmi ;