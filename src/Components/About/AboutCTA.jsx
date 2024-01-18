import "../../styles/about.css";

function AboutCTA() {
  return (
    <section className="about_section my-5">
      <div class="container cta">
        <h2 class="row1">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod.
        </h2>
        <p class="row2">
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
        <div class="row row3 ">
          <div class="col-md-4 about_icons">
            <img src="assets/images/aboutIcons/location.png" alt="Experienced" />
            <div class="about_text">
              <h5>50+</h5>
              <p>Experienced Stores</p> 
              <p>across India</p>
            </div>
          </div>
          <div class="col-md-4 about_icons">
            <img src="assets/images/aboutIcons/shipped.png" alt="Experienced" />
            <div class="about_text">
              <h5>350+</h5>
              <p>Delivery Centres</p>
              <p>Across India</p>
            </div>
          </div>
          <div class="col-md-4 about_icons">
            <img src="assets/images/aboutIcons/reputation.png" alt="Experienced" />
            <div class="about_text">
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
