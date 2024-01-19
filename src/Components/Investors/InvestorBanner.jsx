import Image from "next/image";
import "../../styles/investor.css"; 

function InvestorBanner()
{
    return(
        <section>
      <div className="InvestorBanner">
      <div className="">
          <Image
            src="/assets/images/banner/Investor-pg-banner.png"
            classname="img-fluid d-block w-100"
            alt="ome banner 1"
            width={100}
            height={80}
            layout="responsive"
            objectFit="cover"
          />
      </div>
      <div className="InvestorBannerText">
        <h2>Investor Deck</h2>
        <p>We strive to deliver value and</p>
        <p>sustained financial performance</p>
        <button>LEARN MORE</button>
      </div>
      
        </div>
    </section>
    );
}

export default InvestorBanner;