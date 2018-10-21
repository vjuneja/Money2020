import { routeTo } from '../router'
import React, { Component } from "react";
import PropTypes from "prop-types";
import _get from 'lodash/get'
import BasePage from '../base-page'
import { formatterFull } from '../../utils'
import { addManualTransaction } from '../../scripts/balances'
import Chart from '../chart'
import moment from 'moment';


const RecurringEvent = ({ recurringPayment, account }) => {
  const { amount, description, category, lastTransactionDate, frequency} = recurringPayment
  const cancelPayment = () => {
    const days = frequency == 'DAILY' ? 1 : frequency == 'WEEKLY' ? 7 : frequency == 'SEMI_MONTHLY' ? 14 : 30;
    const startDate = frequency == 'MONTHLY' ? moment(lastTransactionDate).add(1, 'months') : moment(lastTransactionDate).add(days, 'days');
    addManualTransaction(account, startDate, amount, days)
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

  render() {
    const accountId = window.location.hash.split("=").pop()
    const accounts = _get(this.props, `response.account`)
    const account = accounts.filter((element) => {
      if(element.id == accountId){
        return element
      }
    })
    const { recurringEvents, id, balances } = account[0]
    const chartData = {}
    balances.forEach(ele => {
      chartData[ele.date] = ele.balance.amount
    });
    return (
        <BasePage>
            <Chart chartData={chartData}/>
            <div className="mui-container">
              <div style={{"fontWeight": "bold", "margin": "1rem 0", "textAlign": "center"}}>Recurring Payments</div>
              {recurringEvents && recurringEvents.length ? <RecurringEvents recurringEvents={recurringEvents} account={account[0]}/> :
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
