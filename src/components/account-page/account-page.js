import { routeTo } from '../router'
import React, { Component } from "react";
import PropTypes from "prop-types";
import BasePage from '../base-page'

class AccountPage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
        <BasePage>
            <div>Account details</div>
        </BasePage>
    );
  }
}

AccountPage.propTypes = {
    test: PropTypes.string
}

export default AccountPage;
