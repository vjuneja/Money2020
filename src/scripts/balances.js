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

function createDataSet() {
    
}

function createBankAsset(startDate, days, startingBalance) {
    var balances = [];
    for (var i = 0; i < days; i++) {
        var date = new Date(startDate);
        date.setDate(date.getDate() + i);
        balances.push({
            'date': date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
            'balance': {
                'amount': startingBalance,
                'currency': 'USD'
            }
        })

    }
    // Add patterns
    addManualTransaction(balances, '2018-10-05', 1500, 30);
    addManualTransaction(balances, '2018-10-03', -300, 14);
    addManualTransaction(balances, '2018-10-02', -50, 7);
    return {
        'CONTAINER': 'bank',
        'id': 11888813,
        'isAsset': true,
        'balances': balances
    }
}

function addManualTransaction(balances, date, amount, interval) {
    balances.forEach(ele => {
        // We really shouldn't have values smaller than days
        var dateDiffInDays = Math.round((new Date(date) - new Date(ele.date))) / 1000 / 60 / 60 / 24;
        if (dateDiffInDays % interval === 0) {
            // Pass in negative value if it's debit
            ele.balance.amount += amount;
        }
    });
}