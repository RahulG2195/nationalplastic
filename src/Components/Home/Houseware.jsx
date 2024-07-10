import Image from "next/image"
import Link from "next/link"

function Houseware() {
  return (
    <section className="houseware_sec common_section position-relative ">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-7 houseConntentDiv" >
                    <h2><span className="np_color_red">National Plastic</span> for <span>Houseware</span></h2>
                    <p>Legacy Since 1952</p>
                    <div className="knowmoresec">
                        <Link href='/About' className="house-know-more">
                            Know More
                        </Link>
                        <Link href='/BulkOrder' className="house-know-more">
                            Bulk Order
                        </Link> 
                    </div>
                </div>
                <div className="col-md-5 houseDiv">
                    <div className="houseImg">
                        <Image
                        src = "/Assets/images/Home-page/CTA-banner.jpg-industry-image.png"
                        // width={100}
                        // height={100}
                        // layout="responsive"
                        // objectFit="cover"
                        fill
                        alt="houseware banner"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Houseware
