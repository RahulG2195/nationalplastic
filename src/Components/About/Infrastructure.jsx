import "../../styles/about.css";
import Image from "next/image";

function Infrastructure() {
  return (
    <div className="container py-5">
      <div className="text-center mb-md-5 py-md-5 py-2">
        <div className="fs-1 darkBlue fw-normal">
          Infra<span className="fs-1 fw-bold text-danger">structure</span>{" "}
        </div>
        <div className="mt-1 fw-medium subCptRes w-50">
          <p>
          National Plastic Industries operates three production units across India, utilizing cutting-edge machinery and robotic systems in Silvassa and Patna for manufacturing plastic molded furniture and household products, while in Nellore, a new product line of PVC Flooring Mats, branded as INSTA, has been initiated.
          </p>
        </div>
      </div>
      <div className="row infrastructure-row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="india-map-image float-end">
            <Image
              src="/Assets/images/aboutIcons/map-image.png"
              className="img-fluid d-block w-70"
              alt="map image"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-xs-8 india-map-text float-start w-20">
          {/* <h2 className="fs-1 py-0">Lorem ipsum</h2> */}
          <p className="fs-6 fw-semibold infraTextrsp ">
          In Silvassa and Patna - National has employed the use of state of the art machinery, equipment and robotic systems. In these two factories the manufacturing of plastic molded furniture and household products are taking place.
          </p>
          <p className="fs-6 fw-semibold infraTextrsp ">
          In the Nellore plant - National has started a new product line - PVC Flooring Mats - which is under a different brand name called - "INSTA."
          </p>
          {/* <button className="btntextInfra py-3 px-md-5">
            EXPLORE OUR LOCATIONS
          </button> */}
        </div>
      </div>
    </div>
  );
}
export default Infrastructure;
