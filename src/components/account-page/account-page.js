import { routeTo } from '../router'
import React, { Component } from "react";
import PropTypes from "prop-types";
import _get from 'lodash/get'
import BasePage from '../base-page'
import { formatterFull } from '../../utils'
import { addManualTransaction } from '../../scripts/balances'


const RecurringEvent = ({ recurringPayment, account, onCancel }) => {
  const { amount, description, categoryType } = recurringPayment
  const cancelPayment = () => onCancel(account, amount.amount)
  return (
    <div className="mui-panel">
       <div>{description.simple}</div>
       {/* <div>{categoryType}</div> */}
       <div>{formatterFull.format(amount.amount)} - <a href="javascript:;" onClick={cancelPayment}>Cancel payment </a></div>
    </div>
  )
}

const RecurringEvents = ({recurringEvents, account, onCancel}) => {
  if(!recurringEvents || !recurringEvents.length) return null
  const events = []
  recurringEvents.forEach(recurringPayment => {
    events.push(<RecurringEvent recurringPayment={recurringPayment} account={account} onCancel={onCancel}/>)
  });
  return events
}

class AccountPage extends Component {
  constructor() {
    super();
    this.cancelPayment = this.cancelPayment.bind(this)
  }

  cancelPayment(account, amount) {
    addManualTransaction(account, moment(this.state.today).subtract(1, 'days'), amount)
  }

  render() {
    const account = _get(this.props, `response.account[0]`)
    const { recurringEvents, id } = account
    return (
        <BasePage>
            <div className="mui-container">
              <div style={{"fontWeight": "bold", "margin": "1rem 0"}}>Your Recurring Payments</div>
              <RecurringEvents recurringEvents={recurringEvents} account={account} onCancel={this.cancelPayment} />
            </div>
        </BasePage>
    );
  }
}

AccountPage.propTypes = {
    test: PropTypes.string
}

export default AccountPage;
