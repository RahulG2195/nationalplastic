import Image from "next/image"
import Link from "next/link"
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import '../../styles/home_prod.css'


function CatCards({ image, title,onCategoryChange,style,catid, hovereffect, manfacthover,hoverglow }) {

const sendCategory = () =>{
  console.log("Category clicked:", title);
  // if (onCategoryChange) {
  //   onCategoryChange(title);
    localStorage.setItem('category', title);
  // }
};

  return (
    <>
      <div className={`cards  `}>
        <Link onClick={sendCategory} href={`/ProductCatlogue/${catid}`} >
          <div className={`"card_img" ${hovereffect} ${manfacthover} ${hoverglow} `}>
            <Image
              src={image}
              alt="product card images"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div className={`prodname ${style ? style : 'py-3 d-flex justify-content-between px-2'} `}>
            <h4 className="fw-bold respCatTitle">{title}</h4>
          <ArrowForwardOutlinedIcon className="fw-bold" />
          </div>
        </Link>
      </div>
      {/* <div className="cards TopPick-Card">
        <Link href="/ProductCatlogue">
          <div className="card_img">
            <Image
              src={image}
              alt="product card images"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div className={`prodname d-flex justify-content-between px-2 ${style}`}>
            <h4>{title}</h4>
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </Link>
      </div> */}
    </>
  )
}

export default CatCards 
