require('dotenv').config();
const Razorpay = require('razorpay');

console.log('Testing Razorpay connection...');
console.log('Key ID:', process.env.RAZORPAY_KEY_ID ? '***' + process.env.RAZORPAY_KEY_ID.slice(-4) : 'not set');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Test connection by fetching orders
razorpay.orders.all({ count: 1 })
  .then(data => {
    console.log('✅ Connection successful!');
    console.log('Found', data.count, 'orders');
    if (data.items && data.items.length > 0) {
      console.log('Latest order:', {
        id: data.items[0].id,
        amount: data.items[0].amount / 100,
        currency: data.items[0].currency,
        status: data.items[0].status
      });
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:');
    console.error('Error:', err.error?.description || err.message);
    console.error('Status code:', err.statusCode);
    console.error('Error code:', err.error?.code);
    process.exit(1);
  });
