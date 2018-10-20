
import React from 'react'
import Header from '../header'



const EMI = ()=> {
    return (
        <div>
            <legend>Provide EMI details</legend>
            <div class="mui-textfield">
                <input type="text" placeHolder="Amount"/>
                <label>EMI Amount</label>
            </div>
            <div class="mui-textfield">
                <input type="text" placeHolder="Months"/>
                <label>Number of months</label>
            </div>
        </div>
    )
}

const Accounts = () => {
    return (
        <div class="mui-select">
            <select>
                <option>Bank of America - Checking</option>
                <option>Chase Saphire Reserve - 5544</option>
                <option>Bank of America Cash Rewards Visa Signature - 6112</option>
                <option>Bank of America Travel Rewards Visa Signature - 6112</option>
                </select>
            <label>Select a bank account</label>
        </div>
    )
}

const OTP = () => {
    return (
        <div class="mui-textfield">
            <input type="text" placeHolder="Final amount"/>
            <label>Enter final payment amount</label>
        </div>
    )
}

export default class Transaction extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            txnType: null
        }
    }

    selectTranaction(e) {
        this.setState({
            txnType: e.currentTarget.dataset["txnType"]
        })
    }


    render(){
        return (
            <div>
                <Header />
                <div className="mui-panel">
                <div style={{"font-weight": "bold", "font-size": "16px", "marginBottom": ".5rem"}}>Add a transaction</div>
                    <div class="mui-dropdown" style={{"display": "block"}}>
                        <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown" style={{"width": "100%"}}>
                             {this.state.txnType ? this.state.txnType: `Type of payment`} 
                            <span class="mui-caret"></span>
                        </button>
                        <ul class="mui-dropdown__menu" style={{"width": "100%"}}>
                            <li><a href="javascript:;" onClick={this.selectTranaction.bind(this)} data-txn-type="EMI">EMI</a></li>
                            <li><a href="javascript:;" onClick={this.selectTranaction.bind(this)} data-txn-type="OTP">One Time Payment</a></li>
                        </ul>
                     </div>
                     <form class="mui-form">   
                        {this.state.txnType === `EMI`? <EMI />  :null}
                        {this.state.txnType === `OTP`? <OTP />  :null}
                        {this.state.txnType ? <Accounts /> : null }
                        {this.state.txnType ? <button type="submit" class="mui-btn mui-btn--raised">Submit</button>: null }
                    </form>
                </div>
            </div>)
    }
}