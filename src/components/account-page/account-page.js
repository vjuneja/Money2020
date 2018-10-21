import { routeTo } from '../router'
import React, { Component } from "react";
import PropTypes from "prop-types";
import _get from 'lodash/get'
import BasePage from '../base-page'
import { formatterFull } from '../../utils'
import { addManualTransaction } from '../../scripts/balances'


const RecurringEvent = ({ recurringPayment, account, onCancel }) => {
  const { amount, description, category } = recurringPayment
  const cancelPayment = () => onCancel(account, amount.amount)
  return (
    <div className="mui-panel">
       <div>{description.simple} - {formatterFull.format(amount.amount)}</div>
       <div style={{"fontSize": "12px", "color": "grey"}}>Category: {category}</div>
       <div><a href="javascript:;" onClick={cancelPayment}>Cancel payment </a></div>
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
    const accountId = window.location.hash.split("=").pop()
    const accounts = _get(this.props, `response.account`)
    const account = accounts.filter((element) => {
      if(element.id == accountId){
        return element
      }
    })
    const { recurringEvents, id } = account[0]
    return (
        <BasePage>
            <div className="mui-container">
              <div style={{"fontWeight": "bold", "margin": "1rem 0", "textAlign": "center"}}>Recurring Payments</div>
              {recurringEvents && recurringEvents.length ? <RecurringEvents recurringEvents={recurringEvents} account={account[0]} onCancel={this.cancelPayment} /> :
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
