const User = require("../models/user");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getSubscriptionPrices = async (req, res) => {
  try {
    const prices = await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET_KEY,
    });

    if (prices)
      return res.status(200).json({
        success: true,
        prices,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.stripeSession = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });

    if (user) {
      const session = await stripe.checkout.sessions.create(
        {
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
            {
              price: req.body.priceId,
              quantity: 1,
            },
          ],
          success_url: `http://localhost:3000/articles`,
          cancel_url: `http://localhost:3000/subscription-plans`,
          customer: user.stripeCustomerId,
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );

      return res.status(200).json({
        success: true,
        // message: `Congrats ${session?.customer_details?.email}`,
        session,
      });
    }
  } catch (error) {}
};
