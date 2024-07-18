import React from 'react'
import Team from "@/Components/About/team";
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
      image: "/Assets/images/client_images/Mrs. Ranganayaki Rangachari.png",
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
      image: "/Assets/images/client_images/Mr. Vipul A. Desai.jpg",
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

const Promoters = () => {
  return (
    <>
        <div className="container py-5" id="managementBoardCommittees">
        {/* Board Of Directors start */}
        <div className="row section_header team-header">
          <h2>Team</h2>
          <h3 className='text-danger'>PROMOTERS/DIRECTORS</h3>
        </div>


        <div className="row team-members">
          {imgarr.map((val, index) => (
            <div
              // className="col-xl-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6"
              className="col-12"
              key={val.key}>
              <div className="team-members-container">
                <div
                  className={`row team-member align-items-center ${
                    index % 2 === 0 ? "left-image" : "right-image"
                  }`}>
                  <div
                  className={`col-md-4 ${index % 2 === 0 ? "order-md-1 order-xs-1" : "order-md-2 order-xs-2"}`}
>
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
        
      </div>
    </>
  )
}

export default Promoters