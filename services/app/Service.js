const axios = require('axios')
const settings = require('./Settings')
const  {cobrandLoginRequest, userLoginRequest} =  require('./YodleeRequests')

async function getTokens(callback) {
    const cobrandResponse = await axios.create().request(cobrandLoginRequest())
    const cobrandSession = cobrandResponse.data.session.cobSession

    const userLoginResponse = await axios.create().request(userLoginRequest(cobrandSession))
    console.log(userLoginResponse.data.user.session)
    const userSession = userLoginResponse.data.user.session.userSession

    callback( {"userSession": userSession,
        "cobSession": cobrandSession})
}


module.exports = getTokens