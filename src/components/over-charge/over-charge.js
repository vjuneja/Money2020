import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import { formatterAbbrev } from '../../utils'
import './over-charge.css'

class OverCharge extends Component {
  constructor() {
    super();
  }

  render() {
    const { date, amount, className } = this.props

    return (
      <div className={'over-charge ' + className}>
        <div className="over-charge--amount mui--text-title">
          <b>{formatterAbbrev.format(Math.floor(amount))}</b>
        </div>
          <div>on {moment(date).format("MM/DD")}</div>
      </div>
    )
  }
}

OverCharge.propTypes = {
    date: PropTypes.string,
    amount: PropTypes.number
}

export default OverCharge;
