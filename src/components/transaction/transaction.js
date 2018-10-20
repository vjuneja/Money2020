
import React from 'react'
import Header from '../header'


export default class Transaction extends React.Component {


    render(){
        return (
            <div>
                <Header />
                <div className="mui-panel">
                <div style={{"font-weight": "bold", "font-size": "16px", "marginBottom": ".5rem"}}>Add a transaction</div>
                    <div class="mui-dropdown" style={{"display": "block"}}>
                        <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown" style={{"width": "100%"}}>
                            Type of payment
                            <span class="mui-caret"></span>
                        </button>
                        <ul class="mui-dropdown__menu" style={{"width": "100%"}}>
                            <li><a href="javascript:;">EMI</a></li>
                            <li><a href="javascript:;">One Time Payment</a></li>
                        </ul>
                     </div>
                     <form class="mui-form">
                        <legend>Provide EMI details</legend>
                        <div class="mui-textfield">
                            <input type="text" placeHolder="Amount"/>
                            <label>EMI Amount</label>
                        </div>
                        <div class="mui-textfield">
                            <input type="text" placeHolder="Months"/>
                            <label>Number of months</label>
                        </div>
                        <div class="mui-select">
                            <select>
                                <option>Bank of America - Checking</option>
                                <option>Chase Saphire Reserve - 5544</option>
                                <option>Bank of America Cash Rewards Visa Signature - 6112</option>
                                <option>Bank of America Travel Rewards Visa Signature - 6112</option>
                                </select>
                            <label>Select a bank account</label>
                        </div>
                       
                        <button type="submit" class="mui-btn mui-btn--raised">Submit</button>
                        </form>
                </div>
            </div>)
    }
}