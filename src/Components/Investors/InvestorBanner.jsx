import Image from "next/image";
import "../../styles/investor.css";

function InvestorBanner() {
  return (
    <section>
      <div className="InvestorBanner position-relative">
        <div className="">
          <Image
            src="/Assets/images/banner/Investor-pg-banner.png"
            className="img-fluid d-block w-100"
            alt="ome banner 1"
            width={100}
            height={80}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="InvestorBannerText w-20 text-center">
          <h2 className="">Investor Deck</h2>
          <p className=" fw-semibold"><i>We strive to deliver value and</i></p>
          <p className=" fw-semibold"><i>sustained financial performance</i></p>
          <button className="fw-semibold px-4 py-2 btnInverstor">LEARN MORE</button>
        </div>

      </div>
    </section>
  );
}

export default InvestorBanner;