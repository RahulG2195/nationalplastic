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
                        <Link href='/company-profile' className="house-know-more text-white">
                            Know More
                        </Link>
                        <Link href='/contact-us' className="house-know-more text-white">
                        contact-us
                        </Link> 
                    </div>
                </div>
                <div className="col-md-5 houseDiv">
                    <div className="houseImg">
                        <Image
                        src = "/Assets/images/Home-page/NPIL.jpg"
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
