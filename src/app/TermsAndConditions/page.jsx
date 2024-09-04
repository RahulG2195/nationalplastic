"use client";
import TC from "../../Components/TC/TC";
import { useEffect, useState } from "react";
import axios from "axios";

const TermsAndConditions = () => {
  const [pageContents, setPageContents] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPageContent() {
      try {
        const response = await axios.get("/api/Termsandcondition?page=TermsAndConditions");
        if (response.status === 200 && response.data.results.length > 0) {
          const { content, banner_image } = response.data.results[0];
          setPageContents(content); // Extracting content
          setBannerImage(banner_image); // Extracting banner_image
        } else {
          setError("No content available.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPageContent();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <TC content={pageContents} bannerImage={bannerImage} />
    </>
  );
};

export default TermsAndConditions;
