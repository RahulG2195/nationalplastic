function CancelProdChargeAfterTwentyFourHr(orderStatusDate) {
  const orderDate = new Date(orderStatusDate);
  const currentDate = new Date();
  const diffInMs = currentDate - orderDate;
  const diffInHours = diffInMs / (1000 * 60 * 60);
    if (diffInHours > 24) {
      return 50; 
    } else {
      return 0; 
    }
}


function ReturnProductBeforeFourteenDays(orderStatusDate){
  const orderDate = new Date(orderStatusDate);
  const currentDate = new Date();
  const diffInMs = currentDate - orderDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}

export default CancelProdChargeAfterTwentyFourHr;

export  {ReturnProductBeforeFourteenDays}; 
