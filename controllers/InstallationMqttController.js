// const authConfig = require('../config/auth')
// const { RealTimeInstallation } = require('../models/index')
// const axios = require('axios')
const InstallationModbusTCPController = {}

// let b
// const position = [0, 0, 0, 0]

// modbus tcp

const net = require('net')
// const modbus = require('jsmodbus')
const socket = new net.Socket()
const options = {
  host: '192.168.1.10',
  port: '502'
}
// const client = new modbus.client.TCP(socket)
// let myData = 0

InstallationModbusTCPController.communication = (req, res) => {
  socket.on('connect', () => {

    // function getdate () {
    //   client.readHoldingRegisters(0, 4).then(function (resp) {
    //     myData = resp.response._body._values[0]
    //     console.log('hr1', myData)
    //     myData = resp.response._body._values[1]
    //     console.log('hr2', myData)
    //     myData = resp.response._body._values[2]
    //     console.log('hr3', myData)
    //     myData = resp.response._body._values[3]
    //     console.log('hr4', myData)
    //   }).catch(function () {
    //     console.error(arguments)
    //     socket.end()
    //   })
    //   // client.readHoldingRegisters(0, 1).then(function (resp) {
    //   //   myData = resp.response._body._values[0]
    //   //   // console.log("data1", myData)
    //   //   const bit1 = Boolean(myData & (1 << 0))
    //   //   const bit2 = Boolean(myData & (1 << 1))
    //   //   const bit3 = Boolean(myData & (1 << 2))
    //   //   const bit4 = Boolean(myData & (1 << 3))
    //   //   const bit5 = Boolean(myData & (1 << 4))
    //   //   const bit6 = Boolean(myData & (1 << 5))
    //   //   const bit7 = Boolean(myData & (1 << 6))
    //   //   const bit8 = Boolean(myData & (1 << 7))
    //   //   const bit9 = Boolean(myData & (1 << 8))
    //   //   const bit10 = Boolean(myData & (1 << 9))
    //   //   const bit11 = Boolean(myData & (1 << 10))
    //   //   const bit12 = Boolean(myData & (1 << 11))
    //   //   const bit13 = Boolean(myData & (1 << 12))
    //   //   const bit14 = Boolean(myData & (1 << 13))
    //   //   const bit15 = Boolean(myData & (1 << 14))
    //   //   const bit16 = Boolean(myData & (1 << 15))
    //   //   console.log("data1", bit1)
    //   //   console.log("data2", bit2)
    //   //   console.log("data3", bit3)
    //   //   console.log("data4", bit4)
    //   //   console.log("data5", bit5)
    //   //   console.log("data6", bit6)
    //   //   console.log("data7", bit7)
    //   //   console.log("data8", bit8)
    //   //   console.log("data9", bit9)
    //   //   console.log("data10", bit10)
    //   //   console.log("data11", bit11)
    //   //   console.log("data12", bit12)
    //   //   console.log("data13", bit13)
    //   //   console.log("data14", bit14)
    //   //   console.log("data15", bit15)
    //   //   console.log("data16", bit16)
    //   //   // const bit16=Boolean(myData&(valor<<16)) para poner primera palabra encima del todo
    //   //  //luego haces suma
    //   // }).catch(function () {
    //   //   console.error(arguments)
    //   //   socket.end()
    //   // })

    //   const graphSeries = (max, min, variation, i) => {
    //     if (position[i] < min) {
    //       b = Math.random() * variation
    //       position[i] = min
    //     }
    //     if (position[i] > max) {
    //       b = Math.random() * -variation
    //       position[i] = max
    //     }
    //     // loop here from 0 to whatever
    //     position[i] = position[i] + b
    //     console.log(position[i])
    //     console.log('varia', b)
    //     return position[i]
    //   }
    //   // or using your randomMumber function:

    //   const h = [graphSeries(30, 20, 0.5, 0), graphSeries(100, 20, 10, 1), graphSeries(10000, 2000, 100, 2), graphSeries(30, 1, 0.05, 3)]
    //   client.writeMultipleRegisters(0, h).then(function (resp) {
    //     // resp will look like { fc : 16, startAddress: 4, quantity: 4 }
    //     // console.log(resp);
    //     res.send({
    //       h
    //     })
    //   }, console.error)
    // }
    // setInterval(getdate, 1000)
  })
}

// socket.on('error',()=>{
//   console.log("sin servidor en puerto ",port," de ",host)
// }
// socket.on('data',(data)=>{
//   console.log("data",data)
// })

// const setBit = (direccion, bit) => {
//   socket.on('connect', () => {
//     console.log('Conectado')
//     client.readHoldingRegisters(direccion, 1).then(function (resp) {
//       myData = resp.response._body._values[0]
//       console.log('data1', myData)
//       myData = myData | (1 << bit)
//       client.writeSingleRegister(direccion, myData)
//       console.log('setdata1', myData)
//     })
//   })
// }
// setBit(0, 0);

// const clearBit = (direccion, bit) => {
//   socket.on('connect', () => {
//     console.log('Conectado')

//     client.readHoldingRegisters(direccion, 1).then(function (resp) {
//       myData = resp.response._body._values[0]
//       myData = myData & ~(1 << bit)
//       client.writeSingleRegister(direccion, myData)
//       console.log('setdata1', myData)
//     })
//   })
// }

// float to Binary
// const setFloat = (direccion, valor) => {
//   socket.on('connect', () => {
//     console.log("Conectado")
//     client.writeMultipleRegisters(direccion, [1, 2]).then(function (resp) {
//       console.log(resp);
//     }, console.error);
//   })
// }
// setFloat(0, 1.1);
// socket.on('connect',()=>{
//   console.log("Conectado")
//   function getdate(){
//     client.writeSingleRegister(0, 42)
//     // .then(function (resp) {
//     //       console.log(resp)
//     //     }).catch(function (err) {
//     //       console.log(err)
//     //     })
//   }
//   setInterval(getdate,1000)
// })

socket.connect(options.port, options.host)

module.exports = InstallationModbusTCPController
