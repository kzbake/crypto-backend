'use strict'

const jwt = require('jsonwebtoken')
const config = require('config')
let io = require('socket.io').listen(config.get('io-port'))

const socket_io = (app) => {
  io = io.listen(app)
  global.io = io
  use()
  on()
}

function use () {
  io.use((socket, next) => {
    const token = socket.handshake.query.token
      socket.decoded = 1
    return next()
  })
}

function on () {
  io.on('connection', (socket) => {

  })
}

module.exports.socket_io = socket_io
