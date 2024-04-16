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
  // //console.log("urlurlurlurl", preEventChair);
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
    // //console.log("nameenamee", name)
    const fetchData = async () => {
      try {
        const res = await axios.get("http://thatsyourwebsite.com/api/Products");
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
        setStool(allproducts.filter((products) => products.category_id == 28));
        setTable(allproducts.filter((products) => products.category_id == 25));
        setBox(allproducts.filter((products) => products.category_id == 21));
        setDrawer(allproducts.filter((products) => products.category_id == 22));

        //console.log(preEventChair);
      } catch {
        console.error("Error fetching data:");
      }
    };

    fetchData();
  }, [name]);

  const sendCategory = (e) => {
    const title = e.target.innerText;
    //console.log("Category clicked:", title);
    localStorage.setItem("category", title);
  };

  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  return (
    <div className=" px-5  d-flex align-items-center bottom_nav position-relative mainrow">
      <div className="col second px-3 py-2">
        <Link onClick={sendCategory} href={`/ProductCatlogue/13`}>
          <p className="">Premium Event Chairs</p>
        </Link>
        <div className="ulCont SecondDrop mx-4 secondHover p-3 ">
          <p className="text-start fw-bold dropHeading p-3">
            Premium Event Chairs
          </p>
          <div className="d-flex flex-row gap-5 px-3">
            {chunkArray(preEventChair, 6).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column pt-3">
                {chunk.map((product, index) => (
                  <p className="p-3 fw-semibold" key={index}>
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
            <div className="barImgCont py-3">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col second py-2">
        <Link onClick={sendCategory} href={`/ProductCatlogue/14`}>
          {" "}
          <p>Without Arm Tent</p>
        </Link>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading p-3">Without Arm Tent</p>
          <div className="d-flex flex-row gap-5 px-3">
            {chunkArray(withountArm, 6).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column pt-3">
                {chunk.map((product, index) => (
                  <p className="p-3 fw-semibold" key={index}>
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
            <div className="barImgCont py-3">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col second  py-2">
        <Link onClick={sendCategory} href={`/ProductCatlogue/15`}>
          <p>Premium Chairs</p>
        </Link>
        <div className="ulCont SecondDrop mx-4 px-3">
          <p className="text-start fw-bold dropHeading p-3">Premium Chairs</p>
          <div className="d-flex flex-row  gap-5 px-3">
            {chunkArray(prechair, 6).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column pt-3">
                {chunk.map((product, index) => (
                  <p className="p-3 fw-semibold" key={index}>
                    <Link
                      onClick={() => handleOnClick(product.seo_url)}
                      className="nav-link "
                      href={`/ProductDetail/${product.seo_url}`}
                    >
                      {product.product_name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
            <div className="barImgCont py-3">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col second py-2 ">
        <Link onClick={sendCategory} href={`/ProductCatlogue/16`}>
          <p>Popular Chairs</p>
        </Link>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading p-3">Popular Chairs</p>
          <div className="d-flex flex-row  gap-5 px-3">
            {chunkArray(Popularchair, 6).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column pt-3">
                {chunk.map((product, index) => (
                  <p className="p-3 fw-semibold" key={index}>
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
            <div className="barImgCont py-3">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col second py-2 ">
        <Link onClick={sendCategory} href={`/ProductCatlogue/17`}>
          <p>Cabinet</p>
        </Link>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading p-3">Cabinet</p>
          <div className="d-flex flex-row  gap-5 px-3">
            {chunkArray(cabinet, 6).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column  pt-3">
                {chunk.map((product, index) => (
                  <p className="p-3 fw-semibold" key={index}>
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
            <div className="barImgCont py-3">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col second py-2 ">
        <Link onClick={sendCategory} href={`/ProductCatlogue/18`}>
          <p>Baby Chairs</p>
        </Link>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading p-3">Baby Chairs</p>
          <div className="d-flex flex-row  gap-5 px-3">
            {chunkArray(babychair, 6).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column pt-3">
                {chunk.map((product, index) => (
                  <p className="p-3 fw-semibold" key={index}>
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
            <div className="barImgCont py-3">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col drp Stool position-relative py-2">
        <Link onClick={sendCategory} href={`/ProductCatlogue/28`}>
          <p> Stool</p>
        </Link>
        <div className="ulCont SecondDrop mx-4 ">
          <p className="text-start fw-bold dropHeading p-3">Stool</p>
          <div className="d-flex flex-row  gap-5 px-3">
            {chunkArray(stool, 6).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column pt-3">
                {chunk.map((product, index) => (
                  <p className="p-3 fw-semibold" key={index}>
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
            <div className="barImgCont py-3">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col drp Table position-relative py-2">
        <Link onClick={sendCategory} href={`/ProductCatlogue/25`}>
          <p>Table</p>
        </Link>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading p-3">Table</p>
          <div className="d-flex flex-row  gap-5 px-3">
            {chunkArray(table, 6).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column pt-3">
                {chunk.map((product, index) => (
                  <p className="p-3 fw-semibold" key={index}>
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
            <div className="barImgCont py-3">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col drp Box position-relative py-2">
        <Link onClick={sendCategory} href={`/ProductCatlogue/21`}>
          <p>Box</p>
        </Link>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading p-3">Box</p>
          <div className="d-flex flex-row  gap-5 px-3">
            {chunkArray(box, 6).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column pt-3">
                {chunk.map((product, index) => (
                  <p className="p-3 fw-semibold" key={index}>
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
            <div className="barImgCont py-3">
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col drp Drawer position-relative py-2">
        <Link onClick={sendCategory} href={`/ProductCatlogue/22`}>
          <p>Drawer</p>
        </Link>
        <div className="ulCont SecondDrop mx-4 p-3">
          <p className="text-start fw-bold dropHeading p-3">Drawer</p>
          <div className="d-flex flex-row  gap-5 px-3">
            {chunkArray(drawer, 6).map((chunk, columnIndex) => (
              <div key={columnIndex} className="column pt-3">
                {chunk.map((product, index) => (
                  <p className="p-3 fw-semibold" key={index}>
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
            <div className="barImgCont py-3">
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
