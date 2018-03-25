'use strict'
const db = require('./lib/db')
const sha512 = require('js-sha512').sha512
const Promise = require('bluebird')

const AddressesModel = db.model('Addresses')
const CurrenciesModel = db.model('Currencies')
const HistoriesModel = db.model('Histories')
const HooksModel = db.model('Hooks')
const NotificationModel = db.model('Notifications')
const ReferralProgramsModel = db.model('ReferralPrograms')
const ReferralsDataModel = db.model('ReferralsData')
const SupportModel = db.model('Supports')
const UsersModel = db.model('Users')
const TransfersModel = db.model('Transfers')
const EthAddressesModel = db.model('EthAddresses')
const EthAddressHistoriesModel = db.model('EthAddressHistories')
const CountriesModel = db.model('Countries')
const TicketPriceModel = db.model('TicketPrice')
const ConfigModel = db.model('Config')
const JackPotModel = db.model('JackPot')
const BountyRequestsModel = db.model('BountyRequests')
const ExpressGamesModel = db.model('ExpressGames')

const config = require('config')
const logger = require('./lib/logger')

let devCleaning = []

console.log(config.get('env'))

// if (String(config.get('env')) === 'dev') {
devCleaning = [
  AddressesModel.remove().exec(),
  CurrenciesModel.remove().exec(),
  HistoriesModel.remove().exec(),
  HooksModel.remove().exec(),
  NotificationModel.remove().exec(),
  ReferralProgramsModel.remove().exec(),
  ReferralsDataModel.remove().exec(),
  SupportModel.remove().exec(),
  UsersModel.remove().exec(),
  TransfersModel.remove({}).exec(),
  EthAddressesModel.remove().exec(),
  EthAddressHistoriesModel.remove().exec(),
  CountriesModel.remove().exec(),
  TicketPriceModel.remove().exec(),
  ConfigModel.remove().exec(),
  JackPotModel.remove().exec(),
  BountyRequestsModel.remove().exec(),
  ExpressGamesModel.remove().exec()
]
// }

