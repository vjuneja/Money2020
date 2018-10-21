import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from '../header'
import Accounts from '../accounts'

import { routeTo } from '../router'

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
              total: 1000,
              overCharge: {
                amount: -50,
                date: "Sat Oct 20 2018 17:27:50 GMT-0700"
              }
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
        <button
          className="mui-btn mui-btn--primary"
          onClick={routeTo('transaction')}
        >
          Add transaction
        </button>
    </div>
    );
  }
}

HomePage.propTypes = {
    test: PropTypes.string
}

export default HomePage;
