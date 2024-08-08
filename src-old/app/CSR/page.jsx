import React from "react";
import Banner from "../../Components/CSR/Banner";
import HealthCare from "../../Components/CSR/HealthCare";
import Slider from "../../Components/CSR/Slider";
import EnvironmentalConservation from "../../Components/CSR/EnvironmentalConservation";
import LinkedinPosts from "../../Components/CSR/LinkedinPosts.jsx";

const CSR = () => {
  return (
    <>
      <Banner />
      <HealthCare />
      <Slider />
      <EnvironmentalConservation />
      {/* <LinkedinPosts/> */}
    </>
  );
};
export default CSR;
