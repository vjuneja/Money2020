import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Chart from "../chart"

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      title: "homepage"
    };
  }
  render() {
    return (
    <div>
        <h1>{this.state.title}</h1>
        <span>{this.props.test}</span>
        <Chart test="chart" />
    </div>
    );
  }
}

HomePage.propTypes = {
    test: PropTypes.string
}

export default HomePage;
