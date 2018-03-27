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

emitter.on('config-change', (config) => {
    const io = global.io
    const methodName = '[config-change]'
    const socketChannel = 'config-change-' + config
    io.emit(socketChannel, config)
})

emitter.on('histories', (userId, histories) => {
    const io = global.io
    const methodName = '[histories]'
    const socketChannel = 'histories-' + sha512(userId)
    io.emit(socketChannel, histories)
})

emitter.on('tx-history', (historyId, history) => {
    const io = global.io
    const methodName = '[tx-history]'
    const socketChannel = 'tx-history' + sha512(historyId)
    io.emit(socketChannel, history)
})

emitter.on('notification', (notificationId, notification) => {
    const io = global.io
    const methodName = '[Notification]'
    const socketChannel = 'notification' + sha512(notificationId)
    io.emit(socketChannel, notification)
})

// emitter.on('history', (userId, history) => {
//     const io = global.io;
//     const methodName = '[historyETH]';
//     const socketChannel = 'history-' + sha512(userId);
//     io.emit(socketChannel, history);
// });

emitter.on('history', (userId) => {
    const io = global.io
    const methodName = '[historyBTC]'
    const socketChannel = 'history-' + sha512(userId)
    io.emit(socketChannel, 're-load')
})

emitter.on('express-games', (game, newGame) => {
    const socketChannel = 'express-games'
    io.emit(socketChannel, game, newGame)
})
