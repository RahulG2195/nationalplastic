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
                        src = "/Assets/images/Home-page/Catalouge.jpg" 
                        // width={100}
                        // height={100}
                        // layout="responsive"
                        // objectFit="cover"
                        fill
                        alt="Catalogue banner"
                        />
                    </div>
                </div>
                <div className="col-md-6 catalogueConntentDiv spacing-catalogue ms-4">

                    <h2 className="fs-1 fw-bold mt-5 mb-3">Catalogue</h2>
                    <p className="fw-bold">Explore our comprehensive catalogue for a wide range of durable and versatile plastic products designed to meet your everyday needs.</p>
                    <div className="Catasec">
                        <Link href='/Catalogue' className="catalogue-know-more">
                            <button className="btn view_btn py-2 px-3 fs-5">View More</button>
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
  )
}

export default Catalogue
