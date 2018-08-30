import React, { Component } from "react";
import { Panel } from "react-bootstrap";
export default class Confirmation extends Component {
  render() {
    return (
      <Panel id="confirmPanel">
        <Panel.Heading>Thanks for your order...</Panel.Heading>
        <Panel.Body>Your orders will be shipped it to you 2 days</Panel.Body>
      </Panel>
    );
  }
}
