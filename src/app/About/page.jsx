// YourPage.js
// import AboutCTA from './AboutCTA';
import AboutCTA from "@/Components/About/AboutCTA";
import AboutSlider from "@/Components/About/AboutSlider";
import Subbanner from "@/Components/About/Subbanner";
import VMCard from "@/Components/About/VMCard";
import Infrastructure from "@/Components/About/Infrastructure";
import Team from "@/Components/About/team";
import AwardsCertificates from "@/Components/About/AwardsCertificates";

function About() {

  // Array for misson vission
  const arr = [
    {
      key: 1,
      title: "Vision",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
    {
      key: 2,
      title: "Mission",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
  ];
// Array for misson vission end
// Array for team members
  const imgarr = [
    {
      key: 1,
      image: "/assets/images/team/user.png",
      name: "Name1",
      desig: "ipsum dolor1",
    },
    {
      key: 2,
      image: "/assets/images/team/user.png",
      name: "Name2",
      desig: "ipsum dolor2",
    },
    {
      key: 3,
      image: "/assets/images/team/user.png",
      name: "Name3",
      desig: "ipsum dolor3",
    },
    {
      key: 4,
      image: "/assets/images/team/user.png",
      name: "Name4",
      desig: "ipsum dolor4",
    },
  ];
  // Array for team members end

  // Array for Awards & Certificates
  const certificatesarr = [
    {
      key: 1,
      image: "/assets/images/team/user.png", 
    },
    {
      key: 2,
      image: "/assets/images/team/user.png",
    },
    {
      key: 3,
      image: "/assets/images/team/user.png",
    },
    {
      key: 4,
      image: "/assets/images/team/user.png",
    },
  ];
  // Array for Awards & Certificatesend

  return (
    <>
      <Subbanner />
      <AboutSlider />
      <AboutCTA />
      {/* Vission and Mission start */}
      <div className="container">
        <div class="row">
          {arr.map((val) => (
            <div class="col-md-6" key={val.key}>
              {" "}
              <VMCard title={val.title} description={val.desc} />
            </div>
          ))}
          {/* <div class="col-md-6"> <VMCard  title={titleValue} description={descriptionValue}/> </div> */}
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
          <h3>Board Of Directors</h3>
        </div>
        <div class="row team-members">
          {imgarr.map((val) => (
            <div class="col" key={val.key}>
              {" "}
              <Team image={val.image} name={val.name} disignation={val.desig} />
            </div>
          ))}
        </div>
        <div class="row team-members">
          {imgarr.map((val) => (
            <div class="col" key={val.key}>
              {" "}
              <Team image={val.image} name={val.name} disignation={val.desig} />
            </div>
          ))}
        </div>
        {/* Board Of Directors end */}
        {/* Managing Committee start */}
        <div className="row section_header team-header">
          <h3>Managing Committee</h3>
        </div>
        <div class="row team-members">
          {imgarr.map((val) => (
            <div class="col-3" key={val.key}>
              {" "}
              <Team image={val.image} name={val.name} disignation={val.desig} />
            </div>
          ))}
        </div>
        <div class="row team-members">
          {imgarr.map((val) => (
            <div class="col" key={val.key}>
              {" "}
              <Team image={val.image} name={val.name} disignation={val.desig} />
            </div>
          ))}
        </div>
        {/* Managing Committee end */}
      </div>
      {/* Team end */}
      {/* Awards & Certificates start */}

      {/* Awards & Certificates end */}
      <div className="container">
      <div className="row section_header">
        <h2> Awards & <span>Certificates</span>
        </h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
      </div>
      <div class="row team-members">
          {certificatesarr.map((val) => (
            <div class="col-3" key={val.key}>
              {" "}
              <AwardsCertificates image={val.image}/>
            </div>
          ))}
        </div>
        <div class="row team-members">
          {certificatesarr.map((val) => (
            <div class="col-3" key={val.key}>
              {" "}
              <AwardsCertificates image={val.image}/>
            </div>
          ))}
        </div>
      
    </div>
    </>
  );
}

export default About;
