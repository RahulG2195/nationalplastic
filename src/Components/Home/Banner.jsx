"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
function Banner() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  const [heroSections, setHeroSections] = useState([]);

  // Store current active index for carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);

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
  // const desktopImages = [
  //   "/Assets/images/banner/Header-banner-websize.jpg",
  //   "/Assets/images/banner/Header-banner-websize.jpg",
  //   "/Assets/images/banner/Header-banner-websize.jpg",
  //   "/Assets/images/banner/Header-banner-websize.jpg",
  // ];

  // const mobileImages = [
  //   "/Assets/images/banner/mobile_banner.jpg",
  //   "/Assets/images/banner/mobile_banner.jpg",
  //   "/Assets/images/banner/mobile_banner.jpg",
  // ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/adminHomePage/heroSections`);
        const data = response.data.allHeroSections || [];
  
        setHeroSections(data);
        const desktopImgs = data.map(section => `/${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${section.image_name}`);
        const mobileImgs = data.map(section => `/${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${section.mobile_image_name}`);
        console.log("Fetched Hero Sections:", data);
        console.log("Desktop Images:", desktopImgs);
        console.log("Mobile Images:", mobileImgs);

        setDesktopImages(desktopImgs);
        setMobileImages(mobileImgs);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
  
    fetchImages();
  }, []);
  


  const images = isMobile ? mobileImages : desktopImages;

  // Handle carousel item change
  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
{images.length > 0 && (
  <div
    id={isMobile ? "carouselExampleControlsMobile" : "carouselExampleControls"}
    className={`carousel slide ${isMobile ? "mobile_banner" : "desktop_banner"}`}
    data-bs-ride="carousel"
    data-bs-interval="10000"
  >
    <div className="carousel-inner">
      {images.map((src, index) => (
        <div
          key={index}
          className={`carousel-item ${activeIndex === index ? "active" : ""}`}
        >
          {isMobile ? (
            <img
              src={src}
              className="img-fluid d-block mob_banner"
              alt={`Mobile Banner ${index + 1}`}
            />
          ) : (
            <Image
              src={src}
              className="img-fluid d-block w-100"
              alt={`Banner ${index + 1}`}
              width={100}
              height={80}
              layout="responsive"
              objectFit="cover"
            />
          )}
        </div>
      ))}
    </div>

    {/* Indicators */}
    <div className="carousel-indicators">
      {images.map((_, index) => (
        <button
          key={index}
          type="button"
          className={`carousel-indicator ${activeIndex === index ? "active" : ""}`}
          data-bs-target={`#${isMobile ? "carouselExampleControlsMobile" : "carouselExampleControls"}`}
          data-bs-slide-to={index}
          aria-label={`Slide ${index + 1}`}
          onClick={() => handleSelect(index)}
        />
      ))}
    </div>

    {/* Controls */}
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target={`#${isMobile ? "carouselExampleControlsMobile" : "carouselExampleControls"}`}
      data-bs-slide="prev"
    >
      <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target={`#${isMobile ? "carouselExampleControlsMobile" : "carouselExampleControls"}`}
      data-bs-slide="next"
    >
      <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
)}

    </>
  );
}

export default Banner;
