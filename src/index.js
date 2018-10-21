import React from 'react'
import ReactDOM from "react-dom"
import Router from './components/router'
import HomePage from './components/home-page'
import AccountPage from './components/account-page'
import Transaction from './components/transaction'

const wrapper = document.getElementById("app");
wrapper
    ? ReactDOM.render(
        <Router
            paths={{
                'home': HomePage,
                'transaction': Transaction,
                'account': AccountPage,
                'default': HomePage
            }}
        />,
        wrapper)
    : false;
