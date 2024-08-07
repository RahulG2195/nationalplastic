import Link from 'next/link'
import './BlogBanner.css'
import Image from "next/image"
const BlogBanner = () => {
    return (
        <>
            <div className='position-relative'>
                <Link href="/BlogDetails">
                    <Image
                        src="/Assets/images/Blog-section-banner/Blog-section-banner.png"
                        width={100}
                        height={70}
                        layout='responsive'
                        objectFit='cover' />

                    <button type="button" className="BlogButton fw-semibold">Read Story</button>
                </Link>


            </div>
        </>
    )
}
export default BlogBanner