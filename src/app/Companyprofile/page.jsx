import Link from "next/link";
import "./companyprofile.css";
import ComapnyProfileSidebar from "@/Components/About/ComapnyProfileSidebar";

function Company() {
  return (
    <>
      <div className="container company-profile-container my-5">
        <div className="row pt-5">
          <div className="col-12 col-md-8 company-profile-content">
            <div className="mb-4">
              <h2 className="company-profile-title">Our History</h2>
              <p className="company-profile-text">
                National Plastic started its production in a very humble manner in
                the year 1952 in a 500 sq.ft. premises, manufacturing plastic
                buttons for shirts etc. Over the years National has been a market
                leader in innovating new and interesting homeware products. It did
                not take National Plastic long to become not only India's leading
                manufacturer of houseware products but also the largest exporter
                of plastic furniture in India.
              </p>
              <p className="company-profile-text">
                National Plastic Industries Ltd., then took a quantum leap and
                commenced the commercial production of Molded Furniture in 1994
                and since then has gone from strength to strength. Today National
                Molded Furniture is available throughout India and has been widely
                accepted by both traders as well as consumers. National has a
                varied range of products that can suit all applications and
                different kinds of budgets. Consumers prefer National Molded
                Furniture for its quality, color and finishing.
              </p>
            </div>

            <div className="mb-4">
              <h2 className="company-profile-title">Our Brand</h2>
              <p className="company-profile-text">
                The rich history of the company is reflected in its brand image as
                the company National has become the household name in Plastics in
                India.
              </p>
              <p className="company-profile-text">
                National Plastic has been marketing their products under the brand
                name "NATIONAL". Today 'National Plastic Industries Ltd' is an
                ISO-9001:2008 ACCREDITED COMPANY having CIN: L25200MH1987PLC044707
                and "NATIONAL" products are available across 36 countries
                including America, Australia etc. "National Plastics Industries
                Ltd." with its constant Endeavour for innovation will continue to
                introduce many new and innovative products both for domestic as
                well as International markets and thereby will fulfill its
                commitment to the society as a whole by offering premium quality
                products at the most affordable prices.
              </p>
              <p className="company-profile-highlight">
                The Company is listed on Bombay Stock Exchange Ltd. (BSE).
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <ComapnyProfileSidebar title={'Company Profile'} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Company;
