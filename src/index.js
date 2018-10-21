import React from 'react'
import ReactDOM from "react-dom"
import moment from 'moment';
import Router from './components/router'
import HomePage from './components/home-page'
import AccountPage from './components/account-page'
import Transaction from './components/transaction'
import 'babel-polyfill'
import { getAccountBalances, getTotalBalance, getAggregatedTotalBalance } from './scripts/balances'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            response: null,
            chartData: {},
            aggregateChartData: {},
            today: moment(Date()).format('YYYY-MM-DD')
        }
    }

    componentWillMount() {
        const lastMonth = moment(this.state.today).subtract(1, 'months').format('YYYY-MM-DD')
        const nextMonth = moment(this.state.today).add(1, 'months').format('YYYY-MM-DD')

        Promise.all([
            getTotalBalance(lastMonth, nextMonth), 
            getAggregatedTotalBalance(lastMonth, nextMonth),
            getAccountBalances(lastMonth, nextMonth)
        ]).then((responses) => {
            this.setState({
                chartData: responses[0],
                aggregateChartData: responses[1],
                response: responses[2].data
            })
        })
    }

    render() {
        console.log('state', this.state)
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
