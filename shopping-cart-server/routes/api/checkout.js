const express = require("express");
const router = express.Router();

const stripe = require("stripe")("sk_test_d6njkOz1nXs0eUG6ukbgUA9b");

// function handleRedirect(req, res) {
//   res.redirect("http://localhost:5000/success");
// }
// router.get("/charge", handleRedirect);

router.post("/charge", (req, res, next) => {
  console.log(req.body);
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount: req.body.totalAmount,
        description: "Shopping Cart Application",
        currency: "usd",
        source: req.body.token.id
      })
    )
    .then(charge => {
      console.log(charge);
      res.json(charge);
    })
    .catch(next);
});

//     res.json({ status });
//   } catch (err) {
//     res.status(500).end();
//   })
// });
module.exports = router;

// router.post("/charge", async (req, res) => {
//   try {
//     let { status } = await stripe.charges.create({
//       amount: 2000,
//       currency: "usd",
//       description: "An example charge",
//       source: req.body
//     });

//     res.json({ status });
//   } catch (err) {
//     res.status(500).end();
//   }
// });
// module.exports = router;
