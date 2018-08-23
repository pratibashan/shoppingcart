import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {
  Grid,
  Row,
  Col,
  Well,
  Panel,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from "react-bootstrap";
import "../Styles.css";

class ProductsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      products: []
    };
  }
  componentDidMount() {
    this.populateProducts();
  }

  populateProducts() {
    fetch("http://localhost:3000/api/products")
      .then(response => response.json())
      .then(json => {
        this.setState({
          products: json.products
        });
      });
  }

  handleTextChange = e => {
    this.setState({
      product: {
        ...this.state.product,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.product);
  };

  handleOptionChange = e => {
    console.log(this.state);
    console.log(e.target.value);
    this.setState({ optionValue: e.target.value });
  };

  handleFocus = e => {
    this.setState({ optionValue: "" });
  };

  handleSaveProduct = () => {
    let product = {
      title: this.state.title,
      imageURL: this.state.imageURL,
      description: this.state.description,
      price: this.state.price
    };
    console.log(product);
    this.props.saveProductBtnClick(product);

    // this.setState({
    //   price: ""
    // });
  };

  render() {
    let productsList = this.state.products.map(product => {
      return (
        <option value={product._id} key={product._id}>
          {product.title}
        </option>
      );
    });
    return (
      <Grid>
        <Row className="show-grid">
          <Col>
            {/* add product form */}
            <Well>
              <Panel id="productsAddFormPanel">
                <Form>
                  <FormGroup
                    controlId="title"
                    id="productsAddForm"
                    // validation={this.props.validation}
                  >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                      type="text"
                      onChange={this.handleTextChange}
                      name="title"
                      placeholder="Product Title"
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="imageURL"
                    // validation={this.props.validation}
                  >
                    <ControlLabel>ImageURL</ControlLabel>
                    <FormControl
                      type="text"
                      onChange={this.handleTextChange}
                      name="imageURL"
                      placeholder="ImageURL"
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="description"
                    // validation={this.props.validation}
                  >
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                      type="text"
                      onChange={this.handleTextChange}
                      name="description"
                      placeholder="Product Description"
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="price"
                    // validation={this.props.validation}
                  >
                    <ControlLabel>Price</ControlLabel>
                    <FormControl
                      type="text"
                      onChange={this.handleTextChange}
                      name="price"
                      value={this.state.price}
                      placeholder="Product Price"
                    />
                  </FormGroup>
                  <Button bsStyle="success" onClick={this.handleSaveProduct}>
                    Save Product
                    {/* {!this.props.msg ? "Save Product" : this.props.msg} */}
                  </Button>
                </Form>
              </Panel>
            </Well>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col>
            <Well>
              {/* delete product form */}
              <Panel style={{ marginTop: "25px" }} id="productsDeleteFormPanel">
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select a product to delete</ControlLabel>
                  <FormControl
                    name="select"
                    value={this.state.optionValue}
                    onChange={this.handleOptionChange}
                    componentClass="select"
                    placeholder="select"
                  >
                    <option onFocus={this.handleFocus} value="select">
                      select
                    </option>
                    {productsList}
                  </FormControl>
                </FormGroup>
                <div />
                <Button
                  id="productDeleteBtn"
                  bsStyle="danger"
                  onClick={() =>
                    this.props.deleteProductBtnClick(this.state.optionValue)
                  }
                >
                  Delete Product
                </Button>
              </Panel>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.productReducer.msg);
  return {
    products: state.productReducer.products
    // msg: state.productReducer.msg,
    // style: state.productReducer.style,
    // validation: state.productReducer.validation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPopulateProducts: () => dispatch(actionCreators.populateProducts()),
    saveProductBtnClick: product =>
      dispatch(actionCreators.saveProduct(product)),
    deleteProductBtnClick: productId =>
      dispatch(actionCreators.deleteProduct(productId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsForm);
