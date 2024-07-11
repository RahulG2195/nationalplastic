import Image from "next/image";

function Subbanner({img, alt, height}) {
  return (
    <section>
      <div className="about_slider">
        <div className="">
          <Image
            src={img}
            className="img-fluid d-block w-100 banner"
            alt={alt}
            width={100}
            height={height}
            layout="responsive"
            objectFit="contain"
          />
        </div>

      </div>
    </section>
  );
}

export default Subbanner;
