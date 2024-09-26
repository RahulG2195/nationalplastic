import Image from "next/image";
import "../../styles/productCatalogue.css";
import CatalogueCard from "@/Components/CatalogueCard/CatalogueCard";
export const metadata = {
  title: 'Product Catalogue | National Plastic Industries Ltd',
  description: 'Browse our comprehensive catalogue of quality plastic products including chairs, stools, and household items. Discover affordable solutions from National Plastic Industries Ltd.',
  keywords: ['product catalogue', 'plastic products', 'National Plastic Industries Ltd', 'plastic chairs', 'plastic stools', 'household items', 'Mumbai manufacturer'],
};
function Catalogue() {
    const Cataloguearr = [
        {
          key: 1,
          image: "/Assets/images/catalogue/Front Page-01.jpg",
          title: "Product Catalogue",
          desc: "Updated on 06 sep, 2024",
          pdf: '/Assets/images/catalogue/pdf/NPIL Product Catalogue.pdf',
        },
        {
          key: 2,
          image: "/Assets/images/catalogue/Office Chair Catalogue-01.jpg",
          title: "Office Chair Catalogue",
          desc: "Updated on 06 sep, 2024",
          pdf: '/Assets/images/catalogue/pdf/Office Chair Catalogue.pdf',
        },
        // {
        //   key: 3,
        //   image: "/Assets/images/catalogue/dummy.png",
        //   title: "Lorem ipsum",
        //   desc: "Updated on 10 oct, 2023",
        // },
        // {
        //   key: 4,
        //   image: "/Assets/images/catalogue/dummy.png",
        //   title: "Lorem ipsum",
        //   desc: "Updated on 10 oct, 2023",
        // },
      ];
  return (
    <>
      <div className="container">
        <div className="">
          <Image
            src="/Assets/uploads/Catalouge-page-banner-V2.jpg"
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
                      <i>{val.desc}</i>
                    </p>
                    <a href={val.pdf} target="_blank"><button className="catalogueButton">View Brochure</button></a>
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
