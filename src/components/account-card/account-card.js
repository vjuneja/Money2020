import React, { Component } from "react";
import PropTypes from "prop-types";

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
            <h6><b>{name}</b>...x-{num.padStart('0')}</h6>
            <h4>{formatter.format(amount)}</h4>
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
