import './BlogBanner.css'
import Image from "next/image"
const BlogBanner = () => {
    return (
        <>
            <div className='position-relative'>
                <Image
                    src="/assets/images/Blog-section-banner/Blog-section-banner.png"
                    width={100}
                    height={70}
                    layout='responsive'
                    objectFit='cover' />

                <button type="button" className="BlogButton fw-semibold">Read Story</button>



            </div>
        </>
    )
}
export default BlogBanner