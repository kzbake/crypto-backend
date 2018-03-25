'use strict'

const db = require('../lib/db')
const httpStatus = require('http-status-codes')
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const logger = require('../lib/logger')
const Promise = require('bluebird')
const WalletModel = db.model('Wallet');
const TransactionModel = db.model('Transactions');
const loggerName = '[AuthController]'
var axios = require('axios')

module.exports.addWallet = (req, res) => {
  const methodName = '[AddWallet]'

  const wallet = req.body;
  const model = new WalletModel(wallet);
  return model.save(wallet).then(result => {
      return res.send(wallet);
  }).catch((err) => {
      logger.error(loggerName, methodName, err)
      return res.status(httpStatus.BAD_REQUEST).json('Bad request')
  })
};


module.exports.addTransaction = (req, res) => {
  const methodName = '[AddTransaction]'

  const transaction = req.body;
  WalletModel.findOne({walletId: transaction.walletId}).exec().then(wallet => {
    if(!wallet) {
        return res.status(httpStatus.BAD_REQUEST).json('Wallet not found!');
    }
    transaction.walletId = wallet;
    const model = new TransactionModel(transaction);
    return model.save(wallet).then(result => {
        return res.send(wallet);
    }).catch((err) => {
        logger.error(loggerName, methodName, err)
        return res.status(httpStatus.BAD_REQUEST).json('Bad request')
    })
  });
};


module.exports.Test = (req, res) => {
    var options = {
        host: 'http://localhost',
        port: 3000,
        path: '/api/transferAsset',
        method: 'GET'
    };

    http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }).end();
}