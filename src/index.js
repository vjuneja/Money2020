import React from 'react'
import ReactDOM from "react-dom"
import Router from './components/router'
import HomePage from './components/home-page'
import Transaction from './components/transaction'

const Test = () => <div>test</div>

const wrapper = document.getElementById("app");
wrapper
    ? ReactDOM.render(
        <Router
            paths={{
                'test': Test,
                'transaction': Transaction,
                'default': HomePage
            }}
        />,
        wrapper)
    : false;
