import Image from "next/image";
import "../../styles/productCatalogue.css";
import CatalogueCard from "@/Components/CatalogueCard/CatalogueCard";

function Catalogue() {
    const Cataloguearr = [
        {
          key: 1,
          image: "/Assets/images/catalogue/dummy.png",
          title: "Lorem ipsum",
          desc: "Updated on 10 oct, 2023",
        },
        {
          key: 2,
          image: "/Assets/images/catalogue/dummy.png",
          title: "Lorem ipsum",
          desc: "Updated on 10 oct, 2023",
        },
        {
          key: 3,
          image: "/Assets/images/catalogue/dummy.png",
          title: "Lorem ipsum",
          desc: "Updated on 10 oct, 2023",
        },
        {
          key: 4,
          image: "/Assets/images/catalogue/dummy.png",
          title: "Lorem ipsum",
          desc: "Updated on 10 oct, 2023",
        },
      ];
  return (
    <>
      <div className="container">
        <div className="">
          <Image
            src="/Assets/images/banner/Catalouge-page-banner.png"
            className="img-fluid d-block w-100"
            alt="ProdCatalouge image"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        {/* <div className="container"> */}
          <div className="row">
          {Cataloguearr.map((val) => (
            <div className="col-md-6" key={val.key}>
                {/* <CatalogueCard image={val.image} title={val.title} description={val.desc} /> */}
            {/* <div className="col-md-6"> */}
              <div className="productCatalogue">
                <div className="row">
                  <div className="col-md-4 productCatalogueImage">
                    <Image
                      src={val.image}
                      width={100}
                      height={100}
                      layout="responsive"
                      objectFit="cover"
                      alt='img'
                    />
                  </div>
                  <div className="col-md-8 productCatalogueData">
                    <h2>{val.title}</h2>
                    <p>
                      <i>Updated on 10 oct, 2023</i>
                    </p>
                    <button className="catalogueButton">View Brochure</button>
                  </div>
                </div>
              </div>

            </div> 
          ))}
          </div>
        </div>
    </>
  )}

export default Catalogue;
