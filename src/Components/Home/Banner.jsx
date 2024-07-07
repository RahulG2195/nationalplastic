import Image from "next/image";
import { useEffect, useState } from "react";

function Banner() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width } = windowSize;

  return (
    <>
    <div
      id="carouselExampleControls"
      className="carousel slide desktop_banner"
      data-bs-ride="carousel">
      
      <div className="carousel-inner ">

        <div className="carousel-item active">

          <Image
            src={`/Assets/images/banner/Header-banner-websize.webp`}
            className="img-fluid d-block w-100"
            alt="ome banner 1"
            width={100}
            height={80}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="carousel-item">
          <Image
            src={`/Assets/images/banner/Header-banner-websize.webp`}
            className="img-fluid d-block w-100"
            alt="ome banner 2"
            width={100}
            height={80}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="carousel-item">
          <Image
            src={`/Assets/images/banner/Header-banner-websize.webp`}
            className="img-fluid d-block w-100"
            alt="ome banner 3"
            width={100}
            height={70}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="carousel-item">
          <Image
            src={`/Assets/images/banner/Header-banner-websize.webp`}
            className="img-fluid d-block w-100"
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
        <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        {/* <span className="carousel-control-next-icon" aria-hidden="true" /> */}
        <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    <div
      id="carouselExampleControls"
      className="carousel slide mobile_banner"
      data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={`/Assets/images/banner/mobile_banner.jpg`}
            className="img-fluid d-block mob_banner"
            alt="ome banner 1"/>
        </div>
        <div className="carousel-item">
          <img src={`/Assets/images/banner/mobile_banner.jpg`}
            className="img-fluid d-block mob_banner"
            alt="ome banner 1"/>
        </div>
        <div className="carousel-item">
          <img src={`/Assets/images/banner/mobile_banner.jpg`}
            className="img-fluid d-block mob_banner"
            alt="ome banner 1"/>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        {/* <span className="carousel-control-next-icon" aria-hidden="true" /> */}
        <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </>
  );
}

export default Banner;
