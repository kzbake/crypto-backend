'use strict'

const db = require('../lib/db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Stores transaction details
 */
const TransactionsSchema = new Schema({
  walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
      required: true
  },
  transfer: {
    addressTo: {
      type: String,
      required: true
    },
    Amount: {
        type: Number,
        required: true
    }
  },
  transactionId: {
    type: String,
    required: true
  },
  Status: String,
  date: {
    type: Date,
    default: Date.now
  },
  Transfered: {
      type: Boolean,
      default:false
  }
})

db.model('Transactions', TransactionsSchema)
