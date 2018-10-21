const axios = require('axios')

async function getAccounts() {
    return await axios.create().request("/api/getAccounts")
}

async function getRecurringEvents() {
    return await axios.create().request("/api/getRecurringEvents")
}

async function getBalances(fromDate, toDate) {
    return await axios.create().request("/api/getBalances?fromDate=" + fromDate + "&toDate=" + toDate)
}

module.exports = {
    getAccounts: getAccounts,
    getRecurringEvents: getRecurringEvents,
    getBalances: getBalances
}