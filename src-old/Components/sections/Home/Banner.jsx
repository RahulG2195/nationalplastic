import Image from "next/image";

function Banner() {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Image
            src="/assets/images/banner/Header-banner-websize.png"
            classname="img-fluid d-block w-100"
            alt="ome banner 1"
            width={100}
            height={80}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/assets/images/banner/Header-banner-websize.png"
            classname="img-fluid d-block w-100"
            alt="ome banner 2"
            width={100}
            height={80}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/assets/images/banner/Header-banner-websize.png"
            classname="img-fluid d-block w-100"
            alt="ome banner 3"
            width={100}
            height={70}
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Banner;
