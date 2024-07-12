import AboutCTA from "@/Components/About/AboutCTA";
import Subbanner from "@/Components/About/Subbanner";
import VMCard from "@/Components/About/VMCard";
import Infrastructure from "@/Components/About/Infrastructure";
import Team from "@/Components/About/team";
import AwardsCertificates from "@/Components/About/AwardsCertificates";
import SliderCard from "@/Components/About/SliderCard";
import Header from "@/Components/layouts/Header";
import Footer from "@/Components/layouts/Footer";

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
  // Array for team members
  const imgarr = [
    {
      key: 1,
      image: "/Assets/images/client_images/Mr-Paresh-V-Parekh.jpg",
      name: "Mr. Paresh V Parekh : Managing Director",
      desig:
        "Mr. Paresh Vinod Parekh has graduated from NM College with a degree in Bachelor of Commerce (BCOM). He then went on to pursue his masters from Dowling College in the United States. Using his expertise from his educational field he successfully applied his knowledge work-wise and currently has over 30+ years of experience at National. Through his guidance in the exports and finance division of the company - National has soared to great heights by becoming the #1 exporter in India. Further, he was the President of the OPPI from 2012-2014 and is a member of the PlastIndia Managing Committee.",
    },
    {
      key: 2,
      image: "/Assets/images/client_images/Mr-Ketan-V-Parekh.jpg",
      name: "Mr. Ketan V Parekh - Joint Managing Director",
      desig:
        "Mr. Ketan Vinod Parekh has graduated from Dowling College in the United States with a degree in Business Administration. He has been instrumental in helping National Plastic grow for the past 30 years. His role as the head of product development has been extremely fruitful as National started with their successful cooler and fans division. Besides this, his production management techniques based on the Japanese Kaizen philosophy is reflected in our factories as one can see a standard of continuous improvement. Under his guidance, he set up the ERP management system for the company helping processes become streamlined.",
    },
    {
      key: 3,
      image: "/Assets/images/client_images/Mr-Harsh-Parekh.jpg",
      name: "Mr. Harsh Parekh - Whole Time Director",
      desig:
        "Mr. Harsh Paresh Parekh graduated with a degree in B.sc and holds a Masters in Global Management from Regents College, UK. He has been associated with the company for the past 10 years. He has covered various positions in the company including Marketing Advisor and Chief Financial Officer of the Company. He has been handling the business operations of the Nellore unit of the Company since the past five years. He was instrumental in the setting up the Nellore division which deals in plastic flooring products and has a pan India presence. Prior to starting his career at National Plastic Industries Limited, he has been associated as an intern with companies like Parle Agro and Keter (Israel) and has acquired practical experience in the area of Marketing and Product development",
    },
    {
      key: 4,
      image: "/Assets/images/user.png",
      name: "Mrs. Ranganayaki Rangachari – Independent Director",
      desig:
        "Mrs. Ranganayaki Rangachari have reach education background and she is Bachelor of Commerce, Chartered Accountants, Company Secretary, Cost and Management Accountants. She has vast and varied experience of more than 20 years as working India and China in diverse sectors of Retail, Offshore survey, Shipping, Private Equity and Print media in corporate like Oswal Group, RPG Foodworld, Elcome Group of Companies, General Atlantic Partners, ILX Media Group and EGS group. She is currently in Practice as a Partner in Ritu Ranganayaki & Co., Chartered Accountants in Navi Mumbai specialising in areas of FEMA , GST and Valuation and IP consultancy.",
    },
    {
      key: 5,
      image: "/Assets/images/user.png",
      name: "Mr. Mishaal Ketan Parekh - Executive Director",
      desig:
        "Mr. Mishaal Parekh is Bachelor of Science in Industrial Systems Engineering from University of Southern California, Los Angeles, California. He has expertise in Lean Operations, Systems Analysis, Six Sigma, Statistical Quality Control, Project Management, Human Factors Analysis, Supply Chain Design, Facilities Design, NX, Solid Works, Auto CAD, Arena Simulation, MATLAB, House of Quality, Injection Molding, MS Project, Asana. He was also associated with the Company as Design and Quality Engineer, in this profile he worked and led and executed market research with cross-functional team consisting of members R&D department, Marketing, and Manufacturing, on the attractiveness of the bathroom fitting industry.",
    },
    {
      key: 6,
      image: "/Assets/images/user.png",
      name: "Mr. D. Purnachandra Rao - Independent Director",
      desig:
        "Mr. D. Purnachandra Rao has more than 40 years of experience in the Banking industry. He was associated with Corporation Bank. He retired from Corporation Bank as General Manager. He has also done CAIIB from Indian Institute of Bankers. During his tenure in the Bank, he has been awarded with about 15 awards which includes Best Branch award, Chairman’s Club (6 times), Super Ordinate Goal Achiever (4 times), Productivity Linked Incentive award etc.",
    },

    {
      key: 7,
      image: "/Assets/images/user.png",
      name: "Mr. Vipul Desai - Independent Director",
      desig:
        "Mr. Vipul A. Desai is B.COM(HONS), LLB, FCS, ACMA, HON. ACIA (FLORIDA, USA) and a mature strategist, economist, fiscal and governance professional and he has served with fair success in progressive roles from finance manager & company secretary to president-corporate affairs & biz development in corporate for more than 30+ years.",
    },

    {
      key: 8,
      image: "/Assets/images/user.png",
      name: "Mr. D. Purnachandra Rao - Independent Director",
      desig:
        "Mr. D. Purnachandra Rao has more than 40 years of experience in the Banking industry. He was associated with Corporation Bank. He retired from Corporation Bank as General Manager. He has also done CAIIB from Indian Institute of Bankers. During his tenure in the Bank, he has been awarded with about 15 awards which includes Best Branch award, Chairman’s Club (6 times), Super Ordinate Goal Achiever (4 times), Productivity Linked Incentive award etc.",
    },
  ];
  // Array for team members end

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
    <Header/>
      <Subbanner img='/Assets/images/banner/About-Us-banner-V2.jpg' alt='about banner' height='80'/>
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
      <div className="container">
        {/* Board Of Directors start */}
        <div className="row section_header team-header">
          <h2>Team</h2>
          <h3>PROMOTERS/DIRECTORS</h3>
        </div>


        <div className="row team-members">
          {imgarr.map((val, index) => (
            <div
              className="col-xl-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6"
              key={val.key}>
              <div className="team-members-container">
                <div
                  className={`row team-member ${
                    index % 2 === 0 ? "left-image" : "right-image"
                  }`}>
                  <div
                    className={`col-md-4 ${
                      index % 2 === 0 ? "order-1" : "order-2"
                    }`}>
                    <Team
                      image={val.image}
                      // name={val.name}
                      // designation={val.desig}
                    />
                  </div>
                  <div
                    className={`col-md-8 ${
                      index % 2 === 0 ? "order-2" : "order-1"
                    }`}>
                    <div className="team-detail">
                      <h3 className="team-title">{val.name}</h3>
                      <p>{val.desig}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
      <Footer/>

    </>
  );
}

export default About;
