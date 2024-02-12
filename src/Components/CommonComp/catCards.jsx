import Image from "next/image"
import Link from "next/link"

function CatCards({ image, title, url, style = "" }) {
  return (
    <>
      <div className="cards">
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
      </div>
        <div className="cards TopPick-Card">
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
                <Link href={url}><h4>{title}</h4></Link>
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
        </div>
    </>
  )
}

export default CatCards 
