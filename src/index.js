import React from 'react'
import ReactDOM from "react-dom"
import HomePage from './components/home-page'

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<HomePage test="testprop"/>, wrapper) : false;
