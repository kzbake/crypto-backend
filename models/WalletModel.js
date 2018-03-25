'use strict'

const db = require('../lib/db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WalletSchema = new Schema({
    walletId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true},
    amount: Number,
    timestamp: {type: Date, default: Date.now}
})
db.model('Wallet', WalletSchema)
