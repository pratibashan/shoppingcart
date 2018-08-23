import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        Copyright &copy;{new Date().getFullYear()} Happyshop
      </footer>
    );
  }
}
export default Footer;
