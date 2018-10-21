const axios = require('axios')

export async function getAccounts() {
    return await axios.create().request("/api/getAccounts")
}

export async function getRecurringEvents() {
    return await axios.create().request("/api/getRecurringEvents")
}

export async function getBalances(fromDate, toDate) {
    return await axios.create().request("/api/getBalances?fromDate=" + fromDate + "&toDate=" + toDate)
}

export async function getAverageBalances(fromDate, toDate) {
    return await axios.create().request("/api/getAverageBalances?fromDate=" + fromDate + "&toDate=" + toDate)
}
