const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

// const Razorpay = require('razorpay');
// const instance= new Razorpay({
//     key_id: 'rzp_test_ndeuf3koWE9dH4',
//     key_secret: 'CvimHAGkgie3VWdd5pN5Cg4k'
// });


// const checkout = async (req, res) => {
//   const { amount } = req.body
//   const option = {
//       amount: amount * 100,
//       currency: "INR"
//   }
//   const order = await instance.orders.create(option) 
//   res.json({
//       success: true,
//       order
//   })
// }

// const paymentVerification = async (req, res) => {
//   const { razorpayOrderId, razorpayPaymeentId} = req.body
//   res.json({
//       razorpayOrderId, razorpayPaymeentId
//   })
// }

// module.exports = {
//   checkout, paymentVerification
// }