import AboutCTA from "@/Components/About/AboutCTA";
import Subbanner from "@/Components/About/Subbanner";
import VMCard from "@/Components/About/VMCard";
import Infrastructure from "@/Components/About/Infrastructure";
import Team from "@/Components/About/team";
import AwardsCertificates from "@/Components/About/AwardsCertificates";
import SliderCard from "@/Components/About/SliderCard";

function Awards() {
  // Array for misson vission


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
        <div className="container mt-4 mb-4">
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
      </div>
    </>
  );
}

export default Awards;
