

function getTotalBalance(fromDate, toDate, accountId) {
    // Call service
    
    // Aggregate into total by date

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