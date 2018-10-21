import { routeTo } from '../router'
import React, { Component } from "react";
import PropTypes from "prop-types";
import _get from 'lodash/get'
import BasePage from '../base-page'
import { formatterFull } from '../../utils'
import { cancelRecurringTransaction } from '../../scripts/balances'
import Chart from '../chart'


const RecurringEvent = ({ recurringPayment, account }) => {
  const { amount, description, category } = recurringPayment
  const cancelPayment = () => {
    account = cancelRecurringTransaction(account, recurringPayment)
    // Update account info in state with the one here
  }
  return (
    <div className="mui-panel">
       <div>{description.simple} - {formatterFull.format(amount.amount)}</div>
       <div style={{"fontSize": "12px", "color": "grey"}}>Category: {category}</div>
       <div><a href="javascript:;" onClick={cancelPayment}>Cancel payment </a></div>
    </div>
  )
}

const RecurringEvents = ({recurringEvents, account}) => {
  if(!recurringEvents || !recurringEvents.length) return null
  const events = []
  recurringEvents.forEach(recurringPayment => {
    events.push(<RecurringEvent recurringPayment={recurringPayment} account={account}/>)
  });
  return events
}

class AccountPage extends Component {
  constructor() {
    super();
  }

  updateAccount(account) {
    const { recurringEvents, id, balances } = account
    const chartData = {}
    balances && balances.forEach(ele => {
      chartData[ele.date] = ele.balance.amount
    });
    this.state = { chartData: chartData };
  }

  render() {
    const accountId = window.location.hash.split("=").pop()
    const accounts = _get(this.props, `response.account`)
    const account = accounts.filter((element) => {
      if(element.id == accountId){
        return element
      }
    })[0]
    const { recurringEvents } = account
    this.updateAccount(account);
    return (
        <BasePage>
            <Chart chartData={this.state.chartData}/>
            <div className="mui-container">
              <div style={{"fontWeight": "bold", "margin": "1rem 0", "textAlign": "center"}}>Recurring Payments</div>
              {recurringEvents && recurringEvents.length ? <RecurringEvents recurringEvents={recurringEvents} account={account}/> :
              `You have no recurring payments on this card` }
              
            </div>
        </BasePage>
    );
  }
}

AccountPage.propTypes = {
    test: PropTypes.string
}

export default AccountPage;
