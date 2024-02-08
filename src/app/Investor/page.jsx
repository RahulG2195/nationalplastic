import InvestorBanner from "@/Components/Investors/InvestorBanner";
import NationalFitnessUpper from "@/Components/Investors/NationalFinancesUpper";
import NationalFitness from "@/Components/Investors/NationalFinances";
import UnauditedFinancialResults from "@/Components/Investors/UnauditedFinancialResults";
import SharePricesCard from "@/Components/Investors/SharePricesCard"; 
import InvestorsSlider from "@/Components/Investors/InvestorsSlider";
import AboutSlider from "@/Components/About/AboutSlider";
import SliderCard from "@/Components/About/SliderCard";
import InvestorSliderCard from "@/Components/Investors/investorSliderCard";


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
      image: "/assets/images/investors/nsenational.png",
      title: "Share price",
      desc: "NSE Rs.0000",
    },
    {
      key: 2, 
      image: "/assets/images/investors/BombayStock.png",
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
      <div className="container NationalFitnessUpp-contaner">
        <div className="row">
          {NationalFitnessUppArr.map((val) => (
            <div className="col-md-4" key={val.key}>
              <NationalFitnessUpper title={val.title} description={val.desc} />
            </div>
          ))}
        </div>
      </div>
      <NationalFitness />
      <UnauditedFinancialResults />
      <div className="container">
        <div className="row NationalFitness-container">
          <h2>
            Share <span>Prices</span>
          </h2>
        </div>
        <div className="row SharePrices-row">
          {SharePrices.map((val) => (
            <div className="col-md-6" key={val.key}>
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
