import AboutCTA from "@/Components/About/AboutCTA";
import Subbanner from "@/Components/About/Subbanner";
import VMCard from "@/Components/About/VMCard";
import Infrastructure from "@/Components/About/Infrastructure";
import Team from "@/Components/About/team";
import AwardsCertificates from "@/Components/About/AwardsCertificates";
import SliderCard from "@/Components/About/SliderCard";
import Header from "@/Components/layouts/Header";
import Footer from "@/Components/layouts/Footer";
import Promoters from "@/Components/About/Promoters/Promoters";

function About() {
  // Array for misson vission

  // const arr2 = [
  //   {
  //     key: 1,
  //     image: "/Assets/images/user.png",
  //     name: "this is Dummy Title",
  //     desig:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //   },

  //   {
  //     key: 2,
  //     image: "/Assets/images/user.png",
  //     name: "this is Dummy Title",
  //     desig:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //   },
  // ];

  const arr = [
    {
      key: 1,
      title: "Vision",
      desc: "At National Plastic Industries Limited, we aim to build a more inclusive society by providing premium-quality products at the most affordable prices.",
    },
    {
      key: 2,
      title: "Mission",
      desc: "Our vision is to improve global accessibility to high-quality products, setting new standards in the plastic products industry and enhancing everyday living experiences for people worldwide.",
    },
  ];
  // Array for misson vission end


  // Array for Awards & Certificates
  const certificatesarr = [
    // {
    //   key: 1,
    //   image: "/Assets/images/user.png",
    // },
    {
      key: 2,
      image: "/Assets/images/certificates/PLEXCONCIL-Award-2006-07.jpg",
    },
    {
      key: 3,
      image: "/Assets/images/certificates/PLEXCONCIL-Award-2008-09.jpg",
    },
    {
      key: 4,
      image: "/Assets/images/certificates/PLEXCONCIL-Award-2014-15.jpg",
    },
    {
      key: 5,
      image: "/Assets/images/certificates/PLEXCONCIL-Trophy-2014-15-16-17.jpg",
    },
  ];
  // Array for Awards & Certificatesend


  return (
    <>
      <Header />
      <Subbanner img='/Assets/images/banner/About-Us-banner-V2.jpg' alt='about banner' height='80' />
      <div className="container about_container">
        <div className="row section_header">
          <h2>
            About<span> us</span>
          </h2>
        </div>
      </div>
      <div className="position-relative aboutsliderCont px-md-5">
        <div className=" h-100 position-absolute backblue "></div>
        <SliderCard />
        <AboutCTA />
      </div>
      {/* Vission and Mission start */}
      <div className="container p0  mx-auto">
        <div className="row px-md-5 mx-5 vmcont">
          {arr.map((val) => (
            <div className=" col-md-6" key={val.key}>
              {" "}
              <VMCard title={val.title} description={val.desc} />
            </div>
          ))}
        </div>
      </div>
      {/* Vission and Mission end */}

      {/*Infrastructure start  */}
      <Infrastructure />
      {/*Infrastructure end */}
      {/* Team start */}
      <div className="container" id="managementBoardCommittees">

        {/* Board Of Directors start */}

        <Promoters></Promoters>

       

        {/* Board Of Directors end */}

        {/* Managing Committee start */}
        {/* <div className="row section_header team-header">
          <h3>Managing Committee</h3>
        </div> */}
        {/* <div className="team-members-container">
          {arr2.map((val, index) => (
            <div
              key={index}
              className={`row team-member ${
                index % 2 === 0 ? "left-image" : "right-image"
              }`}>
              <div
                className={`col-md-3 ${
                  index % 2 === 0 ? "order-1" : "order-2"
                }`}>
                <Team image={val.image} name={val.name} />
              </div>
              <div
                className={`col-md-9 ${
                  index % 2 === 0 ? "order-2" : "order-1"
                }`}>
                <div className="team-detail">
                  <h3 className="team-title">{val.name}</h3>
                  <p>{val.desig}</p>
                </div>
              </div>
            </div>
          ))}
        </div> */}


      </div>
      {/* <div className="container" id="managementBoardCommittees">
        <div className="text-center mb-5 ">
          <div className="fs-1 darkBlue fw-normal">
            Awards & <span className="fw-bold text-danger">Certificates</span>{" "}
          </div>
          <div className="mt-1 fw-medium subCptRes w-70 certificate-para">
            <p>
              National has been awarded as the number one exporter in the
              Plastic Furniture category by The Plastics Export Promotion
              Council (popularly known as PLEXCONCIL) sponsored by the Ministry
              of Commerce & Industry, Department of Commerce, Government of
              India. National is also accredited as a One Star Export House, the
              most distinguished title by the Ministry of Commerce & Industry,
              Directorate General of Foreign Trade, Government of India.
            </p>
          </div>
        </div>
     
        <div className="row team-members">
          {certificatesarr.map((val) => (
            <div
              className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6"
              key={val.key}>
              {" "}
              <AwardsCertificates image={val.image} />
            </div>
          ))}
        </div>
      </div> */}
      <Footer />
    </>
  );
}

export default About;
