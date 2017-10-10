const parseString = require('xml2js').parseString
const fs = require('fs')
const _ = require('lodash')
const request = require('request')

exports.getBusRouteIds = () => {
  return fs.readFile('../data/allBusRouteId.xml', (err, data) => {
    if (err) throw err
    parseString(data, (err, result) => {
      if (err) throw err
      const ret = _.chain(result.ServiceResult.msgBody[0].itemList)
        .map(x => x.busRouteId[0])
        .value()
      ret.sort()
      console.log(ret.length)
      fs.writeFileSync('../data/allBusRouteId.json', JSON.stringify(ret), (err) => {
        if (err) {
          console.log(err)
          throw err
        }
        console.log('File write completed')
      })
    })
  })
}

exports.getStationInfo = (busRouteId) => {
  return new Promise((resolve, reject) => {
    request(getUrl(busRouteId), (err, response, body) => {
      if (err) {
        console.log('error:', err) // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
        return reject(err)
      }
      return resolve(body)
    })
  })
}

function getUrl (busRouteId) {
  const url = 'http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute'
  const params = {}
  params.serviceKey = 'UY8Sm890L4Vk%2B1QUqCk3cIK0jhPgtfqIwJXHWjtE80Btf7PhjMWR7gO4ZA5FVdO2cySyMlaZaqMlUB3uvOZiSA%3D%3D'
  params.busRouteId = busRouteId
  const paramArray = []
  _.forEach(params, (value, key) => {
    paramArray.push([key, value].join('='))
  })
  return [url, paramArray.join('&')].join('?')
}
