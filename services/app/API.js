const apis = require('./Service')

 function callApi(params, callback) {
    apis().then((response) => {
        callback(response)
    })
}

module.exports = callApi