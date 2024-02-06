const PriceDetailsCard = () => {
  const priceDetails = [
    { label: "MRP", amount: "00,000" },
    { label: "Discount", amount: "-RS 00,000", className: "text-success" },
    {
      label: "Cupon (htyxhs5)",
      amount: "-RS 00,000",
      className: "text-success",
    },
    { label: "Installation Charge", amount: "00,000" },
  ];

  return (
    <>
      <div className="PriceDetail">
        <div className="fw-medium">Price Detail (2 items)</div>

        <div className="mt-4">
          {priceDetails.map((detail, index) => (
            <div
              key={index}
              className={`d-flex justify-content-between mt-1 fw-semibold ${
                detail.className || ""
              }`}
            >
              <div className="text-secondary">{detail.label}</div>
              <div>{detail.amount}</div>
            </div>
          ))}
          <div className="border-bottom border-secondary mt-2"></div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div>Total Payable</div>
          <div className="medium">00,000</div>
        </div>
        <div className="small my-2 text-success">
          Congratulations youve just saved Rs 0,000 on your order
        </div>
        <div className="small text-center ">EMI starts with Rs 0,000</div>

{/* <<<<<<< HEAD */}
        <div className="d-flex justify-content-center mt-2">
          <button type="submit" class="btn btn-danger px-5">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};
// // =======
//                     <div>
//                         <div className="fw-semibold">Price Detail (2 items)</div>


//                         <div className="mt-4">
//                             {priceDetails.map((detail, index) => (
//                                 <div key={index} className={`d-flex justify-content-between mt-1 fw-semibold ${detail.className || ""}`}>
//                                     <div className="text-secondary">{detail.label}</div>
//                                     <div className="medium">{detail.amount}</div>
//                                 </div>
//                             ))}
//                             <div className="border-bottom border-secondary mt-2"></div>
//                         </div>



//                         <div className="d-flex justify-content-between mt-3">
//                             <div>Total Payable</div>
//                             <div className="medium fw-bold">00,000</div>
//                         </div>
//                         <div className="small my-2 text-success fw-bold">Congratulations you've just saved Rs 0,000 on your order</div>
//                         <div className="small text-center ">EMI starts with Rs 0,000</div>

// <<<<<<< HEAD
                        <div className="d-flex justify-content-center mt-2">
                            <button type="submit" className="btn btn-danger px-5">Place Order</button>
                        </div>
// =======
//                         <div className="d-flex justify-content-center mt-2">
//                             <button type="submit" class="btn btn-danger px-5">Place Order</button>
//                         </div>
// >>>>>>> 5a91d9bee69df6670363c806bac3052cc358c16f

//                     </div>


//         </>
//     )
// }

// export default PriceDetailsCard
// >>>>>>> 6ed1239a025a3adceac0adda09f841b2f113b880

export default PriceDetailsCard;
