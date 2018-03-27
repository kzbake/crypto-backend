'use strict'
/* Main dependencies */
const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const config = require('config')
const morgan = require('./lib/morgan')
const httpStatus = require('http-status-codes')
const logger = require('./lib/logger')

/* Register all libs */
require('./lib/db')
/* Register all routes */
const cryptRouter = require('./routes/cryptoRouter')
const app = express()

app.use(morgan)
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// default options
app.use(fileUpload())

// Enable Cross Origin Resource Sharing
app.all('/*', function (req, res, next) {
    // CORS headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        res.header('Access-Control-Allow-Headers',
            'Content-Type,X-Access-Token,Cache-Control, pcode')
        return res.sendStatus(httpStatus.OK).end()
    } else {
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        next()
    }
})

/* Express Router configrations */
const API = '/api/v1/'
// app.all(API + '*', [require('./guards/tokenGuard')])
app.use(API + 'crypto', cryptRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.status(httpStatus.NOT_FOUND).json('Not found')
})

// error handler
app.use(function (err, req, res, next) {
    logger.error('[Handler]', err)
    return res.status(httpStatus.BAD_REQUEST).json('Bad request')
})

logger.debug('[Server]', 'Server running mode', config.get('env'))

module.exports = app

require('./lib/TransferJob')
require('./listeners/ioListener')