import Image from "next/image";
import Link from "next/link";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import "../../styles/home_prod.css";

function CatCards({
  image,
  title,
  onCategoryChange,
  style,
  catid,
  hovereffect,
  manfacthover,
  hoverglow,
  redirection,
}) {
  const sendCategory = () => {
    localStorage.setItem("category", title);
  };

  return (
    <>
      <div className={`cards sbr_card`}>
        <Link onClick={sendCategory} href={`/${redirection}/${catid}`}>
          <div
            className={`card_img ${hovereffect ? hovereffect : ''} ${manfacthover ? manfacthover : ''} ${hoverglow ? hoverglow : ''} `}
          >
            <Image
              src={image}
              alt="product card images"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div
            className={`prodname ${
              style ? style : "py-3 d-flex justify-content-between px-2"
            } `}
          >
            <h4 className="fw-bold respCatTitle">{title}</h4>
            <ArrowForwardOutlinedIcon className="fw-bold" />
          </div>
        </Link>
      </div>
    </>
  );
}

export default CatCards
// export {ShopCards};
