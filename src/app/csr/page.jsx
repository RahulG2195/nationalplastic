import React from "react";
import Banner from "../../Components/CSR/Banner";
import HealthCare from "../../Components/CSR/HealthCare";
import Slider from "../../Components/CSR/Slider";
import EnvironmentalConservation from "../../Components/CSR/EnvironmentalConservation";
import CSRCommittee from "../../Components/CSR/Csrcommitte.jsx";
import PDFViewerComponent  from "../../Components/CSR/PDFViewerComponent.jsx";


const CSR = () => {
  return (
    <>
      <Banner />
      <CSRCommittee />
      <PDFViewerComponent />

      <HealthCare />
      <Slider />
      <EnvironmentalConservation />
    </>
  );
};
export default CSR;
