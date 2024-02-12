import Image from "next/image"
import Link from "next/link"

function Catalogue() {
  return (
    <section className="catalogue_sec">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-5 houseDiv">
                    <div className="cataImg">
                        <Image
                        src = "/assets/images/HomepageImages/Catalouge.jpg"
                        data-aos="fade-right"
                        // width={100}
                        // height={100}
                        // layout="responsive"
                        // objectFit="cover"
                        fill
                        alt="Catalogue banner"
                        />
                    </div>
                </div>
                <div className="col-md-7 catalogueConntentDiv" data-aos="fade-left">
                    <h2>Catalogue</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className="Catasec">
                        <Link href='/Catalogue' className="catalogue-know-more">
                            <button className="btn view_btn">View More</button>
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
  )
}

export default Catalogue
