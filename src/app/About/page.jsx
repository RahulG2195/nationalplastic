
import AboutCTA from "@/components/About/AboutCTA";
import Subbanner from "@/components/About/Subbanner";
import VMCard from "@/components/About/VMCard";
import Infrastructure from "@/components/About/Infrastructure";
import Team from "@/components/About/team";
import AwardsCertificates from "@/components/About/AwardsCertificates";
import SliderCard from "@/components/About/SliderCard";

function About() {

  // Array for misson vission
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
  // Array for team members
  const imgarr = [
    {
      key: 1,
      image: "/Assets/images/user.png",
      name: "Name1",
      desig: "ipsum dolor1",
    },
    {
      key: 2,
      image: "/Assets/images/user.png",
      name: "Name2",
      desig: "ipsum dolor2",
    },
    {
      key: 3,
      image: "/Assets/images/user.png",
      name: "Name3",
      desig: "ipsum dolor3",
    },
    {
      key: 4,
      image: "/Assets/images/user.png",
      name: "Name4",
      desig: "ipsum dolor4",
    },
  ];
  // Array for team members end

  // Array for Awards & Certificates
  const certificatesarr = [
    {
      key: 1,
      image: "/Assets/images/user.png",
    },
    {
      key: 2,
      image: "/Assets/images/user.png",
    },
    {
      key: 3,
      image: "/Assets/images/user.png",
    },
    {
      key: 4,
      image: "/Assets/images/user.png",
    },
  ];
  // Array for Awards & Certificatesend

  return (
    <>
      <Subbanner />
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
          {/* <div className="col-md-6"> <VMCard  title={titleValue} description={descriptionValue}/> </div> */}
        </div>
      </div>
      {/* Vission and Mission end */}

      {/*Infrastructure start  */}
      <Infrastructure />
      {/*Infrastructure end */}
      {/* Team start */}
      <div className="container">
        {/* Board Of Directors start */}
        <div className="row section_header team-header">
          <h2>Team</h2>
          <h3>Board Of Directorss</h3>
        </div>
        <div className="row team-members">
          {imgarr.map((val) => (
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6" key={val.key}>
              <Team image={val.image} name={val.name} disignation={val.desig} />
            </div>
          ))}
        </div>
        <div className="row team-members">
        {imgarr.map((val) => (
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6" key={val.key}>
              <Team image={val.image} name={val.name} disignation={val.desig} />
            </div>
          ))}
        </div>
        {/* Board Of Directors end */}
        {/* Managing Committee start */}
        <div className="row section_header team-header">
          <h3>Managing Committee</h3>
        </div>
        <div className="row team-members">
        {imgarr.map((val) => (
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6" key={val.key}>
              <Team image={val.image} name={val.name} disignation={val.desig} />
            </div>
          ))}
        </div>
        <div className="row team-members">
        {imgarr.map((val) => (
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6" key={val.key}>
              <Team image={val.image} name={val.name} disignation={val.desig} />
            </div>
          ))}
        </div>
      </div>
      <div className="container">
      <div className="text-center mb-5 ">
            <div className="fs-1 darkBlue fw-normal">
              Awards & <span className="fw-bold text-danger">Certificates</span>{" "}
            </div>
            <div className="mt-1 fw-medium subCptRes w-50">
              <p>
              National has been awarded as the number one exporter in the Plastic Furniture category by The Plastics Export Promotion Council (popularly known as PLEXCONCIL) sponsored by the Ministry of Commerce & Industry, Department of Commerce, Government of India. National is also accredited as a One Star Export House, the most distinguished title by the Ministry of Commerce & Industry, Directorate General of Foreign Trade, Government of India.</p>
            </div>
          </div>
        <div className="row team-members">
          {certificatesarr.map((val) => (
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6" key={val.key}>
              {" "}
              <AwardsCertificates image={val.image} />
            </div>
          ))}
        </div>
        <div className="row team-members">
          {certificatesarr.map((val) => (
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6" key={val.key}>
            {" "}
            <AwardsCertificates image={val.image} />
          </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default About;