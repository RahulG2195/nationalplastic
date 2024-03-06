import Image from "next/image";

function Subbanner() {
  return (
    <section>
      <div className="about_slider">
        <div className="">
          <Image
            src="/Assets/images/banner/About-Us-banner.png"
            className="img-fluid d-block w-100"
            alt="ome banner 1"
            width={100}
            height={80}
            layout="responsive"
            objectFit="cover"
          />
        </div>

      </div>
    </section>
  );
}

export default Subbanner;
