import express from "express";
import Stripe from "stripe";

const router = express.Router();

const KEY = process.env.STRIPE_KEY;
const stripe = Stripe(KEY);

router.post("/payment", (request, response, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        next(stripeErr);
      } else {
        response.status(200).json(stripeRes);
      }
    }
  );
});

export default router;
