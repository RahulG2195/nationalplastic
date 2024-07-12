"use client";
import { useEffect, useState, useRef } from "react";
import "./BottomBar.css";
import "./BottomBar.module.css";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

function BottomBar() {
  const [name, setName] = useState("");
  const [navbar, setNavbar] = useState([]);
  const [AllProd, SetAllProd] = useState([]);
  const [getImg, SetGetImg] = useState("");
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Products`);
        const allproducts = res.data.products;

        // start -- fetch category which want to display on navbar
        const nav = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/NavCategory`);
        const navshow = nav.data.navshow;
        SetAllProd(allproducts);
        setNavbar(navshow);

        console.log(navshow);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  const sendCategory = (e) => {
    const title = e.target.innerText;
    localStorage.setItem("category", title);
  };

  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  const ChangeNavImage = (category_id) => {
    const navImg = navbar.filter((cat) => cat.category_id === category_id);
    SetGetImg(navImg[0]["image_name"]);
  };

  const ChangeImage = (prod_name) => {
    const img_name = AllProd.filter(
      (products) =>
        products.product_name === prod_name && products.seo_url_clr !== ""
    );

    img_name.map((val) => {
      const images = val.image_name
        ? val.image_name.split(", ").map((image) => image.trim())
        : [];
      SetGetImg(images[0]);
    });
  };

  useEffect(() => {
    const handleHover = (index) => {
      const dropdown = dropdownRefs.current[index];
      const rect = dropdown.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        dropdown.classList.add("flipped");
      } else {
        dropdown.classList.remove("flipped");
      }
    };

    dropdownRefs.current.forEach((dropdown, index) => {
      const parent = dropdown.parentElement;
      parent.addEventListener("mouseover", () => handleHover(index));
    });

    return () => {
      dropdownRefs.current.forEach((dropdown, index) => {
        const parent = dropdown.parentElement;
        parent.removeEventListener("mouseover", () => handleHover(index));
      });
    };
  }, [navbar]);

  useEffect(() => {
    const handleDropdownPosition = () => {
      dropdownRefs.current.forEach((dropdown) => {
        if (dropdown) {
          const rect = dropdown.getBoundingClientRect();
          const parentRect = dropdown.parentElement.getBoundingClientRect();
          const viewportWidth = window.innerWidth;

          if (rect.right > viewportWidth) {
            // If dropdown extends beyond right edge, align it to the right
            dropdown.style.left = "auto";
            dropdown.style.right = "0";
          } else {
            // Reset positioning
            dropdown.style.left = "0";
            dropdown.style.right = "auto";
          }

          // Ensure the dropdown doesn't go off the left edge
          if (rect.left < 0) {
            dropdown.style.left = `${-parentRect.left}px`;
          }
        }
      });
    };

    handleDropdownPosition();
    window.addEventListener("resize", handleDropdownPosition);

    return () => {
      window.removeEventListener("resize", handleDropdownPosition);
    };
  }, []);

  return (
    <div className="px-md-5 d-flex align-items-center bottom_nav position-relative mainrow">
      {navbar.map((val, index) => (
        <div
          key={val.category_id}
          className={`px-2 py-2 custom-dropdown-css ${val.category_name === "Stools" ||
              val.category_name === "Tables" ||
              val.category_name === "Drawer" ||
              val.category_name === "Box" ||
              val.category_name == "Office chair"
              ? val.category_name + " position-relative"
              : "second"
            }`}>
          <Link
            onClick={sendCategory}
            href={`/ProductCatlogue/${val.category_id}`}>
            <p className="" onMouseOver={() => ChangeNavImage(val.category_id)}>
              {val.category_name}
            </p>
          </Link>

          <div
            className="ulCont SecondDrop mx-4 secondHover p-3"
            ref={(el) => (dropdownRefs.current[index] = el)}
          >
            <p className="text-start fw-bold dropHeading p-3">
              {val.category_name}
            </p>
            <div className="d-flex flex-row gap-4 px-3">
              {chunkArray(
                AllProd.filter(
                  (products) => products.category_id === val.category_id
                ),
                6
              ).map((chunk, columnIndex) => (
                <div key={columnIndex} className="column pt-3">
                  {chunk.map((product, index) => (
                    <p
                      className="p-3 fw-semibold"
                      key={index}
                      onMouseOver={() => ChangeImage(product.product_name)}>
                      <Link
                        // onClick={() => handleOnClick(product.seo_url)}
                        className="nav-link"
                        href={`/ProductDetail/${product.seo_url}`}>
                        {product.product_name2}
                      </Link>
                    </p>
                  ))}
                </div>
              ))}
              <div className="barImgCont py-3">
                <Image
                  src={`/Assets/images/products/${getImg}`}
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
    </div>


  );
}

export default BottomBar;
