import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

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
    </div>
    );
  }
}

HomePage.propTypes = {
    test: PropTypes.string
}

export default HomePage;