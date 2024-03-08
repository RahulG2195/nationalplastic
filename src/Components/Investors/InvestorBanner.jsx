import Image from "next/image";
import "../../styles/investor.css"; 

function InvestorBanner()
{
    return(
        <section>
      <div className="InvestorBanner">
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
      <div className="InvestorBannerText">
        <h2>Investor Deck</h2>
        <p><i>We strive to deliver value and</i></p>
        <p><i>sustained financial performance</i></p>
        <button>LEARN MORE</button>
      </div>
      
        </div>
    </section>
    );
}

export default InvestorBanner;