import Image from "next/image"
import './CatlogueBanner.css'

const CatlogueBanner = () => {
    return (
        <>
            <div className="main_continer">

                <Image
                    src="/assets/images/Header-banner-1-(Karen-chair-)/Header-banner-1-(Karen-chair-).png"
                    width={100}
                    height={80}
                    layout='responsive'
                    objectFit='cover'
                    alt="Picture of the author"
                />
                <div className="Imgbottom ">

                    <div className="cont">
                        <div className="img">
                            <img src="/assets/svg/Path 52.svg" alt="" />
                        </div>
                        <div className="text">
                            <h5 className="fw-semibold">NO COST EMI</h5>
                            <h6>on leading banks</h6>
                        </div>
                    </div>

                    <div className="cont">
                        <div className="img">
                            <img src="/assets/svg/Path 52.svg" alt="" />
                        </div>
                        <div className="text">
                            <h5 className="fw-semibold">NO COST EMI</h5>
                            <h6>on leading banks</h6>
                        </div>
                    </div>

                    <div className="cont">
                        <div className="img">
                            <img src="/assets/svg/Path 52.svg" alt="" />
                        </div>
                        <div className="text">
                            <h5 className="fw-semibold">NO COST EMI</h5>
                            <h6>on leading banks</h6>
                        </div>
                    </div>


                </div>

            </div>



        </>
    )

}
export default CatlogueBanner