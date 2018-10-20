import { settings } from './Settings'

function cobrandLoginRequest(){
    return {
        "method":"POST",
        "baseURL": settings.yodlee.endpoint,
        "headers": {
            "Content-Type":"application/json",
            "Api-Version": "1.1",
            "Cobrand-Name": settings.yodlee.cobrandName
        },
        "body": {
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
        "headers": {
            "Authorization":`cobSession=${cobrandSession}`,
            "Content-Type":"application/json",
            "Api-Version": "1.1",
            "Cobrand-Name": settings.yodlee.cobrandName
        },
        "body": {
            "user":{
                "loginName":settings.yodlee.userLogin,
                "password":settings.yodlee.userPassword,
                "locale":"en_US"
            }
        }
    }
}

export {cobrandLoginRequest, userLoginRequest}