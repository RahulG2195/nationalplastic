import Image from "next/image";

const Privacy = ({ bannerImage, content }) => {

  return (
    <>
      <Image
        src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${bannerImage}`}
        width={100}
        height={80}
        layout="responsive"
        objectFit="cover"
        alt="Privacy Policy Banner"
      />

<div className="text-center fw-bold my-5">
        <div className=" title2 fs-1 ">Privacy & <span className="fw-bold text-danger"> Policy</span> </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div 
            className="prose prose-lg max-w-none font-semibold"
            dangerouslySetInnerHTML={{ __html: content }}
          />
      </div>
    </>
  );
};

export default Privacy;
