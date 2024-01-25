import "../../styles/investor.css";
import FinancialResults from "./FinancialResults";

function UnauditedFinancialResults() {
  const Resultarr = [
    {
      key: 1,
      date: "2023-2024",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 2,
      date: "2022-2023",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 3,
      date: "2021-2022",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 4,
      date: "2020-2021",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 5,
      date: "2019-2020",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 6,
      date: "2018-2019",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 7,
      date: "2023-2024",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 8,
      date: "2022-2023",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 9,
      date: "2021-2022",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 10,
      date: "2020-2021",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 11,
      date: "2019-2020",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 12,
      date: "2018-2019",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 13,
      date: "2019-2020",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
    {
      key: 14,
      date: "2018-2019",
      text: "Download",
      image: "/assets/images/investors/download.png",
    },
  ];
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 ">
            <div className="FinancialResults-2">
              <h4>Unaudited Financial Results</h4>
            </div>
          </div>
          {/* *******Q1 June******** */}

          <div className="col-md-10 FinancialResults-10">
            <div>
              <h2>Financial Results</h2>
              <h4>Q1 June</h4>

              <div className="row">
                {Resultarr.map((val) => (
                  <div className="col-md-4 results-data" key={val.key}>
                    <FinancialResults
                      date={val.date}
                      text={val.text}
                      image={val.image}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* *******Q2 September******** */}
            <div>
              <h2>Financial Results</h2>
              <h4>Q2 September</h4>

              <div className="row">
                {Resultarr.map((val) => (
                  <div className="col-md-4 results-data" key={val.key}>
                    <FinancialResults
                      date={val.date}
                      text={val.text}
                      image={val.image}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* ******* Q3 December******** */}
            <div>
              <h2>Financial Results</h2>
              <h4>Q3 December</h4>
              <div className="row">
                {Resultarr.map((val) => (
                  <div className="col-md-4 results-data" key={val.key}>
                    <FinancialResults
                      date={val.date}
                      text={val.text}
                      image={val.image}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ****Audited Financial Results***** */}
        <div className="row FinancialResults">
          <div className="col-md-2 ">
            <div className="FinancialResults-2">
              <h4>Audited Financial Results</h4>
            </div>
          </div>

          <div className="col-md-10 FinancialResults-10">
            <div>
              <h2>Financial Results</h2> 

              <div className="row">
                {Resultarr.map((val) => (
                  <div className="col-md-4 results-data" key={val.key}>
                    <FinancialResults
                      date={val.date}
                      text={val.text}
                      image={val.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ****Annual Report***** */}
        <div className="row FinancialResults">
          <div className="col-md-2 ">
            <div className="FinancialResults-2">
              <h4>Annual Report</h4>
            </div>
          </div>

          <div className="col-md-10 FinancialResults-10">
            <div> 

              <div className="row">
                {Resultarr.map((val) => (
                  <div className="col-md-4 results-data" key={val.key}>
                    <FinancialResults
                      date={val.date}
                      text={val.text}
                      image={val.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ****Annual Return***** */}
        <div className="row FinancialResults">
          <div className="col-md-2 ">
            <div className="FinancialResults-2">
              <h4>Annual Return</h4>
            </div>
          </div>

          <div className="col-md-10 FinancialResults-10">
            <div> 

              <div className="row">
                {Resultarr.map((val) => (
                  <div className="col-md-4 results-data" key={val.key}>
                    <FinancialResults
                      date={val.date}
                      text={val.text}
                      image={val.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}
export default UnauditedFinancialResults;
