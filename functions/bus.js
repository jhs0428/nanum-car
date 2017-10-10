const parseString = require('xml2js').parseString
const fs = require('fs')
const _ = require('lodash')
const request = require('request')

exports.getBusRouteIds = () => {
  fs.readFile('./allBusRouteId.xml', (err, data) => {
    if (err) throw err
    parseString(data, (err, result) => {
      if (err) throw err
      const ret = _.chain(result.ServiceResult.msgBody[0].itemList)
        .map(x => x.busRouteId[0])
        .value()
      ret.sort()
      // console.log(ret)
      console.log(ret.length)
      fs.writeFileSync('./allBusRouteId.json', JSON.stringify(ret), (err) => {
        if (err) {
          console.log(err)
          throw err
        }
        console.log('File write completed')
      })
    })
  })
}

exports.getStationInfo = () => {
  let url = 'http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute'
  const params = {}
  params.serviceKey = 'UY8Sm890L4Vk%2B1QUqCk3cIK0jhPgtfqIwJXHWjtE80Btf7PhjMWR7gO4ZA5FVdO2cySyMlaZaqMlUB3uvOZiSA%3D%3D'
  params.busRouteId = '100100001'
  // const ret = []
  // _.forEach(params, (value, key) => {
  //   ret.push([value, key].join('='))
  // })
  // ret.join('&')
  // url += '?' + ret
  // return url
}
