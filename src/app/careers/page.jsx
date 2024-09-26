// import React from "react";
import Opening from "../../Components/Career/Opening";
import Banner from "../../Components/Career/Banner";
import Registration from "../../Components/Career/Registration";
import Hiring from "@/Components/Career/Hiring";

export const metadata = {
  title: 'Careers | National Plastic Industries Ltd',
  description: 'Explore exciting career opportunities at National Plastic Industries Ltd. Join our team in Mumbai and be part of a leading plastic manufacturer since 1952.',
  keywords: ['careers', 'jobs', 'National Plastic Industries Ltd', 'plastic manufacturing jobs', 'Mumbai careers', 'manufacturing jobs'],
};

const Career = () => {
  return (
    <>
      <Banner />
      <Opening />
      <Registration />
      <Hiring />
    </>
  );
};
export default Career;
