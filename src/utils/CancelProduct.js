import axios from 'axios';
const adminEMail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
function CancelProdChargeAfterTwentyFourHr(orderStatusDate) {
  try {

    const orderDate = new Date(orderStatusDate);

    if (isNaN(orderDate.getTime())) {
      throw new Error('Invalid date format');
    }

    const currentDate = new Date();

    const diffInMs = currentDate - orderDate;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    const CHARGE_THRESHOLD_HOURS = 24;
    const CANCELLATION_CHARGE = 50;

    if (diffInHours > CHARGE_THRESHOLD_HOURS) {
      return CANCELLATION_CHARGE;
    } else {
      return 0;
    }
  } catch (error) {
    console.error(`Error in cancelProdChargeAfterTwentyFourHr: ${error.message}`);
    return error.message;
  }
}


function ReturnProductBeforeFourteenDays(orderStatusDate) {
  const orderDate = new Date(orderStatusDate);
  const currentDate = new Date();
  const diffInMs = currentDate - orderDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}

async function sendCancellationEmailToClient(ProdData) {
  const { prod_id, user_id, extraCharge, order_id } = ProdData;

  // Create HTML content for the email
  const htmlContent = `
    <html>
      <body>
        <h1>Product Cancellation Notification</h1>
        <p>Dear Client,</p>
        <p>This is to inform you that a product has been cancelled from an order. Here are the details:</p>
        <ul>
          <li>Product ID: ${prod_id}</li>
          <li>Order ID: ${order_id}</li>
          <li>User ID: ${user_id}</li>
          <li>Extra Charge Applied: $${extraCharge}</li>
        </ul>
        <p>Please update your records accordingly.</p>
        <p>Best regards,<br>National Plastic System</p>
      </body>
    </html>
  `;

  // Prepare the email data
  const emailData = {
    to: adminEMail, // Use an environment variable for the client's email
    subject: 'Product Cancellation Notification',
    htmlContent: htmlContent
  };

  try {
    // Send the email using the Resend API
    const response = await axios.post(`/api/resend`, emailData);

    if (response.data.status === 200) {
      console.log('Cancellation email sent successfully to client');
      return true;
    } else {
      console.error('Failed to send cancellation email to client');
      return false;
    }
  } catch (error) {
    console.error('Error sending cancellation email to client:', error);
    return false;
  }
}
async function cancelOrderMail(orderData) {
  const { order_id, cancelReason, email } = orderData;

  const htmlContent = `
    <html>
      <body>
        <h1>Order Cancellation Notification</h1>
        <p>Dear Customer,</p>
        <p>This is to inform you that your order has been cancelled. Here are the details:</p>
        <ul>
          <li>Order ID: ${order_id}</li>
          <li>Cancellation Reason: ${cancelReason}</li>
        </ul>
        <p>If you have any questions or concerns, please don't hesitate to contact our customer support.</p>
        <p>Thank you for your understanding.</p>
        <p>Best regards,<br>National Plastic System</p>
      </body>
    </html>
  `;

  // Prepare the email data
  const emailData = {
    to: email, // Use an environment variable for the customer's email
    subject: 'Order Cancellation Notification',
    htmlContent: htmlContent
  };

  try {
    // Send the email using the Resend API
    const response = await axios.post(`/api/resend`, emailData);


  } catch (error) {
    console.error('Error in cancelOrderMail:', error);
    throw error;
  }
}


async function sendOrderStatusUpdateEmail(orderData) {
  const { order_id, newStatus, customer_email } = orderData;

  const htmlContent = `
    <html>
      <body>
        <h1>Order Status Update</h1>
        <p>Dear Customer,</p>
        <p>We're writing to inform you that the status of your order has been updated. Here are the details:</p>
        <ul>
          <li>Order ID: ${order_id}</li>
          <li>New Status: ${newStatus}</li>
        </ul>
        <p>If you have any questions about this update or need further information, please don't hesitate to contact our customer support.</p>
        <p>Thank you for choosing our service.</p>
        <p>Best regards,<br>National Plastic System</p>
      </body>
    </html>
  `;

  // Prepare the email data
  const emailData = {
    to: customer_email,
    subject: 'Order Status Update',
    htmlContent: htmlContent
  };

  try {
    // Send the email using the Resend API
    const response = await axios.post(`/api/resend`, emailData);
    console.log('Status update email sent successfully');
    return response.data;
  } catch (error) {
    console.error('Error in sendOrderStatusUpdateEmail:', error);
    throw error;
  }
}

export { ReturnProductBeforeFourteenDays, CancelProdChargeAfterTwentyFourHr, sendCancellationEmailToClient, cancelOrderMail, sendOrderStatusUpdateEmail };
