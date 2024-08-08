import Image from "next/image"
import Link from "next/link"
const BottomCTABanner = () => {
    return (
        <>
            <Link href="/About">
                <div className="my-md-5 my-2">
                    <Image
                        className="mt-md-5 mt-2"
                        src={"/Assets/images/CTA-banner-2.jpg-v2/CTA-banner-2.jpg-v2.png"}
                        width={100}
                        height={80}
                        layout='responsive'
                        objectFit='cover'
                        alt="Picture of the author"
                    />
                </div>
            </Link>


        </>
    )
}
export default BottomCTABanner
