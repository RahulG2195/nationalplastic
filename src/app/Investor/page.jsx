import InvestorBanner from "@/components/Investors/InvestorBanner";
import NationalFitnessUpper from "@/components/Investors/NationalFinancesUpper";
import NationalFitness from "@/components/Investors/NationalFinances";
import UnauditedFinancialResults from "@/components/Investors/UnauditedFinancialResults";
import SharePricesCard from "@/components/Investors/SharePricesCard"; 
import InvestorsSlider from "@/components/Investors/InvestorsSlider";
import AboutSlider from "@/components/About/AboutSlider";
import SliderCard from "@/components/About/SliderCard";
// import InvestorSliderCard from "@/Components/Investors/investorSliderCard";


function Investor() {
  const NationalFitnessUppArr = [
    {
      key: 1,
      title: "Lorem ipsum",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 2,
      title: "Lorem ipsum",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 3,
      title: "Lorem ipsum",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 4,
      title: "Lorem ipsum",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 5,
      title: "Lorem ipsum",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 6,
      title: "Lorem ipsum",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
  ];

  const SharePrices = [
    {
      key: 1,
      image: "/Assets/images/investors/nsenational.png",
      title: "Share price",
      desc: "NSE Rs.0000",
    },
    {
      key: 2, 
      image: "/Assets/images/investors/BombayStock.png",
      title: "Share price",
      desc: "NSE Rs.0000",
    },
  ];
  return (
    <>
      <InvestorBanner /> 
      <InvestorsSlider/>
      {/* <SliderCard/> */}

      {/* <NationalFitnessUpp/> */}
      <div className="container NationalFitnessUpp-contaner p-0">
        <div className="row px-md-5">
          {NationalFitnessUppArr.map((val) => (
            <div className="col-md-4" key={val.key}>
              <NationalFitnessUpper title={val.title} description={val.desc} />
            </div>
          ))}
        </div>
      </div>
      <NationalFitness />
      <UnauditedFinancialResults />
      <div>
        <div className=" NationalFitness-container">
          <h2>
            Share <span>Prices</span>
          </h2>
        </div>
        <div className="d-flex gap-3 justify-content-center flex-wrap SharePrices-row pb-5">
          {SharePrices.map((val) => (
            <div className="" key={val.key}>
              <SharePricesCard
                image={val.image}
                title={val.title}
                description={val.desc}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Investor;
