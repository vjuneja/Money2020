import React, { Component } from "react";
import PropTypes from "prop-types";
import OverCharge from '../over-charge'
import { formatterFull } from '../../utils'
import "./account-card.css"

class AccountCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { name, num, amount, type, overCharge, ...rest } = this.props

    return (
        <div className="account-card mui-panel" {...rest}>
            <div className="mui--text-caption"><b>{name} - {num.padStart(4, '0')}</b></div>
            <div className="mui--text-headline">{formatterFull.format(amount)}</div>
            {overCharge && type !== "CREDIT" && <OverCharge
                type={type === "CREDIT" ? "positive" : "negative"}
                className="account-card--over-charge"
                date={overCharge.date} amount={overCharge.amount}
            />}
            <span className="account-card--icon">
                <i className="fas fa-chevron-right"></i>
            </span>
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
