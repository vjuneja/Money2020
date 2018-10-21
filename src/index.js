import React from 'react'
import ReactDOM from "react-dom"
import Router from './components/router'
import HomePage from './components/home-page'
import AccountPage from './components/account-page'
import Transaction from './components/transaction'
import 'babel-polyfill'
import { getAccountBalances } from './scripts/balances'

async function callGetAccountBalances(...args) {
    return getAccountBalances(...args)
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            response: null
        }
    }

    componentWillMount() {
        callGetAccountBalances(Date(), 30)
            .then(response => this.setState({ response }))
    }

    render() {
        return this.props.render(this.state)
    }
}

const wrapper = document.getElementById("app");
wrapper
    ? ReactDOM.render(
        <App
            render={
                state => <Router
                    {...state}
                    paths={{
                        'home': HomePage,
                        'transaction': Transaction,
                        'account': AccountPage,
                        'default': HomePage
                    }}
                />
            }
        />
        ,
        wrapper)
    : false;
