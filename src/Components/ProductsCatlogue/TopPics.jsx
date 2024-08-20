"use client";
import TopPicsCard from "../TopPicsCard/TopPicsCard";
import { useEffect, useState } from "react";
import axios from "axios";

const TopPics = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Category`
        );

        setCategories(response.data.categories);
      } catch (error) {
        alert("Error fetching data", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <div className="main_container mt-5">
        <div className="text-center mt-5">
          <div className="fs-1 fw-bold text-danger">
            {" "}
            Top Pics <span className="darkBlue fw-normal">For you</span>{" "}
          </div>
          <div className="mt-1 fw-semibold subCptRes">
            <p>
              It is a long established fact that a reader will be distracted by
              the{" "}
            </p>{" "}
            <p>readable content of a page when looking at its layout.</p>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <div className="container text-center mt-5 d-flex justify-content-center">
            <div className="row">
              {categories.map((category) => (
                <div
                  key={category.category_id}
                  className="col-lg-2 col-sm-6 col-xs-12 col-md-4 my-4"
                >
                  <TopPicsCard
                    imgSrc={`/Assets/images/circular/${category.image_name}`}
                    imgtext={category.category_name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPics;
