import React, { Component } from "react";
import PropTypes from "prop-types";
import AccountCard from '../account-card'
import { routeTo } from '../router/router'

class Account extends Component {
  constructor() {
    super();
  }

  render() {
    return (
    <div className="mui-container">
        <div className="mui--text-headline">Accounts</div>
        {this.props.accounts.map(a =>(
            <AccountCard
                onClick={routeTo("account", { id: a.id })}
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
