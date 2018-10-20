import React from 'react'
import ReactDOM from "react-dom"
import Router from './components/router'
import HomePage from './components/home-page'

const Test = () => <div>test</div>

const router = (
    <Router
        paths={{
            'test': Test,
            'default': HomePage
        }}
    />
)

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(router, wrapper) : false;
