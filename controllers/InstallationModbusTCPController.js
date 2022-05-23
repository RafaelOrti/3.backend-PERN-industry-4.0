const authConfig = require("../config/auth");
const {
  RealTimeInstallation
} = require("../models/index");
const axios = require('axios');
const InstallationModbusTCPController = {};







//modbus tcp

console.log("hola")

const net = require('net');
const modbus = require('jsmodbus')
const socket = new net.Socket();
const options = {
  'host':'192.168.1.10',
  'port': '502'
}
const client = new modbus.client.TCP(socket)
var myData = 0;

socket.on('connect',()=>{
  console.log("Conectado")
  function getdate(){
    client.readHoldingRegisters(40,8).then(function(resp){
      myData=resp.response._body._values[0]
      console.log("data1",myData)
      myData=resp.response._body._values[1]
      console.log("data2",myData)
      myData=resp.response._body._values[2]
      console.log("data3",myData)
      myData=resp.response._body._values[3]
      console.log("data4",myData)
    }).catch(function(){
      console.error(arguments)
      socket.end()
    })
    client.readHoldingRegisters(40,1).then(function(resp){
      myData=resp.response._body._values[0]
      console.log("data1",myData)
      const bit1=Boolean(myData&(1<<0))
      const bit2=Boolean(myData&(1<<1))
      const bit3=Boolean(myData&(1<<2))
      const bit4=Boolean(myData&(1<<3))
      const bit5=Boolean(myData&(1<<4))
      const bit6=Boolean(myData&(1<<5))
      const bit7=Boolean(myData&(1<<6))
      const bit8=Boolean(myData&(1<<7))
      const bit9=Boolean(myData&(1<<8))
      const bit10=Boolean(myData&(1<<9))
      const bit11=Boolean(myData&(1<<10))
      const bit12=Boolean(myData&(1<<11))
      const bit13=Boolean(myData&(1<<12))
      const bit14=Boolean(myData&(1<<13))
      const bit15=Boolean(myData&(1<<14))
      const bit16=Boolean(myData&(1<<15))

      console.log("data1",bit1)
      console.log("data2",bit2)
      console.log("data3",bit3)
      console.log("data4",bit4)
      console.log("data5",bit5)
      console.log("data6",bit6)
      console.log("data7",bit7)
      console.log("data8",bit8)
      console.log("data9",bit9)
      console.log("data10",bit10)
      console.log("data11",bit11)
      console.log("data12",bit12)
      console.log("data13",bit13)
      console.log("data14",bit14)
      console.log("data15",bit15)
      console.log("data16",bit16)

      // const bit16=Boolean(myData&(valor<<16)) para poner primera palabra encima del todo
      //luego haces suma





    }).catch(function(){
      console.error(arguments)
      socket.end()
    })
  }
  setInterval(getdate,1000)

})

// socket.on('error',()=>{
//   console.log("sin servidor en puerto ",port," de ",host)
// })

// socket.on('data',(data)=>{
//   console.log("data",data)
// })


socket.connect(options.port,options.host)








module.exports = InstallationModbusTCPController;