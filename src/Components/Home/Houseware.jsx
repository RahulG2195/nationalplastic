import Image from "next/image"
import Link from "next/link"

function Houseware() {
  return (
    <section className="houseware_sec common_section">
        <div className="container-fluid"data-aos="fade-up">
            <div className="row">
                <div className="col-md-6 houseConntentDiv" data-aos="zoom-in">
                    <h2>National Plastic for <span>Houseware</span></h2>
                    <p>Legacy Since 1952</p>
                    <div className="knowmoresec">
                        <Link href='' className="house-know-more">
                            Know More
                        </Link>
                        <Link href='' className="house-know-more">
                            Bulk Order
                        </Link> 
                    </div>
                </div>
                <div className="col-md-6 houseDiv"data-aos="zoom-in">
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
