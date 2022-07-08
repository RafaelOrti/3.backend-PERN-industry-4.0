// const authConfig = require('../config/auth')
// const { RealTimeInstallation } = require('../models/index')
// const axios = require('axios')
const InstallationModbusTCPController = {}
const { InstallationGraph, InstallationAlarms } = require('../models/index')
const { Op } = require('sequelize')
// const { Sequelize, Model, DataTypes } = require('sequelize')
let data

const dataBaseRandom = () => {
  const meassurements = []
  const x = Math.random()
  meassurements[0] = x * 40
  meassurements[1] = x * 100
  meassurements[2] = x * 10000
  meassurements[3] = x * 5
  meassurements[0] = meassurements[0].toFixed(2)
  meassurements[1] = meassurements[1].toFixed()
  meassurements[2] = meassurements[2].toFixed()
  meassurements[3] = meassurements[3].toFixed(1)
  meassurements[4] = Math.round(Math.random())
  meassurements[5] = Math.round(Math.random())
  meassurements[6] = Math.round(Math.random())

  meassurements[7] = Math.round(Math.random())
  meassurements[8] = Math.round(Math.random())
  meassurements[9] = Math.round(Math.random())
  meassurements[10] = Math.round(Math.random())
  meassurements[11] = Math.round(Math.random())
  meassurements[12] = Math.round(Math.random())
  meassurements[13] = Math.round(Math.random())
  meassurements[14] = Math.round(Math.random())

  data = {
    onOff: meassurements[4],
    mode: meassurements[5],
    door: meassurements[6],
    temperature: meassurements[0],
    h2o: meassurements[1],
    co2: meassurements[2],
    c2h4: meassurements[3]
  }

  try {
    InstallationGraph.create({
      onOff: meassurements[4],
      mode: meassurements[5],
      door: meassurements[6],
      temperature: meassurements[0],
      H2O: meassurements[1],
      CO2: meassurements[2],
      C2H4: meassurements[3]
    })
  } catch (error) {

  }

  try {
    InstallationAlarms.create({
      hTempAlarm: meassurements[7],
      lTempAlarm: meassurements[8],
      hH2OAlarm: meassurements[9],
      lH2OAlarm: meassurements[10],
      hC2OAlarm: meassurements[11],
      lC2OAlarm: meassurements[12],
      hC2H4Alarm: meassurements[13],
      lC2H4Alarm: meassurements[14]
    })
  } catch (error) {
    console.log('error', error)
  }
}

setInterval(dataBaseRandom, 10000)

InstallationModbusTCPController.communication = async (req, res) => {
  res.send(data)
}

InstallationModbusTCPController.graphData = async (req, res) => {
  console.log('startDate', req.body.startDate)
  console.log('endDate', req.body.endDate)
  const startDate = new Date(req.body.startDate).toISOString()
  const endDate = new Date(req.body.endDate).toISOString()

  try {
    const data = await InstallationGraph.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      }
    })
    res.send(data)
  } catch (error) {
    console.log('error', error)
    res.send({
      msg: 'DB error'
    })
  }
}

InstallationModbusTCPController.alarmsData = async (req, res) => {
  console.log('startDate', req.body.startDate)
  console.log('endDate', req.body.endDate)
  const startDate = new Date(req.body.startDate).toISOString()
  const endDate = new Date(req.body.endDate).toISOString()

  try {
    const data = await InstallationAlarms.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      }
    })

    for (let i = 0; i < data.length; i++) {
      const obj = data[i].dataValues
      console.log('obj', obj)
      const arr = Object.keys(obj).map(function (key) {
        return [obj[key]]
      })
      data[i] = arr
    }
    console.log('data', data[0])

    res.send(data)
  } catch (error) {
    res.send({
      msg: 'DB error'
    })
  }
}

// var query = {
//     Date: {
//         $gte: new Date(req.body.startDate).toISOString(),
//         $lte: new Date(req.body.endDate).toISOString()
//     }
// }

// InstallationGraph.find(query, function (err, data) {
//     if (err) { return res.status(300).json("Error") }
//     else {
//         return res.status(200).json({ data: data })
//     }
// })

// const query = {
//   startDate,
//   endDate,
// }
// console.log(startDate)
// console.log(endDate)

// InstallationGraph.findAll({
//   where: {
//     [Op.and]: [{
//         createdAt: {
//           [Op.between]: [startDate, endDate]
//         }
//       },
//       Sequelize.where(Sequelize.cast(Sequelize.col('createdAt'), 'time'), '>=', '12:00'),
//       Sequelize.where(Sequelize.cast(Sequelize.col('createdAt'), 'time'), '<=', '15:00')
//     ]
//   }
// }).then(data => {
//   res.send(data);
//   console.log(data);
// }).catch(error => {
//   res.send({
//     msg: `DB error`
//   });
// })

module.exports = InstallationModbusTCPController
