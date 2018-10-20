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
    console.log(cobrandSession)
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

module.exports = {cobrandLoginRequest, userLoginRequest}