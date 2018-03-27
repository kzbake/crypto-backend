'use strict'

const emitter = require('../lib/emitter')
const multilevel = require('../lib/io')
const sha512 = require('js-sha512').sha512.sha512

emitter.on('send', (transaction) => {
    const io = global.io
    const methodName = '[country-status-change]'
    const socketChannel = 'send'
    io.emit(socketChannel, transaction)
})

emitter.on('updateTemporaryStatus', (country) => {
    const io = global.io
    const methodName = '[updateTemporaryStatus]'
    const socketChannel = 'updateTemporaryStatus' + country
    io.emit(socketChannel, country)
})


