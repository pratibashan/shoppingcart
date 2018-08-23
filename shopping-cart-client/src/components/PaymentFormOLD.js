import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default class PaymentForm extends React.Component {
  onToken = token => {
    fetch("http://localhost:3000/save-stripe-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
  };

  // ...

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_C1ACimNWUqxChPviGxnzN9hi"
      />
      // <div>
      //   <form action="/your-server-side-code" method="POST">
      //     <script
      //       src="https://checkout.stripe.com/checkout.js"
      //       class="stripe-button"
      //       data-key="pk_test_C1ACimNWUqxChPviGxnzN9hi"
      //       data-amount="999"
      //       data-currency="EUR"
      //       data-name="My Company"
      //       data-description="My Book"
      //       data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
      //       data-locale="auto"
      //     />
      //   </form>
      // </div>
    );
  }
}
// fetch("http://localhost:3000/save-stripe-token", {
//   method: "POST",
//   body: JSON.stringify(token)
// }).then(response => {
//   response.json().then(data => {
//     alert(`We are in business, ${data.email}`);
//   });
// });
