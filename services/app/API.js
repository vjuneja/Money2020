const apis = require('./Service')

 function callApi(apiName, params, callback) {
    apis[apiName](params).then((response) => {
        callback(response)
    })
}

module.exports = callApi