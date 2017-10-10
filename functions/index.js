const functions = require('firebase-functions')
const bus = require('./bus.js')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log('baseURL:', request.baseUrl)
  console.log('params :', request.params)
  console.log('query  :', request.query)
  console.log('headers:', request.headers)
  console.log('body   :', request.body)
  console.log('method :', request.method)
  switch (request.method) {
    case 'GET':
      readSomething()
      bus.getBusRouteIds()
      bus.getStationInfo()
      break
    case 'POST':
      createSomething()
      break
    case 'PATCH':
      updateSomething()
      break
    case 'DELETE':
      deleteSomething()
      break
    default:
      break
  }
  response.send('Hello from Firebase!')
})

function readSomething () {
  console.log('readSomething')
}

function createSomething () {
  console.log('createSomething')
}

function updateSomething () {
  console.log('updateSomething')
}

function deleteSomething () {
  console.log('deleteSomething')
}
