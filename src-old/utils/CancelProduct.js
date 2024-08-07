function CancelProdChargeAfterTwentyFourHr(orderStatusDate) {
  const orderDate = new Date(orderStatusDate);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = currentDate - orderDate;

  // Convert milliseconds to hours
  const diffInHours = diffInMs / (1000 * 60 * 60);

  // Check if the difference is more than 24 hours after order status updated to confirmation (2). at the time of status update need to update date also
    if (diffInHours > 24) {
      return 50; // Charge 50 INR
    } else {
      return 0; // No charge
    }
}


function ReturnProductBeforeFourteenDays(orderStatusDate){
  const orderDate = new Date(orderStatusDate);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = currentDate - orderDate;

  // Convert milliseconds to hours
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}

export default CancelProdChargeAfterTwentyFourHr;

export  {ReturnProductBeforeFourteenDays}; 

//1042614565  86400000