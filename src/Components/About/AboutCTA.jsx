import "swiper/swiper-bundle.css";
import "../../styles/about.css";

function AboutCTA() {
  return (
    <section className="container px-md-5 about_section my-5 w-75 position-relative">
      <div className="container cta py-3 px-md-5">
        <h3 className="row1 fw-bold my-3 ctatitle">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod.
        </h3>
        <p className="row2 medium text-secondary-2">
        National Plastic started its production in a humble manner in 1952, operating from a 500 sq.ft. premises, manufacturing plastic buttons for shirts. It then took a quantum leap in 1994, commencing commercial production of Molded Furniture. Since then, National Plastic Industries Ltd. has gone from strength to strength. Over the years, National developed into a market leader in homeware products through continuous innovation and a nuanced understanding of the Indian consumer. Soon, National became India's leading manufacturer of homeware products and the largest exporter of plastic furniture in India.
        </p>
        <div className="d-flex justify-content-evenly flex-wrap py-5 gap-4">
          <div className="about_icons">
            <img src="Assets/images/aboutIcons/location.png" alt="Experienced" />
            <div className="about_text ">
              <h5>50+</h5>
              <p>Experienced Stores</p> 
              <p>across India</p>
            </div>
          </div>
          <div className=" about_icons">
            <img src="Assets/images/aboutIcons/shipped.png" alt="Experienced" />
            <div className="about_text">
              <h5>350+</h5>
              <p>Delivery Centres</p>
              <p>Across India</p>
            </div>
          </div>
          <div className=" about_icons">
            <img src="Assets/images/aboutIcons/reputation.png" alt="Experienced" />
            <div className="about_text">
              <h5>20lack</h5>
              <p>Satisfied</p>
              <p>Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;
