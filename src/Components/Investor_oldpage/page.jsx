import InvestorBanner from "@/Components/Investors/InvestorBanner";
import NationalFitnessUpper from "@/Components/Investors/NationalFinancesUpper";
import NationalFitness from "@/Components/Investors/NationalFinances";
import UnauditedFinancialResults from "@/Components/Investors/UnauditedFinancialResults";
import SharePricesCard from "@/Components/Investors/SharePricesCard"; 
import InvestorsSlider from "@/Components/Investors/InvestorsSlider";
import AboutSlider from "@/Components/About/AboutSlider";
import SliderCard from "@/Components/About/SliderCard";
// import InvestorSliderCard from "@/Components/Investors/investorSliderCard";
export const metadata = {
  title: 'Investor Relations | National Plastic Industries Ltd',
  description: 'Access key financial information, annual reports, and corporate governance details for National Plastic Industries Ltd. Stay informed about our plastic manufacturing business performance and growth.',
  keywords: ['investor relations', 'financial reports', 'National Plastic Industries Ltd', 'shareholder information', 'plastic industry investment'],
};



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
