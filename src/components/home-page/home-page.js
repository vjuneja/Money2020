import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from '../header'

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
        <Header/>
        <span>{this.props.test}</span>
    </div>
    );
  }
}

HomePage.propTypes = {
    test: PropTypes.string
}

export default HomePage;
