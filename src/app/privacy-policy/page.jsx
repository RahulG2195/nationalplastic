
"use client";
import Privacy from "../../Components/PrivacyAndPolicy/Privacy";
import { useEffect, useState } from "react";
import axios from "axios";

const PrivacyAndPolicy = () => {
  const [pageContents, setPageContents] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPageContent() {
      try {
        const response = await axios.get("/api/Termsandcondition?page=PrivacyAndPolicy");
        if (response.status === 200 && response.data.results.length > 0) {
          const { content, banner_image } = response.data.results[0];
          setPageContents(content);
          setBannerImage(banner_image);
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
      <Privacy content={pageContents} bannerImage={bannerImage} />
    </>
  );
};

export default PrivacyAndPolicy;
