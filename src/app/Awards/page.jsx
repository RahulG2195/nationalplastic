import React from 'react';
import AwardsCertificates from "@/Components/About/AwardsCertificates";
import ComapnyProfileSidebar from '@/Components/About/ComapnyProfileSidebar';

const CERTIFICATES = [
  {
    key: "plexconcil-2006-07",
    image: "/Assets/images/certificates/PLEXCONCIL-Award-2006-07.jpg",
    alt: "PLEXCONCIL Award 2006-07"
  },
  {
    key: "plexconcil-2008-09",
    image: "/Assets/images/certificates/PLEXCONCIL-Award-2008-09.jpg",
    alt: "PLEXCONCIL Award 2008-09"
  },
  {
    key: "plexconcil-2014-15",
    image: "/Assets/images/certificates/PLEXCONCIL-Award-2014-15.jpg",
    alt: "PLEXCONCIL Award 2014-15"
  },
  {
    key: "plexconcil-trophy-2014-17",
    image: "/Assets/images/certificates/PLEXCONCIL-Trophy-2014-15-16-17.jpg",
    alt: "PLEXCONCIL Trophy 2014-15-16-17"
  },
];

const Awards = () => {
  return (
    <section className="awards-certificates">
      <div className="container mt-4 mb-4">
        <header className="text-center mb-5">
          <h1 className="fs-1 darkBlue fw-normal">
            Awards & <span className="fw-bold text-danger">Certificates</span>
          </h1>
          <p className="mt-1 fw-medium subCptRes w-70 certificate-para">
            National has been awarded as the number one exporter in the
            Plastic Furniture category by The Plastics Export Promotion
            Council (popularly known as PLEXCONCIL) sponsored by the Ministry
            of Commerce & Industry, Department of Commerce, Government of
            India. National is also accredited as a One Star Export House, the
            most distinguished title by the Ministry of Commerce & Industry,
            Directorate General of Foreign Trade, Government of India.
          </p>
        </header>

        <div className="row gap-4 team-members">
          <div className='row col-12 col-md-8 order-2 order-md-1 order-lg-1' >
            {CERTIFICATES.map(({ key, image, alt }) => (
              <div className="col-md-6" key={key}>
                <AwardsCertificates image={image} alt={alt} />
              </div>
            ))}
          </div>
          <div className='col-12 col-md-4 order-1 order-md-2 order-lg-2'>
            <ComapnyProfileSidebar title={'Awards & Certificates'}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;