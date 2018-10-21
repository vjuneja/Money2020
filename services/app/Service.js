const axios = require('axios')
const  {cobrandLoginRequest, userLoginRequest, getAccountsRequest} =  require('./YodleeRequests')

async function getTokens(callback) {
    const cobrandResponse = await axios.create().request(cobrandLoginRequest())
    const cobrandSession = cobrandResponse.data.session.cobSession

    const userLoginResponse = await axios.create().request(userLoginRequest(cobrandSession))
    const userSession = userLoginResponse.data.user.session.userSession

    return {"userSession": userSession,
        "cobSession": cobrandSession}
}

async function getAccounts(callback) {
    const apiTokens = await getTokens()
    const accountsResponse = await axios.create().request(getAccountsRequest(apiTokens.cobSession, apiTokens.userSession))

    return accountsResponse.data
}
module.exports = getAccounts