Promise.all(devCleaning).then(() => {
  const arr = []
  arr.push(new Promise((resolve) => {
    return resolve(new ConfigModel({
      key: 'platformStatus',
      valueBoolean: true
    }).save())
  }))
  arr.push(new Promise((resolve) => {
    return resolve(new ConfigModel({
      key: 'bountyStatus',
      valueBoolean: true
    }).save())
  }))
  arr.push(new Promise((resolve) => {
    return resolve(new ConfigModel({
      key: '10',
      valueNumber: 5
    }).save())
  }))
  arr.push(new Promise((resolve) => {
    return resolve(new ConfigModel({
      key: '100',
      valueNumber: 50
    }).save())
  }))
  arr.push(new Promise((resolve) => {
    return resolve(new ConfigModel({
      key: 'expressGameTransactionFee',
      valueNumber: 2
    }).save())
  }))
  arr.push(new Promise((resolve) => {
    return resolve(new ConfigModel({
      key: 'maxPerUserParticipationCount',
      valueNumber: 0
    }).save())
  }))
  arr.push(new Promise((resolve) => {
    return resolve(new ExpressGamesModel({
      type: 10
    }).save())
  }))
  arr.push(new Promise((resolve) => {
    return resolve(new ExpressGamesModel({
      type: 100
    }).save())
  }))
  arr.push(new Promise((resolve) => {
    return resolve(new UsersModel({
      firstName: 'Admin',
      lastName: 'WorldBet',
      sequenceId: 10001,
      email: 'admin@worldbet.com',
      password: sha512('123456'),
      role: 'admin',
      active: true,
      activationCode: '2'
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new UsersModel({
      firstName: 'BountyAdmin',
      lastName: 'WorldBet',
      sequenceId: 10002,
      email: 'bounty-admin@worldbet.com',
      password: sha512('123456'),
      role: 'bounty-admin',
      active: true,
      activationCode: '2'
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new UsersModel({
      firstName: 'Bauyrzhan',
      lastName: 'Ibraimov',
      sequenceId: 10002,
      email: 'kz.baurzhan@gmail.com',
      password: sha512('19881818'),
      role: 'user',
      active: true,
      activationCode: '2'
    }).save())
  }))

  console.log('user loaded')
  arr.push(new Promise((resolve) => {
    return resolve(new CurrenciesModel({
      name: 'BITCOIN',
      code: 'btc',
      order: 1,
      multiplier: 0.00000001,
      minAmount: 0.01,
      maxAmount: 100,
      coincapPriceUsd: 12000
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CurrenciesModel({
      name: 'ETHEREUM',
      code: 'eth',
      order: 3,
      multiplier: 0.00000001,
      minAmount: 0.01,
      maxAmount: 100,
      coincapPriceUsd: 900
    }).save())
  }))

  console.log('currencies loaded')

  arr.push(new Promise((resolve) => {
    return resolve(new ReferralProgramsModel({
      level: 1,
      perc: 3
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new ReferralProgramsModel({
      level: 2,
      perc: 2
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new ReferralProgramsModel({
      level: 3,
      perc: 1
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 1,
      name: 'Egypt',
      code: 'EGY',
      region: 'Africa',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 2,
      name: 'Morocco',
      code: 'MAR',
      region: 'Africa',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 3,
      name: 'Nigeria',
      code: 'NGA',
      region: 'Africa',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 4,
      name: 'Senegal',
      code: 'SEN',
      region: 'Africa',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 5,
      name: 'Tunisia',
      code: 'TUN',
      region: 'Africa',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 6,
      name: 'Australia',
      code: 'AUS',
      region: 'Asia',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 7,
      name: 'Iran',
      code: 'IRN',
      region: 'Asia',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 8,
      name: 'Japan',
      code: 'JPN',
      region: 'Asia',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 9,
      name: 'Korea Republic',
      code: 'KOR',
      region: 'Asia',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 10,
      name: 'Saudi Arabia',
      code: 'KSA',
      region: 'Asia',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 11,
      name: 'Belgium',
      code: 'BEL',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 12,
      name: 'Croatia',
      code: 'CRO',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 13,
      name: 'Denmark',
      code: 'DEN',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 14,
      name: 'England',
      code: 'ENG',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 15,
      name: 'France',
      code: 'FRA',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 16,
      name: 'Germany',
      code: 'GER',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 17,
      name: 'Iceland',
      code: 'ISL',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 18,
      name: 'Poland',
      code: 'POL',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 19,
      name: 'Portugal',
      code: 'POR',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 20,
      name: 'Russia',
      code: 'RUS',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 21,
      name: 'Serbia',
      code: 'SRB',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 22,
      name: 'Spain',
      code: 'ESP',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 23,
      name: 'Sweden',
      code: 'SWE',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 24,
      name: 'Switzerland',
      code: 'SUI',
      region: 'Europe',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 25,
      name: 'Costa Rica',
      code: 'CRC',
      region: 'North, Central America and Caribbean',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 26,
      name: 'Mexico',
      code: 'MEX',
      region: 'North, Central America and Caribbean',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 27,
      name: 'Panama',
      code: 'PAN',
      region: 'North, Central America and Caribbean',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 28,
      name: 'Argentina',
      code: 'ARG',
      region: 'South America',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 29,
      name: 'Brazil',
      code: 'BRA',
      region: 'South America',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 30,
      name: 'Colombia',
      code: 'COL',
      region: 'South America',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 31,
      name: 'Peru',
      code: 'PER',
      region: 'South America',
      active: true
    }).save())
  }))

  arr.push(new Promise((resolve) => {
    return resolve(new CountriesModel({
      sequenceId: 32,
      name: 'Uruguay',
      code: 'URU',
      region: 'South America',
      active: true
    }).save())
  }))
  console.log('countries loaded')

  Promise.all(arr).then(() => {
    return UsersModel.findOne({email: 'kz.baurzhan@gmail.com'}).exec()
      .then((user) => {
        if (!user) {
          throw new Error('User not found')
        }

        Promise.all(arr).then(() => {
          return UsersModel.findOne({email: 'kz.baurzhan@gmail.com'}).exec()
            .then((user) => {
              if (!user) {
                throw new Error('User not found')
              }

              const newTicketPrice = new TicketPriceModel({
                userId: user._id,
                priceUSD: 1,
                priceBTC: 0.00117835,
                priceETH: 0.01166152,
                startDate: Date.now(),
                active: true
              })

              return Promise.all([
                CurrenciesModel.findOne({code: 'btc'}).exec(),
                CurrenciesModel.findOne({code: 'eth'}).exec(),
                newTicketPrice.save()
              ]).spread((currencyBtc, currencyEth) => {
                const newHistory = new HistoriesModel({
                  userId: user._id,
                  value: 0.2,
                  currencyId: currencyBtc._id,
                  currencyCode: currencyBtc.code,
                  currencyName: currencyBtc.name,
                  coincapPriceUsd: currencyBtc.coincapPriceUsd,
                  type: 'invest'
                })

                const newHistory2 = new HistoriesModel({
                  userId: user._id,
                  value: 0.2,
                  currencyId: currencyEth._id,
                  currencyCode: currencyEth.code,
                  currencyName: currencyEth.name,
                  coincapPriceUsd: currencyEth.coincapPriceUsd,
                  type: 'invest'
                })

                return Promise.all([newHistory.save(), newHistory2.save()])
              }).then(() => {
                process.exit(1)
              })
              //
              // });
            })
        })
      })
  })
})
