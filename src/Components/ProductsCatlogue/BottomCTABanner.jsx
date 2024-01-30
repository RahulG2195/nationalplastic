import Image from "next/image"
const BottomCTABanner = () =>{
    return(
        <>
        <div className="mt-5">
                <Image
                    className="mt-5"
                    src={"/Assets/images/CTA-banner-2.jpg-v2/CTA-banner-2.jpg-v2.png"}
                    width={100}
                    height={80}
                    layout='responsive'
                    objectFit='cover'
                    alt="Picture of the author"
                />
            </div>
        </>
    )
}
export default BottomCTABanner
