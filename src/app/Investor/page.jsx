import InvestorBanner from "@/Components/Investors/InvestorBanner";
import NationalFitnessUpper from "@/Components/Investors/NationalFinancesUpper";
import NationalFitness from "@/Components/Investors/NationalFinances";
import UnauditedFinancialResults from "@/Components/Investors/UnauditedFinancialResults";
import FinancialResults from "@/Components/Investors/FinancialResults";

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
  return (
    <>
      <InvestorBanner />
      {/* <NationalFitnessUpp/> */}
      <div className="container NationalFitnessUpp-contaner">
        <div class="row">
          {NationalFitnessUppArr.map((val) => (
            <div class="col-md-4" key={val.key}>
              <NationalFitnessUpper title={val.title} description={val.desc} />
            </div>
          ))}
        </div>
      </div>
      <NationalFitness />
      <UnauditedFinancialResults/>
      {/* <FinancialResults/> */}
    </>
  );
}

export default Investor;
