import Image from "next/image"
import './CatlogueBanner.css'

const CatlogueBanner = () => {
    return (
        <>
            <div className="main_continer">

                <div className="karen_container position-relative">
                    <Image
                        src="/assets/images/Header-banner-1-(Karen-chair-)/Header-banner-1-(Karen-chair-).png"
                        width={100}
                        height={80}
                        layout='responsive'
                        objectFit='cover'
                        alt="Picture of the author"
                    />
                    <button type="button" className="fw-bold">Shop Now</button>

                </div>


                <div className="Imgbottom d-flex align-items-center justify-content-center gap-5 ">

                    <div className="cont">
                        <div className="img">
                            <img src="/assets/svg/Path 52.svg" alt="" />
                        </div>
                        <div className="text">
                            <h5 className="fw-semibold">NO COST EMI</h5>
                            <h6>on leading banks</h6>
                        </div>
                    </div>


                    <div className="cont Banks d-flex align-items-center justify-content-center gap-2">
                        <div className="d-flex flex-column hdfcIcic">
                            <img src="/assets/images/2560px-ICICI_Bank_Logo.svg/2560px-ICICI_Bank_Logo.svg.png" alt="" />
                            <img src="/assets\images\HDFC-Bank-logo-removebg-preview\HDFC-Bank-logo-removebg-preview.png" alt="" />
                        </div>
                        <div className="d-flex flex-column  axixYes ">
                            <img src="/assets\images\AXISBank_Logo.svg\AXISBank_Logo.svg.png" alt="" />
                            <img src="/assets\images\Yes_Bank_SVG_Logo.svg\Yes_Bank_SVG_Logo.svg.png" alt="" />
                        </div>
                        <img className="kotak" src="/assets\images\kotak-bank-logo-removebg-preview\kotak-bank-logo-removebg-preview.png" alt="" />
                    </div>


                    <div className="cont">
                        <div className="img">
                            <img src="/assets\svg\Group 36.svg" alt="" />
                        </div>
                        <div className="text  px-2">
                            <h5 className="fw-semibold">FREE DELIVERY & INSTALLATION</h5>
                            <h6>across all major cities</h6>
                        </div>
                    </div>

                </div>

            </div>



        </>
    )

}
export default CatlogueBanner