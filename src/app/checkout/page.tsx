"use client";
import CheckOutMain from "@/components/checkout/CheckOutMain";
import Wrapper from "@/layout/DefaultWrapper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${process.env.STRIPE_PROMISE_KEY}`);

const Checkout = () => {
  return (
    <>
      <Wrapper>
        <Elements stripe={stripePromise}>
          <CheckOutMain />
        </Elements>
      </Wrapper>
    </>
  );
};

export default Checkout;
