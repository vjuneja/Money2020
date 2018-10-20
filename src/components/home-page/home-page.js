import React, { Component } from "react";
import PropTypes from "prop-types";
import Service from "../../app/Service"

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      title: "homepage"
    };
  }
  componentDidMount() {
    new Service().getAccounts()
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
