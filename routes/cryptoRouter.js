const express = require('express')
// eslint-disable-next-line new-cap
const router = express.Router()
const cryptoController = require('../controllers/cryptoController')

router.post('/add-wallet', cryptoController.addWallet)
router.post('/add-transaction', cryptoController.addTransaction)
router.get('/fetch', cryptoController.FetchToHyperledger)

module.exports = router
