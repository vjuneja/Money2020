import React, { Component } from "react";
import PropTypes from "prop-types";
import "./account-card.css"

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

class AccountCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { name, num, amount } = this.props
    return (
        <div className="account-card">
            <div className="mui--text-caption"><b>{name}</b>...x-{num.padStart(4, '0')}</div>
            <div className="mui--text-title">{formatter.format(amount)}</div>
        </div>
    );
  }
}

AccountCard.propTypes = {
    name: PropTypes.string,
    num: PropTypes.string,
    amount: PropTypes.number
}

export default AccountCard;
