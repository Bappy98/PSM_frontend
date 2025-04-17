import fetchWrapper from "@/util/fetchWrapper";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const stripe = useStripe();
  const location = useLocation();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardholderName, setCardholderName] = useState("");
  const [email, setEmail] = useState("");
  const data = location.state;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTimeout(() => {
      setLoading(true);
    }, 4000);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    try {
      await fetchWrapper.post("/order", data);
      navigate("/my-order");
    } catch (error) {}

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: cardElement,
    //   billing_details: {
    //     name: cardholderName,
    //     email: email,
    //   },
    // });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setError(null);
      console.log("PaymentMethod:", paymentMethod);
      // Handle successful payment here
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-700 text-center mb-5">
        Complete Your Payment
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter cardholder name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "18px",
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                    padding: "10px 12px",
                  },
                  
                },
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-500 transition-colors duration-300"
          disabled={!stripe || loading}
        >
          {loading ? (
            <svg
              className="animate-spin mx-auto h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Pay Now"
          )}
        </button>
      </form>
    </div>
  );
}

export default Payment;
