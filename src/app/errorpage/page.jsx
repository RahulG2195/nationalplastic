import Image from "next/image";
import "../../styles/error.css";
function ErrorPage() {
  return (
    <>
      <div className="container error-main-container">
        <div className="row">
          <Image
            src="/Assets/images/404/404-error-page.jpg-V2.png"
            width={100}
            height={100}
            alt="error img"
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className="row error-text">
          <h1>Looks like you are lost</h1>
          <h5>We can not seem to find the page you are looking for</h5>
          <button className="error-homepage-btn">
            BACK TO HOME<i className="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </>
  );
}
export default ErrorPage;
