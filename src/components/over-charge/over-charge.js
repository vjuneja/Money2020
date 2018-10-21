import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import { formatter } from '../../utils'

class OverCharge extends Component {
  constructor() {
    super();
  }

  render() {
    const { date, amount } = this.props
    console.log('DATE', date, amount)
    return (
        <div>
            {moment(date).format("MM Do")}
            {formatter.format(amount)}
        </div>
    );
  }
}

OverCharge.propTypes = {
    date: PropTypes.string,
    amount: PropTypes.number
}

export default OverCharge;
