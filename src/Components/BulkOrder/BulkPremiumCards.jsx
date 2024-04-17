import PreChairsCard from "@/Components/preChairsCard/preChairsCard.jsx";

const BulkPremiumCards = ({proddata}) => {
  const chairData = [
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/New-launches-1/New-launches-1.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
  ];

  return (
    <>
      <div className="container mt-5">
        <div className="row ">
          {proddata.map(chair => (
            <div
              key={chair.product_id}
              className="PreCardSm col-12 col-sm-6 col-xs-4 col-md-6 col-lg-3"
            >
              <PreChairsCard
                id={chair.product_id}
                ChairImg={`/Assets/images/New-launches-1/${chair.image_name}`}
                Title={chair.product_name}
                Discription={chair.short_description}
                Price={chair.price}
                orignalPrice={chair.discount_price}
                Discount={chair.discount_percentage}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default BulkPremiumCards;
