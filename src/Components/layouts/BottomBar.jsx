"use client";
import { useEffect, useState } from "react";
import "./BottomBar.css";
import "./BottomBar.module.css";
import Link from "next/link";
import axios from "axios";

function BottomBar() {
  const [name, setName] = useState("");
  const [seourl, setSeourl] = useState();
  const [preEventChair, setPreEventChair] = useState([]);
  const [withountArm, setWithoutArm] = useState([]);
  const [prechair, setPrechair] = useState([]);
  const [Popularchair, setPopularchair] = useState([]);
  const [cabinet, setCabinet] = useState([]);
  const [babychair, setBabychair] = useState([]);
  const [stool, setStool] = useState([]);
  const [table, setTable] = useState([]);
  const [box, setBox] = useState([]);
  const [drawer, setDrawer] = useState([]);

  // const preEventChair = [
  //   { label: "karen", seoUrl: "karen" },
  //   { label: "ICE, GLASS", seoUrl: "ice-glass" },
  //   { label: "GHOST CHAIR", seoUrl: "ghost-chair" },
  //   // Add more link objects as needed
  // ];

  useEffect(() => {
    // console.log("nameenamee", name)
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/Products");
        const allproducts = res.data.products;
        setPreEventChair(
          allproducts.filter((products) => products.category_id == 13)
        );
        setWithoutArm(
          allproducts.filter((products) => products.category_id == 14)
        );
        setPrechair(
          allproducts.filter((products) => products.category_id == 15)
        );
        setPopularchair(
          allproducts.filter((products) => products.category_id == 16)
        );
        setCabinet(
          allproducts.filter((products) => products.category_id == 17)
        );
        setBabychair(
          allproducts.filter((products) => products.category_id == 18)
        );
        setStool(allproducts.filter((products) => products.category_id == 19));
        setTable(allproducts.filter((products) => products.category_id == 20));
        setBox(allproducts.filter((products) => products.category_id == 21));
        setDrawer(allproducts.filter((products) => products.category_id == 22));

        console.log(preEventChair);
      } catch {
        console.error("Error fetching data:");
      }
    };

    fetchData();
  }, [name]);

  const handleOnClick = (url) => {
    // const title = e.target.text
    // setSeourl(url);
  };

  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  return (
    <div className="row px-4 py-2 d-flex align-items-center bottom_nav position-relative mainrow">
      <div className="col second ">
        <p>Premium Event Chairs</p>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading ">
            Premium Event Chairs
          </p>
          <div className="d-flex flex-row gap-5">
            {chunkArray(preEventChair, 10).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column">
                {chunk.map((product, index) => (
                  <p key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link"
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col second ">
        <p>Without Arm Tent</p>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading ">Without Arm Tent</p>
          <div className="d-flex flex-row gap-5">
            {chunkArray(withountArm, 10).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column">
                {chunk.map((product, index) => (
                  <p key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link"
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col second ">
        <p>Premium Chairs</p>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading ">Premium Chairs</p>
          <div className="d-flex flex-row gap-5">
            {chunkArray(prechair, 10).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column">
                {chunk.map((product, index) => (
                  <p key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link"
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col second ">
        <p>Popular Chairs</p>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading ">Popular Chairs</p>
          <div className="d-flex flex-row gap-5">
            {chunkArray(Popularchair, 10).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column">
                {chunk.map((product, index) => (
                  <p key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link"
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col second ">
        <p>Cabinet</p>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading ">Cabinet</p>
          <div className="d-flex flex-row gap-5">
            {chunkArray(cabinet, 10).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column">
                {chunk.map((product, index) => (
                  <p key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link"
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col second ">
        <p>Baby Chairs</p>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading ">Baby Chairs</p>
          <div className="d-flex flex-row gap-5">
            {chunkArray(babychair, 10).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column">
                {chunk.map((product, index) => (
                  <p key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link"
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col Stool position-relative ">
        <p> Stool</p>
        <div className="ulCont SecondDrop mx-4 ">
          <p className="text-start fw-bold dropHeading ">Stool</p>
          <div className="d-flex flex-row gap-5">
            {chunkArray(stool, 10).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column">
                {chunk.map((product, index) => (
                  <p key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link"
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col Table position-relative">
        <p>Table</p>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading ">Table</p>
          <div className="d-flex flex-row gap-5">
            {chunkArray(table, 10).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column">
                {chunk.map((product, index) => (
                  <p key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link"
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col Box position-relative">
        <p>Box</p>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading ">Box</p>
          <div className="d-flex flex-row gap-5">
            {chunkArray(box, 10).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column">
                {chunk.map((product, index) => (
                  <p key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link"
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col Drawer position-relative">
        <p>Drawer</p>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading ">Drawer</p>
          <div className="d-flex flex-row gap-5">
            {chunkArray(drawer, 10).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column">
                {chunk.map((product, index) => (
                  <p key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link"
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col">
        <p>Drawers & Racks</p>
      </div>
      <div className="col small">
        <p>Household Accesories</p>
      </div>
      <div className="col">
        <p>Planters</p>
      </div> */}
    </div>
  );
}

export default BottomBar;
