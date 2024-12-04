"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function Banner() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  // Store current active index for carousel
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width } = windowSize;
  const isMobile = width <= 768; // Assuming mobile screens are <= 768px

  // Define image sources for desktop and mobile
  const desktopImages = [
    "/Assets/images/banner/Header-banner-websize.jpg",
    "/Assets/images/banner/Header-banner-websize.jpg",
    "/Assets/images/banner/Header-banner-websize.jpg",
    "/Assets/images/banner/Header-banner-websize.jpg",
  ];

  const mobileImages = [
    "/Assets/images/banner/mobile_banner.jpg",
    "/Assets/images/banner/mobile_banner.jpg",
    "/Assets/images/banner/mobile_banner.jpg",
  ];

  const images = isMobile ? mobileImages : desktopImages;

  // Handle carousel item change
  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      {/* Desktop Carousel */}
      <div
        id="carouselExampleControls"
        className="carousel slide desktop_banner"
        data-bs-ride="carousel"
        data-bs-interval="10000" // Adjust this value for slower autoplay (10000 = 10 seconds)
      >
        <div className="carousel-inner">
          {images.map((src, index) => (
            <div
              key={index}
              className={`carousel-item ${activeIndex === index ? "active" : ""}`}
            >
              <Image
                src={src}
                className="img-fluid d-block w-100"
                alt={`Banner ${index + 1}`}
                width={100}
                height={80}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          ))}
        </div>

        {/* Pagination (Dots) */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel-indicator ${activeIndex === index ? "active" : ""}`}
              data-bs-target="#carouselExampleControls"
              data-bs-slide-to={index}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>

        {/* Carousel Controls */}
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
          <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Mobile Carousel */}
      <div
        id="carouselExampleControlsMobile"
        className="carousel slide mobile_banner"
        data-bs-ride="carousel"
        data-bs-interval="10000" // Same here for mobile
      >
        <div className="carousel-inner">
          {images.map((src, index) => (
            <div
              key={index}
              className={`carousel-item ${activeIndex === index ? "active" : ""}`}
            >
              <img
                src={src}
                className="img-fluid d-block mob_banner"
                alt={`Mobile Banner ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Pagination (Dots) */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel-indicator ${activeIndex === index ? "active" : ""}`}
              data-bs-target="#carouselExampleControlsMobile"
              data-bs-slide-to={index}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControlsMobile"
          data-bs-slide="prev"
        >
          <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControlsMobile"
          data-bs-slide="next"
        >
          <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Banner;
