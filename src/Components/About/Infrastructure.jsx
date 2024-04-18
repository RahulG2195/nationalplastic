import "../../styles/about.css";
import Image from "next/image";

function Infrastructure() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5 py-5">
        <div className="fs-1 darkBlue fw-normal">
          Infra<span className="fs-1 fw-bold text-danger">structure</span>{" "}
        </div>
        <div className="mt-1 fw-medium subCptRes w-50">
          <p>
            ILorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s,
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
          <h2 className="fs-1 py-0">Lorem ipsum</h2>
          <p className="fs-6 fw-semibold infraTextrsp ">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna.
          </p>
          <button className="btntextInfra py-3 px-md-5">
            EXPLORE OUR LOCATIONS
          </button>
        </div>
      </div>
    </div>
  );
}
export default Infrastructure;
