import React, { Component } from "react";
import { Row, Col, Well, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import Cart from "./Cart";
import { Grid, Thumbnail, Glyphicon, Panel } from "react-bootstrap";

class ProductItem extends Component {
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
  render() {
    return (
      // <Grid>
      //   <Row>
      //     <Col>
      //       <Thumbnail src={this.props.product.imageURL} alt="242x200">
      //       <div>
      //         <h4>{this.props.product.title}</h4>
      //         </div>
      //         <p>{this.props.product.description}</p>
      //         <p>
      //           {/* <Button bsStyle="primary">Button</Button>&nbsp; */}
      //           <h4>usd.{this.props.product.price}</h4>

      //           <Button
      //             bsStyle="primary"
      //             onClick={() => this.handleCart(this.props.product)}
      //           >
      //             <Glyphicon glyph="glyphicon glyphicon-shopping-cart" />
      //             Add to cart
      //           </Button>
      //         </p>
      //       </Thumbnail>
      //     </Col>
      //   </Row>
      // </Grid>
      <div className="container" id="productContainer">
        <div className="galleryItem">
          <a href="#">
            <img src={this.props.product.imageURL} alt="" />
          </a>
          <h5>{this.props.product.title}</h5>
          <p>{this.props.product.description}</p>
        </div>
      </div>
    );
    {
      /* // <div className="container">
      //   <div className="card-deck">
      //     <div className="card">
      //       <img src={this.props.product.imageURL} alt="" />

      //       <h5 className="card-title">{this.props.product.title}</h5>
      //       <p>{this.props.product.description}</p>
      //       <h3>usd.{this.props.product.price}</h3>
      //     </div>
      //   </div>
      // </div> */
    }
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
    incrementQuantity: product =>
      dispatch(actionCreators.incrementQuantity(product)),
    onAddtoCartBtnClick: product => dispatch(actionCreators.addToCart(product))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem);

{
  /* <Well>
<Row>
  <Col xs={12}>
    <h6>{this.props.product.title}</h6>
    {/* <img src={this.props.product.imageURL} /> */
}
{
  /* //     <p> {this.props.product.description}</p>
//     <h6>{this.props.product.price}</h6>
//     <Button */
}
{
  /* //       bsStyle="primary"
//       onClick={() => this.handleCart(this.props.product)}
//     >
//       Add to cart
//     </Button> */
}
{
  /* //   </Col>
// </Row>
// </Well> */
}

{
  /* <div className="card mb-3" style={{ border: "1px solid grey" }}>
        <img
          style={{ height: "200px", width: "100%", display: "block" }}
          src={this.props.product.imageURL}
          alt="Card image"
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.product.title}</h5>

          <p className="card-text">{this.props.product.description}</p>
        </div>

        <div className="card-body">
          <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div>
      </div> */
}
