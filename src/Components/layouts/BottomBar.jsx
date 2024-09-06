"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import "./BottomBar.css";
import "./BottomBar.module.css";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

function BottomBar() {
  const [navbar, setNavbar] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const dropdownRefs = useRef([]);
  const [hoverenabled, setHoverenabled] = useState(true)



  const fetchData = useCallback(async () => {
    try {
      const [productsRes, navRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Products`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/NavCategory`)
      ]);
      setAllProducts(productsRes.data.products);
      setNavbar(navRes.data.navshow);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log('navbar', navbar)
  const sendCategory = useCallback((title) => {
    localStorage.setItem("category", title);
    setHoverenabled(false);

  }, []);

  const chunkArray = useCallback((arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  }, []);


  // dynamic images
  const changeImage = useCallback((id, isCategory = false) => {
    const item = isCategory
      ? navbar.find((cat) => cat.category_id === id)
      : allProducts.find((prod) => prod.product_name === id);
    const imageName = isCategory
      ? item?.image_name
      : item?.image_name?.split(", ")[0].trim();

    setCurrentImage(imageName || "");
  }, [navbar, allProducts]);

  useEffect(() => {
    const handleDropdownPosition = () => {
      dropdownRefs.current.forEach((dropdown) => {
        if (dropdown) {
          const rect = dropdown.getBoundingClientRect();
          const viewportWidth = window.innerWidth;

          dropdown.style.left = rect.right > viewportWidth ? "auto" : "0";
          dropdown.style.right = rect.right > viewportWidth ? "0" : "auto";

          if (rect.left < 0) {
            dropdown.style.left = `${-dropdown.parentElement.getBoundingClientRect().left}px`;
          }
        }
      });
    };

    handleDropdownPosition();
    window.addEventListener("resize", handleDropdownPosition);

    return () => window.removeEventListener("resize", handleDropdownPosition);
  }, []);


  const toggleHover = () => {
    setHoverenabled(false);

  };
  
  useEffect(() => {
    let timer;

    if (!hoverenabled) {
      timer = setTimeout(() => {
        setHoverenabled(true);
      }, 1000); // 2000 milliseconds = 2 seconds
    }

    return () => clearTimeout(timer);
  }, [hoverenabled]); 


  return (

    <div className="mainrow px-md-5  bottom_nav position-relative ">
      {navbar.map((val, index) => (
        // <div
        //   key={val.category_id}
        //   className={`px-2 py-2 custom-dropdown-css ${
        //     ["Stools", "Tables", "Drawer", "Box", "Office Chair"].includes(val.category_name)
        //       ? `${val.category_name} position-relative`
        //       : "second"
        //   }`}
        // >
        <div
          key={val.category_id}
          className={`px-2 py-2 custom-dropdown-css ${index <= 5 && hoverenabled ? 'custom-dropdown-css second' : 'nohover'
            } ${index >= 5 && hoverenabled ? 'after-5th ' : 'nohover'}`}
        >
          <Link
            onClick={() => sendCategory(val.category_name)}
            href={`/ProductCatlogue/${val.seo_url}`}
          >
            <p className="m-0" onMouseOver={() => changeImage(val.category_id, true)} >
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
                allProducts.filter((product) => product.category_id === val.category_id),
                6
              ).map((chunk, columnIndex) => (
                <div key={columnIndex} className="column pt-3">
                  {chunk.map((product) => (
                    <p
                      className="px-3 py-2 fw-semibold"
                      key={product.product_name}
                      onMouseOver={() => changeImage(product.product_name)}
                    >
                      <Link
                        onClick={toggleHover}
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
                  src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${currentImage}`}
                  alt=""
                  height={100}
                  width={100}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BottomBar;