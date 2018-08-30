import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {
  Grid,
  Row,
  Col,
  Panel,
  Button,
  Glyphicon,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 1
    };
  }
  componentDidMount() {
    let productId = this.props.match.params.productId;
    this.props.onPopulateProductDetails(productId);
  }

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

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    const { rating } = this.state;

    let productItems = (
      <Row id="movieDetailsRow">
        <Col sm={6} md={4} id="productItemImageCol">
          <img
            id="productDetailsImage"
            src={this.props.productDetails.imageURL}
            alt={this.props.productDetails.title}
          />{" "}
        </Col>
        <Col sm={6} md={8} id="productDetailsCol">
          <Panel id="productDetailsPanel">
            {/* <Panel.Heading>{this.props.productDetails.title}</Panel.Heading> */}
            <ListGroup id="productDetailsList">
              <ListGroupItem>
                <h3>{this.props.productDetails.title}</h3>
              </ListGroupItem>
              <ListGroupItem>
                {this.props.productDetails.description}
              </ListGroupItem>
              <ListGroupItem>
                <h4 id="priceheader">${this.props.productDetails.price}</h4>
              </ListGroupItem>
            </ListGroup>

            <Button
              id="productDetailsBtn"
              bsStyle="warning"
              bsSize="large"
              block
              onClick={() => this.handleCart(this.props.productDetails)}
            >
              <Glyphicon glyph="glyphicon glyphicon-shopping-cart" />
              Add to cart
            </Button>
            <br />
            <br />
            <Panel id="reviewPanel">
              <StarRatingComponent
                id="star"
                name="rate1"
                starCount={5}
                value={rating}
                onStarClick={this.onStarClick.bind(this)}
              />

              <Button
                bsStyle="default"
                onClick={() =>
                  this.props.addReviewBtnClick(
                    this.props.productDetails,
                    this.state.rating
                  )
                }
              >
                Add Review
              </Button>
            </Panel>
          </Panel>
        </Col>{" "}
      </Row>
    );

    return <Grid>{productItems}</Grid>;
  }
}

const mapStateToProps = state => {
  console.log(state.productReducer.productDetails);
  return {
    productDetails: state.productReducer.productDetails,
    cartItemsList: state.cartReducer.cartItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPopulateProductDetails: productId =>
      dispatch(actionCreators.populateProductDetails(productId)),
    incrementQuantity: product =>
      dispatch(actionCreators.incrementQuantity(product)),
    onAddtoCartBtnClick: product => dispatch(actionCreators.addToCart(product)),

    addReviewBtnClick: (productDetails, reviewRating) =>
      dispatch(actionCreators.saveReview(productDetails, reviewRating))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
