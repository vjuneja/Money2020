
/**
 * Get aggregated totals of all account balances.
 * 
 * @param {*} fromDate 
 * @param {*} days
 */
export const getTotalBalance = (fromDate, days) => {

    // TODO Get this from service API
    const accountBalances = getAccountBalances(fromDate, days);

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

/**
 * Get account info and balances for all accounts for the user.
 * 
 * @param {*} fromDate 
 * @param {*} days 
 */
export const getAccountBalances = (fromDate, days) => {
    // Result of calling /accounts for account info
    var getAccountsResult = getAccounts();
    // Result of calling GetAccountBalance without account id
    var getAccountBalanceResult = {
        'account': [
            createBankAsset(11888813, fromDate, days, 1000)
        ]
    };
    var getRecurringEventsResult = getRecurringEvents();
    // Merge account details, balances, and recurring events into account
    getAccountsResult.account.forEach(account => {
        var accountId = account.id;
        var accountBalances = findAccountElement(getAccountBalanceResult, accountId);
        if (accountBalances) {
            account.balances = accountBalances.balances;
            account.isAsset = accountBalances.isAsset;
        }
        var accountRecurringEvents = findAccountElement(getRecurringEventsResult, accountId);
        if (accountRecurringEvents) {
            account.recurringEvents = accountRecurringEvents.recurringEvents;
        }
    });
    return getAccountsResult;
}

function findAccountElement(result, accountId) {
    return result.account && result.account.find(account => {
        return account.id == accountId;
    });
}

function getAccounts() {
    // Result of calling /accounts for info on all user accounts
    return {
        'account': [
            {
                "accountName": 'Platinum Money Market',
                'accountNumber': 'xxxx9929',
                'id': 11888813,
                'accountType': 'MONEY_MARKET'
            }
        ]
    };
}

function getRecurringEvents() {
    // Result of calling accounts/recurringEvents.
    // These are the properties we care about
    return {
        'account': [
            {
                'id': 11888813,
                'recurringEvents': [
                    {
                        'amount': {
                            'amount': 143.77
                        },
                        'categoryType': 'EXPENSE',
                        'description': {
                            'simple': 'VERIZON*RECURRING PAY'
                        },
                        'startDate': '2018-09-29',
                        'frequency': 'SEMI_MONTHLY'
                    }
                ]
            }
        ]
    }
}

/**
 * 
 * Adds manual transaction event to the account, recalculates balances, 
 * and return a new instance of the account.
 * 
 * @param {*} account 
 * @param {*} date 
 * @param {*} amount 
 * @param {*} interval 
 */
export const addManualTransaction = (account, date, amount, interval) => {
    var accountCopy = Object.assign(account, {});
    var currChange = 0;
    accountCopy.balances.forEach((ele) => {
        // We really shouldn't have values smaller than days
        var dateDiffInDays = Math.trunc(Math.round((new Date(ele.date) - new Date(date)) / 1000 / 60 / 60 / 24));
        if (dateDiffInDays >= 0 && dateDiffInDays % interval === 0) {
            currChange += amount;
        }
        ele.balance.amount += currChange;
    });
    return accountCopy;
}

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
