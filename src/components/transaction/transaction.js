
import React from 'react'
import BasePage from '../base-page'
import  { addManualTransaction } from '../../scripts/balances'



const EMI = ()=> {
    return (
        <div>
            <legend>Provide EMI details</legend>
            <div className="mui-textfield">
                <input type="text" placeHolder="Amount"/>
                <label>EMI Amount</label>
            </div>
            <div className="mui-textfield">
                <input type="text" placeHolder="Months"/>
                <label>Number of months</label>
            </div>
        </div>
    )
}

const Accounts = ({accounts}) => {
    const accountNames = accounts.map((account) => {
        return `${account.accountName}: ${account.providerName} - ${account.accountNumber}`
    })
    const options = []
    accountNames.forEach(element => {
        options.push(<option value={element.split('-').pop().trim()}>{element}</option>)
    });

    return (
        <div className="mui-select">
            <select>
                {options}
            </select>
            <label>Select a bank account</label>
        </div>
    )
}

const OTP = () => {
    return (
        <div className="mui-textfield">
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

    onSubmit(e){
        e.preventDefault()
        let months
        let emiAmount
        const selectedAccountNumber = e.nativeEvent.currentTarget.elements[2].selectedOptions[0].value      
        const { account } = this.props.response
        const selectedAccount = account.filter((element) => {
            if(element.accountNumber === selectedAccountNumber){
                return element
            }
        })
        const index = account.indexOf(selectedAccount[0])
        if(this.state.txnType === `EMI`){
            emiAmount = e.nativeEvent.currentTarget.elements[0].value
        } 
        months = e.nativeEvent.currentTarget.elements[1].value
        const updateAccount = addManualTransaction(selectedAccount[0],new Date(),emiAmount,months*30)
        updateAccount.then((value) => {
            this.props.addTransaction(index, value)
        })    
    }


    render(){
        const { account } = this.props.response
        return (
            <BasePage>
                <div className="mui-panel">
                <div style={{"fontWeight": "bold", "fontSize": "16px", "marginBottom": ".5rem"}}>Add a transaction</div>
                    <div className="mui-dropdown" style={{"display": "block"}}>
                        <button className="mui-btn mui-btn--primary" data-mui-toggle="dropdown" style={{"width": "100%"}}>
                             {this.state.txnType ? this.state.txnType: `Type of payment`} 
                            <span className="mui-caret"></span>
                        </button>
                        <ul className="mui-dropdown__menu" style={{"width": "100%"}}>
                            <li><a href="javascript:;" onClick={this.selectTranaction.bind(this)} data-txn-type="EMI">EMI</a></li>
                            <li><a href="javascript:;" onClick={this.selectTranaction.bind(this)} data-txn-type="OTP">One Time Payment</a></li>
                        </ul>
                     </div>
                     <form className="mui-form" onSubmit={this.onSubmit.bind(this)}>
                        {this.state.txnType === `EMI`? <EMI />  :null}
                        {this.state.txnType === `OTP`? <OTP />  :null}
                        {this.state.txnType ? <Accounts accounts={account}/> : null }
                        {this.state.txnType ? <button type="submit" className="mui-btn mui-btn--raised">Submit</button>: null }
                    </form>
                </div>
            </BasePage>
        )
    }
}
