import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { StyledEngineProvider } from "@mui/material";

import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QAtZUF4eKMNHqeeOSjlNLNzA24VB4bpI2i0kZaSJ4950lVbsOCDTG5HMkKUyQ9j7GSjFkKiTuJsYbaFkLwUNAfW00TN8CWXxg')

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <StyledEngineProvider>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <App/>
        </Elements>
      </Provider>
    </StyledEngineProvider>
  </>
);
