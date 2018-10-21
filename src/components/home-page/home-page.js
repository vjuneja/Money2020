import React, { Component } from "react";
import PropTypes from "prop-types";
import BasePage from '../base-page'
import Accounts from '../accounts'

import { routeTo } from '../router'

class HomePage extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      response,
      today,
    } = this.props
    return (
      <BasePage>
        {response && <Accounts
          accounts={response.account}
          today={today}
        />}

        <button
          className="mui-btn mui-btn--primary"
          onClick={routeTo('transaction')}
        >
          Add transaction
        </button>
      </BasePage>
    );
  }
}

HomePage.propTypes = {
  response: PropTypes.object,
}

export default HomePage;
