import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import { Panel, Grid, Col, Row, Button } from "react-bootstrap";
import ProductItem from "./ProductItem";
import ProductsForm from "./ProductsForm";
import Cart from "./Cart";

class ProductsList extends Component {
  componentDidMount() {
    this.props.onPopulateProducts();
  }

  render() {
    let productsList = this.props.products.map(product => {
      return (
        // <Col xs={12} sm={6} md={4} lg={4} key={product._id} id="productItemCol">
        <Panel id="productContainer">
          {" "}
          <ProductItem product={product} />
        </Panel>
      );
    });

    return <Grid className="container">{productsList}</Grid>;
  }
}

const mapStateToProps = state => {
  return {
    products: state.productReducer.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPopulateProducts: () => dispatch(actionCreators.populateProducts())
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
