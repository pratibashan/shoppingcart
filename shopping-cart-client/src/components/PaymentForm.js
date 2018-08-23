// import React from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { connect } from "react-redux";
// import * as actionCreators from "../store/actionCreators";
// import { Form, Grid, Button, Panel, Table, Well, Modal } from "react-bootstrap";
// class PaymentForm extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       show: false
//     };
//   }

//   handleClose() {
//     this.setState({ show: false });
//   }

//   handleShow() {
//     this.setState({ show: true });
//   }
//   // submitForm = e => {
//   //   e.preventDefault();
//   //   this.props.history.push("/success");
//   // };

//   render() {
//     return (
//       <Grid container>
//         <Panel bsStyle="primary">
//           <Panel.Heading>
//             <Panel.Title componentClass="h3" id="orderTitleHeading">
//               Order Summary
//             </Panel.Title>
//           </Panel.Heading>
//           <Panel.Body>
//             <span id="totalSpan">
//               Total Amount({this.props.cartItemsList.length}items)
//             </span>
//             <span> </span>
//             <h6 id="totalHeading">{this.props.total}</h6>
//           </Panel.Body>
//           {/* <Panel.Footer> */}
//           {/* <Form onSubmit={this.submitForm}> */}
//           <StripeCheckout
//             amount="Submit"
//             name="Happy Shop"
//             description="Shopping Cart Application"
//             zipCode={false}
//             billingAddress={true}
//             token={token => this.props.handleStripeTokenBtnClick(token)}
//             stripeKey="pk_test_C1ACimNWUqxChPviGxnzN9hi"
//           >
//             <Button
//               bsStyle="primary"
//               bsSize="large"
//               id="orderBtn"
//               // onClick={() => this.handleShow()}
//             >
//               Order
//             </Button>
//           </StripeCheckout>
//           {/* </Form> */}
//           {/* </Panel.Footer> */}
//         </Panel>

//         <Modal show={this.state.show} onHide={() => this.handleClose()}>
//           <Modal.Header closeButton>
//             <Modal.Title>Your Order has been saved</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <h6>Order Summary</h6>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={() => this.handleClose()}>Close</Button>
//           </Modal.Footer>
//         </Modal>
//       </Grid>
//     );
//   }
// }

// const mapStateToProps = state => {
//   console.log(state.cartReducer);
//   return {
//     cartItemsList: state.cartReducer.cartItems,
//     total: state.cartReducer.total
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     handleStripeTokenBtnClick: token =>
//       dispatch(actionCreators.handleStripeToken(token))
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PaymentForm);

// {
//   /* <Table responsive striped bordered condensed hover id="orderTable">
//           <thead>
//             <tr>
//               <th>No.</th>
//               <th>Title</th>
//               <th>Quantity</th>
//               <th>Price</th>
//             </tr>
//           </thead>
//           <tbody> {cartItemsList}</tbody>
//           </Table> */
// }
