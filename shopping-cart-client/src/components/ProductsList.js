import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";

import { Grid, Col, Row, Thumbnail } from "react-bootstrap";

class ProductsList extends Component {
  componentDidMount() {
    this.props.onPopulateProducts();
  }

  //update quantity in the cart
  handleCart(product) {
    if (this.props.cartItemsList.length > 0) {
      let cartIndex = this.props.cartItemsList.findIndex(item => {
        return item._id === product._id;
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
              <br />
              <h5 id="priceheader">${product.price}</h5>

              <StarRatingComponent
                id="star"
                name="rate1"
                starCount={5}
                value={average}
              />
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
