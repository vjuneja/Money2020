import React, { Component } from "react";
import PropTypes from "prop-types";
import BasePage from '../base-page'
import Accounts from '../accounts'
import Chart from '../chart'
import { routeTo } from '../router'
import './home-page.css'

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
        <div>
            <Chart test="chart"/>
            {response && <Accounts
              accounts={response.account}
              today={today}
            />}
            <div className="mui-container">
              <button
                style={{"width": "100%", "margin": "1rem 0"}}
                className="mui-btn mui-btn--primary"
                onClick={routeTo('transaction')}>
                Add transaction
              </button>
            </div>
          </div>
      </BasePage>
    );
  }
}

HomePage.propTypes = {
  response: PropTypes.object,
}

export default HomePage;
