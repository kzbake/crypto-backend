const Promise = require('bluebird')
const axios = require('axios')
const logger = require('../lib/logger')
const db = require('./db')
const loggerName = '[CurrenctPriceJob]'
const config = require('config')
const TransactionsModel = db.model('Transactions')
const emitter = require('../lib/emitter')


function transfer () {
  return new Promise((resolve) => {
    return TransactionsModel.find({Transfered: false}).exec().then((tx) => {

      return resolve;

    })
  }).catch((err) => {
    console.log(err)
  })
}



function doForever (fn, time) {
  return fn().then(() => {
    setTimeout(() => {
      return doForever(fn)
    }, time)
  })
}

doForever(transfer, 2 * 60 * 1000)
