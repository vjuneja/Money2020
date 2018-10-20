import settings from 'settings.json'

function cobrandLoginRequest() {
    return {
        url: settings.yodleeEndpoint,
        queryParams:[],
        headers: [
            ["Content-Type","application/json"],
            ["Api-Version","1.1"],
            ["Cobrand-Name",settings.cobrandName]
        ],
        body: {
            "cobrand":{
                "cobrandLogin":settings.cobrandLogin,
                "cobrandPassword":settings.cobrandPassword,
                "locale":"en_US"
            }
        }
    }
}

function userLoginRequest(cobrandSession) {
    return {
        url: settings.yodleeEndpoint,
        queryParams:[],
        headers: [
            ["Content-Type","application/json"],
            ["Api-Version","1.1"],
            ["Cobrand-Name",settings.cobrandName]
        ],
        body: {
            "user":{
                "loginName":settings.loginName,
                "password":"{{password}}",
                "locale":"en_US"
            }
        }
    }
}

function accountBalanceRequest(userToken, from, to) {

}


export { cobrandLoginRequest, userLoginRequest, accountBalanceRequest }
