// import PreChairsCard from "../preChairsCard/preChairsCard"


// const PreChairsCards = () => {
//     return (
//         <>

//             {/* <div className="main_container d-flex ">

//             </div> */}

//             <div className='d-flex justify-content-center gap-2 flex-wrap'>
//                 <div className="container text-center mt-5 d-flex justify-content-center">
//                     <div className="row">
//                         <PreChairsCard ChairImg="/assets\images\New-launches-1\New-launches-1.png" Title="SHAMIYANA" Discription="Lorem ipsum dolor sit amet." Price="00,000" orignalPrice="00,000" Discount="20%" />
//                         <PreChairsCard ChairImg="/assets\images\New-launches-1\New-launches-1.png" Title="SHAMIYANA" Discription="Lorem ipsum dolor sit amet." Price="00,000" orignalPrice="00,000" Discount="20%" />
//                         <PreChairsCard ChairImg="/assets\images\New-launches-1\New-launches-1.png" Title="SHAMIYANA" Discription="Lorem ipsum dolor sit amet." Price="00,000" orignalPrice="00,000" Discount="20%" />
//                         <PreChairsCard ChairImg="/assets\images\New-launches-1\New-launches-1.png" Title="SHAMIYANA" Discription="Lorem ipsum dolor sit amet." Price="00,000" orignalPrice="00,000" Discount="20%" />
//                         <PreChairsCard ChairImg="/assets\images\New-launches-1\New-launches-1.png" Title="SHAMIYANA" Discription="Lorem ipsum dolor sit amet." Price="00,000" orignalPrice="00,000" Discount="20%" />
//                         <PreChairsCard ChairImg="/assets\images\New-launches-1\New-launches-1.png" Title="SHAMIYANA" Discription="Lorem ipsum dolor sit amet." Price="00,000" orignalPrice="00,000" Discount="20%" />

//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default PreChairsCards



// import React from "react";
// import PreChairsCard from "../preChairsCard/preChairsCard";

// const PreChairsCards = () => {
//   // Assuming your data is available in an array
//   const chairData = [

//   ];

  import React from "react";
import PreChairsCard from "../preChairsCard/preChairsCard";

const PreChairsCards = () => {
  const chairData = [
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    

  ];

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {chairData.map((chair, index) => (
          <div key={index} className="col">
            <PreChairsCard
              ChairImg={chair.ChairImg}
              Title={chair.Title}
              Discription={chair.Discription}
              Price={chair.Price}
              orignalPrice={chair.orignalPrice}
              Discount={chair.Discount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreChairsCards;
