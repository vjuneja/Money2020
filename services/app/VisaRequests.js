const settings = require('./Settings')
const fs= require('fs')
const https = require('https')

function cancelRecurringPaymentRequest(cardNumber, merchantId, merchantName){
    var agent = new https.Agent({ 
           rejectUnauthorized: false,
            cert: fs.readFileSync(settings.visa.certFilePath),
            key: fs.readFileSync(settings.visa.keyFilePath),
       
      });
      
    return {
        "method":"POST",
        "baseURL": settings.visa.endpoint,
        "url":"/ppcancellationservice/v1/stoppayment/orderrequest",
        "headers": {
            "Content-Type":"application/json",
            "Accept": "application/json"
        },
        "httpsAgent":agent,
        "auth": {
            "username": settings.visa.userId,
            "password": settings.visa.password
        },
        "data": {
            "requestHeader": {
                "memberRole": "I"
            },
            "requestData": {
                "duplicatePPCSInd": "false",
                "stopPaymentDescriptor": {
                    "acquirerInstCountryCode": "US",
                    "merchantCategoryCode": "5411",
                    "merchantName": merchantName,
                    "merchantVerificationValue": merchantId,
                    "cardAcceptorId": "cardid",
                    "accountNumber": cardNumber,
                    "cancellationType": "R0",
                    "operation": "add"
                }
            }
        }
    }
}


function getVisaTransactionsRequest(cardNumber){
    var agent = new https.Agent({ 
           rejectUnauthorized: false,
            cert: fs.readFileSync(settings.visa.certFilePath),
            key: fs.readFileSync(settings.visa.keyFilePath),
       
      });
      
    return {
        "method":"POST",
        "baseURL": settings.visa.endpoint,
        "url":"/ppcancellationservice/v1/stoppayment/orderrequest",
        "headers": {
            "Content-Type":"application/json",
            "Accept": "application/json"
        },
        "httpsAgent":agent,
        "auth": {
            "username": settings.visa.userId,
            "password": settings.visa.password
        },
        "data": {
            "requestHeader": {
                "memberRole": "I"
            },
            "requestData": {
                "duplicatePPCSInd": "false",
                "stopPaymentDescriptor": {
                    "acquirerInstCountryCode": "US",
                    "merchantCategoryCode": "5411",
                    "merchantName": merchantName,
                    "merchantVerificationValue": merchantId,
                    "cardAcceptorId": "cardid",
                    "accountNumber": cardNumber,
                    "cancellationType": "R0",
                    "operation": "add"
                }
            }
        }
    }
}
module.exports = {cancelRecurringPaymentRequest}
