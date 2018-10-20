import React, { Component } from "react";
import PropTypes from "prop-types";
import Service from "../../app/Service"
import Accounts from '../accounts'

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
        <h2>App</h2>
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
