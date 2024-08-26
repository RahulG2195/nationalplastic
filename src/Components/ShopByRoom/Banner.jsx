import Image from "next/image"
import '@/Components/ProductsCatlogue/CatlogueBanner.css'

const CatlogueBanner = () => {
    return (
        <>
            <div className="main_continer">

                <div className="karen_container position-relative">
                    <Image
                        src="/Assets/images/Header-banner-1-(Karen-chair-)/Header-banner-1-(Karen-chair-).png"
                        width={100}
                        height={60}
                        layout='responsive'
                        objectFit='cover'
                        alt="Picture of the author"
                    />

                </div>


            </div>



        </>
    )

}
export default CatlogueBanner