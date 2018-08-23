const express = require("express");
const router = express.Router();
const Product = require("../../schemas/productSchema");

router.get("/", (req, res, next) => {
  Product.find()
    .then(products => {
      res.json({
        products
      });
    })
    .catch(next);
});

router.get("/productdetails/:id", (req, res, next) => {
  console.log(req.params.id);
  Product.findById({
    _id: req.params.id
  })
    .then(foundProduct => {
      res.json({
        foundProduct
      });
    })
    .catch(next);
});

router.post("/addproduct", (req, res, next) => {
  console.log(req.body);
  Product.create({
    imageURL: req.body.imageURL,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  })
    .then(savedProduct => {
      console.log(savedPost);
      res.json({
        savedProduct
      });
    })
    .catch(next);
});
router.post("/addreview", (req, res, next) => {
  console.log(req.body.productId);
  console.log(req.body.reviewRating);

  Product.findByIdAndUpdate(
    { _id: req.body.productId },
    { $addToSet: { reviews: req.body.reviewRating } }
  )

    .then(updatedProduct => {
      //console.log(savedPost)
      res.json(updatedProduct);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Product.remove({
    _id: req.params.id
  })
    .then(removedProduct => {
      res.json({
        removedProduct
      });
    })
    .catch(next);
});

module.exports = router;
