import React, { Component } from "react";
import PropTypes from "prop-types";
import AccountCard from '../account-card'

class Account extends Component {
  constructor() {
    super();
  }

  render() {
    return (
    <div className="mui-container">
        <div class="mui--text-headline">Accounts</div>
        {this.props.accounts.map(a =>(
            <AccountCard
                key={a.id}
                name={a.name}
                num={a.number}
                amount={a.total}
            />
        ))}
    </div>
    );
  }
}

Account.propTypes = {
    accounts: PropTypes.array
}

export default Account;
