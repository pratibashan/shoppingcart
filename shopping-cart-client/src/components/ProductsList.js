import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";

import {
  Panel,
  Grid,
  Col,
  Row,
  Button,
  Thumbnail,
  Glyphicon
} from "react-bootstrap";
import ProductItem from "./ProductItem";
import ProductsForm from "./ProductsForm";
import Cart from "./Cart";
let sum = 0;
let avg = 0;
class ProductsList extends Component {
  componentDidMount() {
    this.props.onPopulateProducts();
  }

  //update quantity in the cart
  handleCart(product) {
    console.log("Fired");
    if (this.props.cartItemsList.length > 0) {
      let cartIndex = this.props.cartItemsList.findIndex(item => {
        return item._id === product._id;
        console.log("cartIndex");
        console.log(cartIndex);
      });
      //if there is no match found
      if (cartIndex === -1) {
        this.props.onAddtoCartBtnClick(product);
      } else {
        this.props.incrementQuantity(product);
      }
    } else {
      this.props.onAddtoCartBtnClick(product);
    }
  }
  // handleReview = () => {
  //   if (this.props.products.reviews.length > 0) {
  //     let productRatings = this.props.products.reviews.map(review => {
  //       for (var i = 0; i < review.length; i++) {
  //         sum += parseInt(review[i], 10); //don't forget to add the base
  //       }

  //       avg.toFixed = sum / review.length;
  //       this.setState({ rating: avg });
  //       const { rating } = this.state;
  //       <StarRatingComponent
  //         id="star"
  //         name="rate1"
  //         starCount={5}
  //         value={rating}
  //         // onStarClick={this.onStarClick.bind(this)}
  //       />;
  //     });
  //   }
  // };
  render() {
    // const { rating } = this.state;
    let average = 0;
    let productsList = this.props.products.map(product => {
      if (product.reviews) {
        average = product.reviews.reduce(
          (total, review) => (total + review) / product.reviews.length,
          0
        );
      }
      return (
        <Col xs={12} sm={6} md={4} lg={3} key={product._id} id="productItemCol">
          <Link to={`/product-details/${product._id}`}>
            <Thumbnail src={product.imageURL} alt="242x200">
              <div>
                <h6>
                  <b>{product.title}</b>
                </h6>
              </div>

              <p>
                <h5 id="priceheader">${product.price}</h5>

                <StarRatingComponent
                  id="star"
                  name="rate1"
                  starCount={5}
                  value={average}
                  // onStarClick={this.onStarClick.bind(this)}
                />
                {/* <Button
                  id="addToCartBtn"
                  bsSize="small"
                  onClick={() => this.handleCart(product)}
                >
                  <Glyphicon glyph="glyphicon glyphicon-shopping-cart" />
                  Add to cart
                </Button> */}
              </p>
            </Thumbnail>
          </Link>
        </Col>
      );
    });

    return (
      <Grid>
        <Row>{productsList}</Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  console.log("ProductList");
  console.log(state.productReducer.products);
  return {
    products: state.productReducer.products,
    cartItemsList: state.cartReducer.cartItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPopulateProducts: () => dispatch(actionCreators.populateProducts()),
    incrementQuantity: product =>
      dispatch(actionCreators.incrementQuantity(product)),
    onAddtoCartBtnClick: product => dispatch(actionCreators.addToCart(product))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);

{
  /* <Grid id="productItemGrid" debug style={{ lineHeight: "40px" }}>
       
//   <Row id="productItemRow">{productsList}</Row>
// </Grid> */
}

// <Col
//     xs={6}
//     md={4}
//     key={product._id}
//     style={{ height: "500px" }}
//     debug
//     id="productItemCol"
//   >
//     <ProductItem product={product} />
//   </Col>
