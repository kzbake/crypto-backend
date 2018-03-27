const Promise = require('bluebird')
const axios = require('axios')
const logger = require('../lib/logger')
const db = require('./db')
const loggerName = '[TransferJob]'
const TransactionModel = db.model('Transactions');
const emitter = require('../lib/emitter')
const TransactionsModel = db.model('Transactions')


function transfer () {
    const methodName = '[transfer]'
  return new Promise((resolve, reject) => {
      return TransactionModel.find({Transfered: false}).populate("walletId").exec().then(txs => {
          if(!txs[0]) {
              return resolve(null);
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

            for(let res of result) {
                emitter.emit('fetch', res.data)
            }
            console.log(result);
              TransactionModel.update({}, {Transfered:true}, {multi: true}).then(result => {
                  return resolve(result);
              });

          }).catch((err) => {
              logger.error(loggerName, methodName, err)
              return reject();
          });
      });
  }).catch((err) => {
    console.log(err)
  })
}



function doForever (fn, time) {
  return fn().then(() => {
    setTimeout(() => {
      return doForever(fn, time)
    }, time)
  })
}

doForever(transfer,  20*1000)
