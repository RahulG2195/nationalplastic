import Image from 'next/image';

const AwardsCertificates = ({ image }) => {

  return (
    <div className="AwardsCertificatesImg">
            <Image
              src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}${image}`}
              className="img-fluid d-block w-100" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
              alt="Team Member"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
  );
};

export default AwardsCertificates;
