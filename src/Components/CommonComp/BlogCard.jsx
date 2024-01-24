import Image from "next/image"
import Link from "next/link"

function BlogCard({image, title, url, cat, date, duration, shortDesc}) {
  return (
    <>
      <div className="cards blog_card">
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
            <div className="blog_body card-body">
                <div className="cat_div">
                    <span className="badge cat_badge">{cat}</span>
                    <span className="date_time">{date}</span>
                </div>
                <div className="read_time">
                    <span className="readTimeSpan">Read time : {duration}</span>
                </div>
                <div className="blog_data">
                    <h4>{title}</h4>
                    <p>{shortDesc}</p>
                    <div className="continue_div">
                        <Link className="continue" href={url}>CONTINUE READING</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default BlogCard
