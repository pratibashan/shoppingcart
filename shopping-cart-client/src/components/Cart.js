import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import StripeCheckout from "react-stripe-checkout";

import { Modal, Panel, Well, Grid, Col, Row } from "react-bootstrap";
import { Button, ButtonGroup, Label, Glyphicon } from "react-bootstrap";
import { Link } from "react-router-dom";

class Cart extends Component {
  handleStripeToken = token => {
    let totalAmount = Math.round(parseInt(this.props.total).toFixed(2) * 100);
    let order = { token: token, totalAmount: totalAmount };
    console.log(token);

    fetch("http://localhost:3000/api/stripe/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json) {
          this.props.history.push("/success");
        } else {
          alert("Your order is not saved..Try again!");
        }
      });
  };
  render() {
    console.log("In Cart Component");
    //console.log(this.props.cartItemsList);
    console.log(this.props.total);
    console.log(this.props.cartItemsList[0]);
    if (this.props.cartItemsList[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  renderEmpty() {
    return (
      <Well id="emptyCart">
        <h3>There are no items in the cart</h3>
      </Well>
    );
  }
  renderCart() {
    let cartItemsList = this.props.cartItemsList.map(cartItem => {
      return (
        <Panel key={cartItem._id} id="cartPanel">
          <Row id="cartRow">
            <Col xs={12} md={2}>
              <img id="cartImage" src={cartItem.imageURL} />
              <span> </span>
            </Col>
            <Col xs={12} md={3}>
              <h6 id="cartHeading">{cartItem.title}</h6>
              <span> </span>
            </Col>
            <Col xs={12} md={2}>
              <h6 id="cartHeading">usd.{cartItem.price}</h6>
            </Col>
            <Col xs={12} md={2}>
              <h6 id="cartHeading">
                qty. <Label bsStyle="success">{cartItem.quantity}</Label>
              </h6>
            </Col>
            <Col xs={12} md={3}>
              <ButtonGroup style={{ minWidth: "30px" }} id="cartBtn">
                <Button
                  bsStyle="default"
                  bsSize="small"
                  onClick={() => this.props.decrementBtnClick(cartItem)}
                >
                  -
                </Button>

                <Button
                  bsStyle="default"
                  bsSize="small"
                  onClick={() => this.props.incrementBtnClick(cartItem)}
                >
                  + <span> </span>
                </Button>

                <span> </span>
              </ButtonGroup>
              <Button
                id="trashIconBtn"
                className="glyphicon glyphicon-trash"
                style={{ color: "red" }}
                onClick={() => this.props.deleteCartItemBtnClick(cartItem)}
              >
                {/* <span
                  className="glyphicon glyphicon-trash"
                  style={{ color: "red" }}
                /> */}
              </Button>
            </Col>
          </Row>
        </Panel>
      );
    });

    return (
      <Grid fluid id="cartGrid">
        <Panel bsStyle="primary" id="cartMainPanel">
          <Panel.Heading id="cartPanelHeader">
            <h3>Shopping Cart</h3>
          </Panel.Heading>
          {cartItemsList}
          <Row>
            <Col xs={12}>
              <StripeCheckout
                amount="Math.round({`{this.props.total}00`})"
                // amount="20000"
                name="Happy Shop"
                description="Shopping Cart Application"
                zipCode={false}
                billingAddress={true}
                token={token => this.handleStripeToken(token)}
                // token={token => this.props.handleStripeTokenBtnClick(token)}
                stripeKey="pk_test_C1ACimNWUqxChPviGxnzN9hi"
              >
                <Button id="checkoutBtn" bsStyle="success">
                  Proceed to Checkout
                </Button>
              </StripeCheckout>

              <span id="totalAmount">
                Total :<span> </span>
                <b>${this.props.total}</b>
              </span>
            </Col>
          </Row>
        </Panel>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.cartReducer);
  return {
    cartItemsList: state.cartReducer.cartItems,
    total: state.cartReducer.total
  };
};
const mapDispatchToProps = dispatch => {
  return {
    incrementBtnClick: cartItem =>
      dispatch(actionCreators.incrementQuantity(cartItem)),
    decrementBtnClick: cartItem =>
      dispatch(actionCreators.decrementQuantity(cartItem)),
    deleteCartItemBtnClick: cartItem =>
      dispatch(actionCreators.deleteCartItem(cartItem))
    // handleStripeTokenBtnClick: token =>
    //   dispatch(actionCreators.handleStripeToken(token))

    // saveCartBtnClick: this.props.cartItemsList =>
    //   dispatch(
    //     actionCreators.saveCart(this.props.cartItemsList)
    //   )
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

{
  /* <Button
id="checkoutBtn"
bsStyle="success"
onClick={() => this.handleShow()}
>
Proceed to Checkout
</Button> */
}
