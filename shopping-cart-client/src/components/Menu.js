import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actionCreators from "../store/actionCreators";
import { Nav, NavItem, Navbar, Badge, Glyphicon } from "react-bootstrap";
import "../Styles.css";
//import "../../images/happyshop.png";
class Menu extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              <img src="../images/happyshop.png" style={{ width: 170 }} />
              {/* <img src="/images/happyshop.png" /> */}
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
              {/* <NavLink to="/about">About</NavLink> */}
            </NavItem>
            <NavItem eventKey={2}>
              {/* <NavLink to="/contactus">About</NavLink> */}
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} id="textMenu">
              <NavLink to="/" className="menuLink">
                Products
              </NavLink>
            </NavItem>
            <NavItem eventKey={2} id="textMenu">
              <NavLink to="/admin" className="menuLink">
                Admin
              </NavLink>
            </NavItem>
            <NavItem eventKey={3}>
              <NavLink className="menuLink" to="/cart">
                <Glyphicon
                  glyph="glyphicon glyphicon-shopping-cart"
                  id="cartIcon"
                >
                  {/* {this.props.cartItems.length} */}
                </Glyphicon>
                <Badge id="badge">{this.props.cartItems.length}</Badge>
              </NavLink>
              {/* <Glyphicon glyph="glyphicon glyphicon-shopping-cart" /> */}
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      // <div id="menu">
      //   {/* <NavLink exact to="/">
      //     Product
      //   </NavLink> */}
      //   <NavLink to="/admin">Admin</NavLink>
      //   <NavLink to="/cart">Cart({this.props.cartItems.length})</NavLink>
      // </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartReducer.cartItems
  };
};

export default connect(
  mapStateToProps,
  null
)(Menu);
