'use strict'

const db = require('../lib/db')
const httpStatus = require('http-status-codes')
const mongoose = require('mongoose')
const logger = require('../lib/logger')
const emitter = require('../lib/emitter')
const Promise = require('bluebird')
const WalletModel = db.model('Wallet');
const TransactionModel = db.model('Transactions');
const loggerName = '[AuthController]'
var axios = require('axios')

module.exports.addWallet = (req, res) => {
  const methodName = '[AddWallet]'

  const wallet = req.body;
  const model = new WalletModel(wallet);
  return model.save().then(result => {
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
    return model.save().then(result => {
        emitter.emit('send', result._doc)
        return res.send(wallet);
    }).catch((err) => {
        logger.error(loggerName, methodName, err)
        return res.status(httpStatus.BAD_REQUEST).json('Bad request')
    })
  });
};


module.exports.FetchToHyperledger = (req, res) => {
    const methodName = '[FetchToHyperledger]'
  return TransactionModel.find({Transfered: false}).populate("walletId").exec().then(txs => {
    if(!txs[0]) {
        return res.send({msg: 'Nothing to fetch'});
    }
    const arr = []
    for(let tx of txs) {
      let body = {
          "$class": "org.acme.biznet.transferAsset",
          "transactionId": tx.transactionId,
          "transfer": {
              "$class": "org.acme.biznet.transfer",
              "addressTo": tx.transfer.addressTo,
              "Amount": tx.transfer.Amount,
              "id": tx.transactionId
          },
          "date": Date.now(),
          "Status": "active",
          "fromWallet": {
              "$class": "org.acme.biznet.Wallet",
              "address": tx.walletId.address,
              "Balance": tx.walletId.amount,
              "id": tx.walletId._id,
              "userId": 0
          }
      }
      arr.push(axios.post('http://localhost:3000/api/transferAsset', body));
    }
    return Promise.all(arr).then(result => {
      TransactionModel.update({Transfered:true}, {multi: true}).then(result => {
          return res.send({msg: 'Successfully fetched to Hyperledger'});
      });

    }).catch((err) => {
        logger.error(loggerName, methodName, err)
        return res.status(httpStatus.BAD_REQUEST).json('Error, couldnt fetch data to Hyperledger!')
    });
  });
};