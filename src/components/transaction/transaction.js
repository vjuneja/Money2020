
import React from 'react'
import Header from '../header'


export default class Transaction extends React.Component {


    render(){
        return (
            <div style={{"padding": "1rem"}}>
                <Header />
                <div style={{"font-weight": "bold", "font-size": "16px"}}>Add a transaction</div>
                <div>
                    <div class="mui-dropdown">
                        <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
                            Type of payment
                            <span class="mui-caret"></span>
                        </button>
                        <ul class="mui-dropdown__menu">
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
                        <button type="submit" class="mui-btn mui-btn--raised">Submit</button>
                        </form>
                </div>
            </div>)
    }
}