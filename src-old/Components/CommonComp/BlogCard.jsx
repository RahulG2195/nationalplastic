import Image from "next/image";
import Link from "next/link";

function BlogCard({ image, title, url, cat, date, duration, shortDesc }) {
  return (
    <>
      <div className="cards blog_card">
        <Link href="/BlogDetails">
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
              <span className="badge cat_badge px-4">{cat}</span>
              <span className="date_time small fw-semibold">{date}</span>
            </div>
            <div className="read_time">
              <span className="readTimeSpan medium text-secondary fw-semibold ">
                Read time : 22 MINS
              </span>
            </div>
            <div className="blog_data mt-3">
              <span className="fw-bolder darkBlue fs-5 mt-5 ">{title}</span>
              <p className="fw-semibold text-secondary mt-4">{shortDesc}</p>
              <div className="pt-4 fs-6 ">
                <Link className="small darkBlue fw-bold " href="/BlogDetails">
                  CONTINUE READING
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default BlogCard;
