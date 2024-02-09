import Image from "next/image"
const ShippingBanner = () => {

    return (
        <>

            <div className="main_Container">


                <div className="Img_cont" >
                    <Image
                        src="/assets/images/Privacy-policy-pg-page-banner/Privacy-policy-pg-page-banner.png"
                        width={100}
                        height={80}
                        layout='responsive'
                        objectFit='cover'
                        alt="Picture of the author"
                    />
                </div>

            </div>




        </>
    )

}
export default ShippingBanner