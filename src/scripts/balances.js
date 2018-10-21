import {getAccounts, getRecurringEvents, getBalances} from './api-client'

/**
 * Get aggregated totals of all account balances.
 * 
 */
export async function getTotalBalance(fromDate, toDate) {

    // TODO Get this from service API
    const accountBalances = await getAccountBalances(fromDate, toDate);

    // Aggregate into total by date
    const aggregatedData = {}
    accountBalances.data.account.forEach(account => {
        account.balances && account.balances.forEach(balance => {
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
export async function getAccountBalances(fromDate, toDate) {
    // Result of calling /accounts for account info
    var getAccountsResult = await getAccounts();
    var getAccountBalanceResult = await getBalances(fromDate, toDate);
    var getRecurringEventsResult = await getRecurringEvents();
    // Merge account details, balances, and recurring events into account
    getAccountsResult.data.account.forEach(account => {
        var accountId = account.id;
        var accountBalances = findAccountElement(getAccountBalanceResult.data, accountId);
        if (accountBalances) {
            account.balances = accountBalances.balances;
            account.isAsset = accountBalances.isAsset;
        }
        var accountRecurringEvents = findAccountElement(getRecurringEventsResult.data, accountId);
        if (accountRecurringEvents) {
            account.recurringEvents = accountRecurringEvents.recurringEvents;
        }
    });
    return getAccountsResult;
}

function findAccountElement(data, accountId) {
    return data.account && data.account.find(account => {
        return account.id == accountId;
    });
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
export async function addManualTransaction(account, date, amount, interval) {
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