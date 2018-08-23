import React, { Component } from "react";
import "./App.css";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./components/CheckoutForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
          {/* <div className="example">
            <h1>React Stripe Elements Example</h1> */}

          <Elements>
            <CheckoutForm />
          </Elements>
          {/* </div> */}
        </StripeProvider>
      </div>
    );
  }
}

export default App;
