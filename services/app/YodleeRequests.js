const settings = require('./Settings')

function cobrandLoginRequest(){
    return {
        "method":"POST",
        "baseURL": settings.yodlee.endpoint,
        "url":"/cobrand/login",
        "headers": {
            "Content-Type":"application/json",
            "Api-Version": "1.1",
            "Cobrand-Name": settings.yodlee.cobrandName
        },
        "data": {
            "cobrand":{
                "cobrandLogin":settings.yodlee.cobrandLogin,
                "cobrandPassword":settings.yodlee.cobrandPassword,
                "locale":"en_US"
            }
        }
    }
}


function userLoginRequest(cobrandSession) {
    return {
        "method":"POST",
        "baseURL": settings.yodlee.endpoint,
        "url":"/user/login",
        "headers": {
            "Authorization":`cobSession=${cobrandSession}`,
            "Content-Type":"application/json",
            "Api-Version": "1.1",
            "Cobrand-Name": settings.yodlee.cobrandName
        },
        "data": {
            "user":{
                "loginName":settings.yodlee.userLogin,
                "password":settings.yodlee.userPassword,
                "locale":"en_US"
            }
        }
    }
}

function getAccountsRequest(cobrandSession, userSession) {
    return {
        "method":"GET",
        "baseURL": settings.yodlee.endpoint,
        "url":"/accounts",
        "headers": {
            "Authorization":`cobSession=${cobrandSession},userSession=${userSession}`,
            "Content-Type":"application/json",
            "Api-Version": "1.1",
            "Cobrand-Name": settings.yodlee.cobrandName
        }
    }
}

function getRecurringEventsRequest(cobrandSession, userSession) {
    return {
        "method":"GET",
        "baseURL": settings.yodlee.endpoint,
        "url":"/accounts/recurringEvents",
        "headers": {
            "Authorization":`cobSession=${cobrandSession},userSession=${userSession}`,
            "Content-Type":"application/json",
            "Api-Version": "1.1",
            "Cobrand-Name": settings.yodlee.cobrandName
        }
    }
}

function getBalancesRequest(fromDate, toDate, cobrandSession, userSession) {
    fromDate = fromDate?fromDate:"2018-01-01"
    toDate = toDate?toDate:"2018-10-21"
    params = {            
        "interval":"D",
    }

    return {
        "method":"GET",
        "baseURL": settings.yodlee.endpoint,
        "url":"/accounts/balances",
        "params":{
            "interval":"D",
            "fromDate":fromDate,
            "toDate": toDate
        },
        "headers": {
            "Authorization":`cobSession=${cobrandSession},userSession=${userSession}`,
            "Content-Type":"application/json",
            "Api-Version": "1.1",
            "Cobrand-Name": settings.yodlee.cobrandName
        }
    }
}

module.exports = {cobrandLoginRequest, userLoginRequest, getAccountsRequest, getRecurringEventsRequest, getBalancesRequest}
