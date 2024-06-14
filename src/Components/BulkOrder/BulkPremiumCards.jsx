import PreChairsCard from "@/Components/preChairsCard/preChairsCard.jsx";

const BulkPremiumCards = ({proddata}) => {
  const chairData = [
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
    {
      ChairImg: "/Assets/images/products/products.png",
      Title: "SHAMIYANA",
      Discription: "Lorem ipsum dolor sit amet.",
      Price: "00,000",
      orignalPrice: "00,000",
      Discount: "20%",
    },
  ];
  const Np = "National Plastic";

  return (
    <>
      <div className="container mt-5">
        <div className="row ">
          {proddata.map(chair => {
            const images = chair.image_name ? chair.image_name.split(', ').map(image => image.trim()) : [];
            return <div
              key={chair.product_id}
              className="PreCardSm col-12 col-sm-6 col-xs-4 col-md-6 col-lg-3 newProdCard"
            >
              <PreChairsCard
                id={chair.product_id}
                ChairImg={`/Assets/images/products/${images[0]}`}
                Title={`${Np} ${chair.product_name} (${chair.color})`}
                Discription={chair.short_description}
                Price={chair.price}
                orignalPrice={chair.discount_price}
                Discount={chair.discount_percentage}
              />
            </div>
          })}
        </div>
      </div>
    </>
  );
};
export default BulkPremiumCards;
