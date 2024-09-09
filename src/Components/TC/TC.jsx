import Image from "next/image";
import Link from "next/link";

const TC = ({ bannerImage, content }) => {
  return (
    <>
      <Image
        src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${bannerImage}`}
        width={100}
        height={80}
        layout="responsive"
        objectFit="cover"
        alt="Terms and Conditions Banner"
      />

      <div className="text-center fw-bold my-5">
        <div className=" title2 fs-1 ">Terms & <span className="fw-bold text-danger"> Conditions</span> </div>
      </div>

      <div
        className="px-md-5 fw-semibold TCTxt spacing"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default TC;
