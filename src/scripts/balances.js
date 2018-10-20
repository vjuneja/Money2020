
export const getTotalBalance = (fromDate, toDate, accountId) => {
    const accountBalances = createDataSet(fromDate, toDate, accountId);
    
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

function createDataSet(fromDate) {
    return {
        'account': [
            createBankAsset(fromDate, 100, 1000)
        ]
    }
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
    balances.forEach((ele, index) => {
        // We really shouldn't have values smaller than days
        var dateDiffInDays = Math.trunc(Math.round((new Date(ele.date) - new Date(date)) / 1000 / 60 / 60 / 24));
        if (dateDiffInDays === 0 || (dateDiffInDays > 0 && dateDiffInDays % interval === 0)) {
            // Pass in negative value if it's debit
            ele.balance.amount = index > 0 ? balances[index - 1].balance.amount : ele.balance.amount;
            ele.balance.amount += amount;
        }
    });
}