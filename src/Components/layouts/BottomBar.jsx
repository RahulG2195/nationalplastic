"use client";
import { useEffect, useState } from "react";
import "./BottomBar.css";
import "./BottomBar.module.css";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

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

  // state for navbar loop
  const [navbar, setNavbar] = useState([]);
  const [AllProd, SetAllProd] = useState([]);
  const [getImg, SetGetImg] = useState("Blog-section-1.jpg");

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
        const res = await axios.get("/api/Products");
        const allproducts = res.data.products;

        // start -- fetch category which want to display on navbar
        const nav = await axios.get(
          "/api/NavCategory"
        );
        const navshow = nav.data.navshow;
        SetAllProd(allproducts);
        setNavbar(navshow);
        // end --

        /* setPreEventChair(
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
        setDrawer(allproducts.filter((products) => products.category_id == 22)); */

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

  const ChangeImage = (prod_name) => {
    const img_name = AllProd.filter(
      (products) => products.product_name == prod_name
    );
    img_name.map((val) => {
      SetGetImg(val.image_name);
    });
  };
  // console.log('img' + getImg);
  return (
    <div className=" px-5 d-flex align-items-center bottom_nav position-relative mainrow">
      {navbar.map((val) => (
        <div
          key={val.category_id}
          className={`px-2 py-2 ${
            val.category_name == "Stools" ||
            val.category_name == "Tables" ||
            val.category_name == "Drawer" ||
            val.category_name == "Box"
              ? val.category_name + " position-relative"
              : "second"
          }`}
        >
          <Link
            onClick={sendCategory}
            href={`/ProductCatlogue/${val.category_id}`}
          >
            <p className="">{val.category_name}</p>
          </Link>

          <div className="ulCont SecondDrop mx-4 secondHover p-3 ">
            <p className="text-start fw-bold dropHeading p-3">
              {val.category_name}
            </p>
            <div className="d-flex flex-row gap-5 px-3">
              {chunkArray(
                AllProd.filter(
                  (products) => products.category_id == val.category_id
                ),
                6
              ).map((chunk, columnIndex) => (
                <div key={columnIndex} className="column pt-3">
                  {chunk.map((product, index) => (
                    <p
                      className="p-3 fw-semibold"
                      key={index}
                      onMouseOver={() => ChangeImage(product.product_name)}
                    >
                      <Link
                        // onClick={() => handleOnClick(product.seo_url)}
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
                <Image
                  src={`/Assets/images/New-launches-1/${getImg}`}
                  alt=""
                  height={100}
                  width={100}
                  layout="responsive"
                  objectFit="contain"
                />
                {/* <img src={`/Assets/images/Home-page/${getImg}`} alt={product.product_name} /> */}
              </div>
            </div>
          </div>
        </div>
      ))}

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
