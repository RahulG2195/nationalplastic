import Image from "next/image";

const ShippingHeading = ({ bannerImage ,content }) => {
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

        <div className="main_container mt-5">
          <div className="text-center fw-bold">
            <div className="title2 fs-1">
              Shipping &<span className="fw-bold text-danger"> Delivery Policy</span>
            </div>
          </div>
          <div
            className="privacyText  mt-5 px-md-5 TCTxt"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </>
    );
  };
  
  export default ShippingHeading;
  