import { getAccountBalances } from '../data/account-balance.js'

export const getTotalBalance = (fromDate, toDate, accountId) => {
    const accountBalances = getAccountBalances(fromDate, toDate, accountId);
    
    // Aggregate into total by date
    const aggregatedData = {}
    accountBalances.account.forEach(account => {
        account.balances.forEach(balance => {
            const currentBalance = account.isAsset ? balance.balance.amount : -balance.balance.amount
            if (aggregatedData[balance.date]) {
                aggregatedData[balance.date] += currentBalance
            } else {
                aggregatedData[balance.date] = currentBalance
            }
        })
    })
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
