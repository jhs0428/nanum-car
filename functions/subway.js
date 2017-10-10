const _ = require('lodash')
const parseString = require('xml2js').parseString
const fs = require('fs');

(async () => {
  const buf = JSON.parse(fs.readFileSync('./../data/subwayStations.json'))
  const stations = JSON.stringify(await parseStations())

  _.forEach(buf, (value, key) => {
    setTimeout(() => {

    }, 100 * key)
  })

  setTimeout(() => {
    fs.writeFileSync('./../data/subwayStations.json', stations)
  }, stations.length * 100 + 100)
})()

// PSS : 부산
// KJS : 경의중앙선
// DGS : 대구지하철
function parseStations () {
  const stationArray = fs.readFileSync('../data/allSubwayStations.xml').toString()
  // console.log(stationArray)
  return new Promise((resolve, reject) => {
    parseString(stationArray, (err, result) => {
      if (err) return reject(err)
      const ret = _.chain(result.response.body[0].items[0].item)
      .map(x => ({
        type: 'subway',
        name: x.subwayStationName[0],
        station: x.subwayStationId[0]
      }))
      .filter(x => x.station.substring(0, 3) !== 'PSS' &&
        x.station.substring(0, 3) !== 'DGS')
      .value()
      resolve(ret)
    })
  })
}

function 