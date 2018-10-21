const apiClient = require('api-client')

/**
 * Get aggregated totals of all account balances.
 * 
 */
async function getTotalBalance(fromDate, toDate) {

    // TODO Get this from service API
    const accountBalances = await getAccountBalances(fromDate, toDate);

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
 */
async function getAccountBalances(fromDate, toDate) {
    // Result of calling /accounts for account info
    var getAccountsResult = await getAccounts();
    var getAccountBalanceResult = await getAccountBalances(fromDate, toDate);
    var getRecurringEventsResult = await getRecurringEvents();
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

async function getAccounts() {
    return await apiClient.getAccounts();
}

async function getAccountBalances(fromDate, toDate) {
    return await getBalances(fromDate, toDate);
}

async function getRecurringEvents() {
    return await apiClient.getRecurringEvents();
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
async function addManualTransaction(account, date, amount, interval) {
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

module.exports = {
    getAccountBalances: getAccountBalances,
    getTotalBalance: getTotalBalance,
    addManualTransaction: addManualTransaction
}
