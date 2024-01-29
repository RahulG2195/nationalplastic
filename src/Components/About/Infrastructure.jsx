import "../../styles/about.css";
import Image from "next/image";

function Infrastructure() {
  return (
    <div className="container">
      <div className="row section_header">
        <h2>
          Infra<span>structure</span>
        </h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </p>
      </div>
      <div className="row infrastructure-row">
        <div className="col-md-6">
            <div className="india-map-image">
        <Image
            src="/assets/images/aboutIcons/map-image.png"
            classname="img-fluid d-block w-70"
            alt="map image"
            width={100}
            height={100}
            layout="responsive" 
            objectFit="cover"
          />
          <div class="india-map-image">
            <Image
              src="/assets/images/aboutIcons/map-image.png"
              classname="img-fluid d-block w-70"
              alt="map image"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="col-md-6 india-map-text">
          <h2>Lorem ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna.
          </p>
          <button>EXPLORE OUR LOCATIONS</button>
        </div>
      </div>
    </div>
    </div>
  );
}
export default Infrastructure;
