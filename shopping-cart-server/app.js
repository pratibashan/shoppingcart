const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/api/users");
const productRoutes = require("./routes/api/products");
const checkoutRoutes = require("./routes/api/checkout");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(err => {
    console.log("Not Connected to Database ERROR!", err);
  });

// app.use(session({
//   secret: 'blog',
//   resave: false,
//   saveUninitialized: true,
//   store: new MongoStore({
//     url: db,
//     ttl: 14 * 24 * 60 * 60 // = 14 days. Default
//   })
// }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stripe", checkoutRoutes);
// server static assets if it is production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("shopping-cart-client/build"));
}
// app.use(express.static("public"));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(public, "index.html"));
// });
app.use(function(err, req, res, next) {
  //console.log(err)
  res.status(err.status || 500).json({
    status: "error",
    message: err.message
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
