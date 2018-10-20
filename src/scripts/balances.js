import { getAccountBalances } from './dummyData'

function getTotalBalance(fromDate, toDate, accountId) {
    // Call service
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
