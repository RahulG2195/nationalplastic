import Image from "next/image";
import "../../styles/error.css";
function ErrorPage() {
  return (
    <>
      <div className="container error-main-container">
        <div className="row">
          <Image
            src="/assets/images/404/404-error-page.jpg-V2.png"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className="row error-text">
            <h1>Looks like you're lost</h1>
            <h5>We can't seem to find the page you're looking for</h5>
            <button className="error-homepage-btn" >BACK TO HOME<i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>
      </div>
    </>
  );
}
export default ErrorPage;
