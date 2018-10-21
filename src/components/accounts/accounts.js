import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import AccountCard from '../account-card'
import { routeTo } from '../router'

const getTodaysBal = (acct, today) => {
    return acct.balances.find(a => a.date === today).balance
}

const findOverCharge = (acct, today) =>{
    const { date, balance } = acct.balances
        .filter(a => moment(a.date).isAfter(today))
        .find(b => b.balance.amount <= 0) || {}
    return date
        ? { date, amount: balance.amount }
        : null
}

class Account extends Component {
  constructor() {
    super();
  }

  render() {
    const { accounts, today } = this.props
    if (!accounts) return null

    return (
    <div className="mui-container">
        <div className="mui--text-headline">Accounts</div>
        {accounts
            .map(a => ({
                    id: a.id,
                    name: a.accountName,
                    num: a.accountNumber,
                    amount: getTodaysBal(a, today).amount,
                    overChage: findOverCharge(a, today)
                }))
            .map(a =>(
                <AccountCard
                    onClick={routeTo("account", { id: a.id })}
                    key={a.id}
                    name={a.name}
                    num={a.num}
                    amount={a.amount}
                    overCharge={a.overChage}
                />
            ))
        }
    </div>
    );
  }
}

Account.propTypes = {
    accounts: PropTypes.array
}

export default Account;
