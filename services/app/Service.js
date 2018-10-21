const axios = require('axios')
const  {cobrandLoginRequest, userLoginRequest, getAccountsRequest, getRecurringEventsRequest, getBalancesRequest} =  require('./YodleeRequests')
const {cancelRecurringPaymentRequest} = require('./VisaRequests')

async function getTokens() {
    const cobrandResponse = await axios.create().request(cobrandLoginRequest())
    const cobrandSession = cobrandResponse.data.session.cobSession

    const userLoginResponse = await axios.create().request(userLoginRequest(cobrandSession))
    const userSession = userLoginResponse.data.user.session.userSession

    return {"userSession": userSession,
        "cobSession": cobrandSession}
}

async function getAccounts() {
    const apiTokens = await getTokens()
    const accountsResponse = await axios.create().request(getAccountsRequest(apiTokens.cobSession, apiTokens.userSession))

    return accountsResponse.data
}
async function getRecurringEvents() {
    const apiTokens = await getTokens()
    const recurringEventsResponse = await axios.create().request(getRecurringEventsRequest(apiTokens.cobSession, apiTokens.userSession))

    return recurringEventsResponse.data

}

async function getBalances(params) {
    const apiTokens = await getTokens()
    const recurringEventsResponse = await axios.create().request(getBalancesRequest(params.fromDate, params.toDate, apiTokens.cobSession, apiTokens.userSession))

    return recurringEventsResponse.data
}

async function getAverageBalances(params) {
    const balances = await getBalances(params)
    return {"account": balances.account.map((account)=> ({
        ...account,
        balances: account.balances.map(bal => {
            return {
                ...bal,
                balance: {
                    amount: bal.balance.amount + random(),
                    currency: bal.balance.currency
                }
            }
        })
    }))}
}

async function cancelTransaction(params) {
    try {   
        let req = cancelRecurringPaymentRequest(params.cardNumber, params.merchantId, params.merchantName)
        const cancelTransactionResponse = await axios.create().request(req)
        return cancelTransactionResponse.data
    } catch(e) {
        return e.response.data
    }
}

async function getVisaTransactions(params) {
    try {   
        let req = cancelRecurringPaymentRequest(params.cardNumber, params.merchantId, params.merchantName)
        console.log(req)
        const cancelTransactionResponse = await axios.create().request(req)
        return cancelTransactionResponse.data
    } catch(e) {
        return e.response.data
    }
}

var seed = 1;
function random() {
    var x = Math.sin(seed++) * 10000;
    let rand = (x - Math.floor(x))*500;
    return rand;
}
module.exports = {
    getAccounts: getAccounts, //http://localhost:3000/api/getAccounts
    getRecurringEvents: getRecurringEvents, //http://localhost:3000/api/getRecurringEvents
    getBalances: getBalances, //http://localhost:3000/api/getBalances?fromDate=2018-01-10&toDate=2018-12-12
    getAverageBalances: getAverageBalances, //http://localhost:3000/api/getAverageBalances
    cancelTransaction: cancelTransaction, //http://localhost:3000/api/cancelTransaction?cardNumber=4005520000011126&merchantId=1234567891&merchantName=name
    getVisaTransactions: getVisaTransactions

}