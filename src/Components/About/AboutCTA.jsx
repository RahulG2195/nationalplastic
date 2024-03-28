import "swiper/swiper-bundle.css";
import "../../styles/about.css";

function AboutCTA() {
  return (
    <section className="container px-5 about_section my-5 w-75 position-relative">
      <div className="container cta py-3 px-5">
        <h3 className="row1 fw-bold my-3 ctatitle">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod.
        </h3>
        <p className="row2 medium text-secondary-2">
          ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
          diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
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
