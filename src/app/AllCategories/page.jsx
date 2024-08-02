"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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
      <div className="container mt-5">
        <div className="text-center mb-5">
          <h1 className="display-4 text-danger">Categories <span className="text-dark">For You</span></h1>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {categories.map((category) => (
            <div
              key={category.category_id}
              className="col col-lg-3 d-flex justify-content-center"
            >
              <div className="card text-center border-0 shadow-sm">
                <Link href={`/ProductCatlogue/${category.seo_url}`}>
                  <img
                    src={`/Assets/uploads/category/${category.image_name}`}
                    className="card-img-top"
                    alt={category.category_name}
                  />
                </Link>

                <div className="card-body">
                  <Link href={`/ProductCatlogue/${category.seo_url}`}>
                    <h5 className="card-title">{category.category_name}</h5>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopPics;
