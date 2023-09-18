const stripe = require("stripe")(
  // "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"
  "sk_test_BJjksfNxX8NfCXAshQJ3UFPH009jCbaktY"
);

// "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"

exports.processPayment = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(req.body.amount * 100),
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { integration_check: "accept_a_payment" },
    });

    return res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Send Stripe API Key  =>  /api/v1/stripeapi
exports.sendStripeApi = async (req, res, next) => {
  try {
    res.status(200).json({
      stripeApiKey:
        // "pk_live_51ItZ8fIUmdryxM0a17hnB3DGSpj5sOiazohAOoLB2VUE0QkIiglVa7POozZLIt6WNh7wS6IbbfNrPW4l5OYj2ifm009D2smJjb",
        "pk_test_tLdmP06wdjtZhFEQVBXupECD00n5VPVlQk",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
