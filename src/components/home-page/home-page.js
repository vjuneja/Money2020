import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from '../header'
import Accounts from '../accounts'

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
        <Header/>
        <Accounts
          accounts={[
            {
              id: 1,
              name: 'Checking',
              type: 'checking',
              number: `4`,
              total: 1000
            },
            {
              id: 2,
              name: 'Savings',
              type: 'savings',
              number: `321`,
              total: 2.99
            },
          ]}
        />
    </div>
    );
  }
}

HomePage.propTypes = {
    test: PropTypes.string
}

export default HomePage;
