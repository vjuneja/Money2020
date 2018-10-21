
function createBankAsset(accountId, startDate, days, startingBalance) {
    var account = {
        'CONTAINER': 'bank',
        'id': accountId,
        'isAsset': true,
    };
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
    account.balances = balances;
    // Add recurring transactions
    account = addManualTransaction(account, '2018-10-05', 1500, 30);
    account = addManualTransaction(account, '2018-10-03', -1000, 14);
    account = addManualTransaction(account, '2018-10-02', -50, 7);
    return account;
}


function createRecurringEvent(amount, name, date, frequency) {
    return {
        'amount': {
            'amount': Math.abs(amount)
        },
        'categoryType': amount < 0 ? 'EXPENSE' : 'INCOME',
        'description': {
            'simple': name
        },
        'startDate': date,
        'frequency': frequency
    }
}

function getRecurringEvents() {
    // Result of calling accounts/recurringEvents.
    // These are the properties we care about
    return {
        'account': [
            {
                'id': 11888813,
                'recurringEvents': [
                    createRecurringEvent(143.77, 'VERIZON*RECURRING PAY', '2018-09-29', 'SEMI_MONTHLY')
                ]
            }
        ]
    }
}