const parseString = require('xml2js').parseString
const fs = require('fs')
const _ = require('lodash')
const bus = require('./bus')

let stations = {};

(async () => {
  // read all stations from file
  stations = JSON.parse(fs.readFileSync('../data/stations.json'))

  // read all bus numbers from file
  const busRouteIds = JSON.parse(fs.readFileSync('../data/allBusRouteId.json'))
  // _.forEach(busRouteIds, (busRouteId) => {
  //   try {
  //     addStationByBusId(stations, busRouteId)
  //   } catch (err) {
  //     console.log(err)
  //     return false
  //   }
  // })
  //// addStationByBusId(stations, busRouteId)

  console.log(stations)
  fs.writeFileSync('../data/stations.json', JSON.stringify(stations))
})()

function parseBusStation (data) {
  return new Promise((resolve, reject) => {
    parseString(data, (err, result) => {
      if (err) {
        // throw err
        reject(err)
      }
      const ret = _.chain(result.respnse.body[0].itemList)
        .map(x => ({
          name: x.stationNm[0].trim(),
          station: x.station[0].trim(),
          stationNo: x.stationNo[0].trim(),
          latitude: x.gpsY[0].trim(),
          longtitude: x.gpsX[0].trim()
        }))
        .value()
      ret.sort()
      resolve(ret)
    })
  })
}

async function addStationByBusId (stations, busRouteId) {
  const data = await bus.getStationInfo(busRouteId)
  const busStops = await parseBusStation(data)

  _.forEach(busStops, (value, key) => {
    if (_.has(stations, value.station)) {
      return undefined  // continue
    }
    stations[value.station] = value
  })
}
