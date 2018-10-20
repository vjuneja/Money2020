import { getAccountBalances } from '../data/account-balance.js'

function getTotalBalance(fromDate, toDate, accountId) {
    const accountBalances = getAccountBalances();
    
    // Aggregate into total by date
    const aggregatedData = []
    
    const count =  accountBalances.account[0].balances.length
    
    for (let i= 0; i < count; i++) {
        aggregatedData.push(0)
        accountBalances.account.forEach(account => {
            const currentBalance = account.balances[i].balance.amount
            if (account.isAsset) aggregatedData[i] += currentBalance
            else aggregatedData[i] -= currentBalance
        })
    }
    return aggregatedData

}

function addManualTransaction(date, amount, interval) {
    var currentBalance = getTotalBalance();
    currentBalance.forEach(ele => {
        // We really shouldn't have values smaller than days
        var dateDiffInDays = Math.round((new Date(date) - new Date(ele.date))) / 1000 / 60 / 60 / 24;
        if (dateDiffInDays % interval === 0) {
            // Pass in negative value if it's debit
            ele.balance.amount += amount;
        }
    });
    return currentBalance;
}