const authConfig = require("../config/auth");
const {
  RealTimeInstallation
} = require("../models/index");
const axios = require('axios');
const InstallationModbusTCPController = {};





InstallationModbusTCPController.communication = (req, res) => {


  socket.on('connect', () => {
    console.log("Conectado")

    function getdate() {
      let = arrayBool = [];
      client.readHoldingRegisters(0, 2).then(function (resp) {

        for (var i = 0; i < resp.response._body._values.length; i++) {
          console.log(resp.response._body._values[i])
          for (var j = 0; j < 16; j++) {
            arrayBool[i][j] = Boolean(resp.response._body._values[i] & (1 << j))
            console.log("data" + j, arrayBool[i][j])
          }
        }
      }).catch(function (err) {
        console.log(err)
      })



      client.readHoldingRegisters(2, 247).then(function (resp) {

        for (var i = 0; i < resp.response._body._values.length; i++) {
          console.log(resp.response._body._values[i])
          arrayBool[2 + i] = resp.response._body._values[i]
          console.log("data" + i, arrayBool[2 + i])
        }
      }).catch(function () {
        console.error(arguments)
        socket.end()
      })

      client.readHoldingRegisters(249, 10).then(function (resp) {

        for (var i = 0; i < resp.response._body._values.length; i++) {
          console.log(resp.response._body._values[i])
          for (var j = 0; j < 16; j++) {
            arrayBool[249 + i][j] = Boolean(resp.response._body._values[i] & (1 << j))
            console.log("data" + j, arrayBool[249 + i][j])
          }
        }
      }).catch(function (err) {
        console.log(err)
      })

      client.readHoldingRegisters(260, 30).then(function (resp) {

        for (var i = 0; i < resp.response._body._values.length; i++) {
          console.log(resp.response._body._values[i])
          arrayBool[260 + i] = resp.response._body._values[i]
          console.log("data" + i, arrayBool[260 + i])
        }
      }).catch(function () {
        console.error(arguments)
        socket.end()
      })



    }
    setInterval(getdate, 1000)

  })
}


InstallationModbusTCPController.systemOnOff = (req, res) => {
  console.log("systemOnOff")
  client.writeHoldingRegisters(40, [req.body.systemOnOff]).then(function (resp) {
    console.log(resp)
  }).catch(function (err) {
    console.log(err)
  })
}
InstallationModbusTCPController.writeBitHoldingRegisters = (req, res) => {

  console.log("writeHoldingRegisters")
  client.readHoldingRegisters(req.body.address, 1).then(function (resp) {
    const myData = resp.response._body._values[0]
    const bitValue = req.body.bitValue
    console.log("data", bit)
    if (bitValue) {
      client.writeHoldingRegisters(req.body.address, [myData & ~(1 << req.body.bit)]).then(function (resp) {
        console.log(resp)
      }).catch(function (err) {
        console.log(err)
      })
    } else {
      client.writeHoldingRegisters(req.body.address, [myData | (1 << req.body.bit)]).then(function (resp) {
        console.log(resp)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }).catch(function (err) {
    console.log(err)
  })
}


InstallationModbusTCPController.readHoldingRegisters = (req, res) => {
  console.log("readHoldingRegisters")
  client.readHoldingRegisters(req.body.address, req.body.quantity).then(function (resp) {
    console.log(resp)
  }).catch(function (err) {
    console.log(err)
  })
}

InstallationModbusTCPController.writeHoldingRegisters = (req, res) => {
  console.log("writeHoldingRegisters")
  client.writeHoldingRegisters(req.body.address, [req.body.value]).then(function (resp) {
    console.log(resp)
  }).catch(function (err) {
    console.log(err)
  })
}






// //modbus tcp
// console.log("hola")

// const net = require('net');
// const modbus = require('jsmodbus')
// const socket = new net.Socket();
// const options = {
//   'host': '192.168.1.10',
//   'port': '502'
// }
// const client = new modbus.client.TCP(socket)
// var myData = 0;

// socket.on('connect', () => {
//   console.log("Conectado")

//   function getdate() {
//     client.readHoldingRegisters(0, 4).then(function (resp) {
//       myData = resp.response._body._values[0]
//       console.log("data1", myData)
//       myData = resp.response._body._values[1]
//       console.log("data2", myData)
//       myData = resp.response._body._values[2]
//       console.log("data3", myData)
//       myData = resp.response._body._values[3]
//       console.log("data4", myData)
//     }).catch(function () {
//       console.error(arguments)
//       socket.end()
//     })
//     client.readHoldingRegisters(0, 1).then(function (resp) {
//       myData = resp.response._body._values[0]
//       console.log("data1", myData)
//       const bit1 = Boolean(myData & (1 << 0))
//       const bit2 = Boolean(myData & (1 << 1))
//       const bit3 = Boolean(myData & (1 << 2))
//       const bit4 = Boolean(myData & (1 << 3))
//       const bit5 = Boolean(myData & (1 << 4))
//       const bit6 = Boolean(myData & (1 << 5))
//       const bit7 = Boolean(myData & (1 << 6))
//       const bit8 = Boolean(myData & (1 << 7))
//       const bit9 = Boolean(myData & (1 << 8))
//       const bit10 = Boolean(myData & (1 << 9))
//       const bit11 = Boolean(myData & (1 << 10))
//       const bit12 = Boolean(myData & (1 << 11))
//       const bit13 = Boolean(myData & (1 << 12))
//       const bit14 = Boolean(myData & (1 << 13))
//       const bit15 = Boolean(myData & (1 << 14))
//       const bit16 = Boolean(myData & (1 << 15))

//       console.log("data1", bit1)
//       console.log("data2", bit2)
//       console.log("data3", bit3)
//       console.log("data4", bit4)
//       console.log("data5", bit5)
//       console.log("data6", bit6)
//       console.log("data7", bit7)
//       console.log("data8", bit8)
//       console.log("data9", bit9)
//       console.log("data10", bit10)
//       console.log("data11", bit11)
//       console.log("data12", bit12)
//       console.log("data13", bit13)
//       console.log("data14", bit14)
//       console.log("data15", bit15)
//       console.log("data16", bit16)

//       // const bit16=Boolean(myData&(valor<<16)) para poner primera palabra encima del todo
//       //luego haces suma

//     }).catch(function () {
//       console.error(arguments)
//       socket.end()
//     })
//   }
//   setInterval(getdate, 1000)

// })

// socket.on('error', () => {
//   console.log("sin servidor en puerto ", port, " de ", host)
// })

// socket.on('data',(data)=>{
//   console.log("data",data)
// })

// socket.connect(options.port, options.host)






/////////////////////////////////////////////////////////////////////










// console.log("hola")

// const net = require('net');
// const modbus = require('jsmodbus')
// const netServer = new net.Server();
// const options = {
//   'host': '192.168.1.10',
//   'port': '502'
// }
// const server = new modbus.server.TCP(netServer)
// var myData = 0;


// netServer.on('connect', () => {
//   console.log("Conectado")

//   function getdate() {

//     console.log("data")
//     server.on('data', (data) => {
//       console.log("data", data)
//       myData = data.response._body._values[0]
//       console.log("data1", myData)
//       const bit1 = Boolean(myData & (1 << 0))
//       const bit2 = Boolean(myData & (1 << 1))
//       const bit3 = Boolean(myData & (1 << 2))
//       const bit4 = Boolean(myData & (1 << 3))
//       const bit5 = Boolean(myData & (1 << 4))
//       const bit6 = Boolean(myData & (1 << 5))
//       const bit7 = Boolean(myData & (1 << 6))
//       const bit8 = Boolean(myData & (1 << 7))
//       const bit9 = Boolean(myData & (1 << 8))
//       const bit10 = Boolean(myData & (1 << 9))
//       const bit11 = Boolean(myData & (1 << 10))
//       const bit12 = Boolean(myData & (1 << 11))
//       const bit13 = Boolean(myData & (1 << 12))
//       const bit14 = Boolean(myData & (1 << 13))
//       const bit15 = Boolean(myData & (1 << 14))
//       const bit16 = Boolean(myData & (1 << 15))

//       console.log("data1", bit1)
//       console.log("data2", bit2)
//       console.log("data3", bit3)
//       console.log("data4", bit4)
//       console.log("data5", bit5)
//       console.log("data6", bit6)
//       console.log("data7", bit7)
//       console.log("data8", bit8)
//       console.log("data9", bit9)
//       console.log("data10", bit10)
//       console.log("data11", bit11)
//       console.log("data12", bit12)
//       console.log("data13", bit13)
//       console.log("data14", bit14)
//       console.log("data15", bit15)
//       console.log("data16", bit16)
//     })
//   }
//   setInterval(getdate, 1000)
// })










// InstallationModbusTCPController.readHoldingRegisters = (req, res) => {
//   console.log("readHoldingRegisters")
//   client.readHoldingRegisters(req.body.address, req.body.quantity).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
// InstallationModbusTCPController.writeHoldingRegisters = (req, res) => {
//   console.log("writeHoldingRegisters")
//   client.writeHoldingRegisters(req.body.address, [req.body.value]).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
// InstallationModbusTCPController.readInputRegisters = (req, res) => {
//   console.log("readInputRegisters")
//   client.readInputRegisters(req.body.address, req.body.quantity).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
// InstallationModbusTCPController.writeInputRegisters = (req, res) => {
//   console.log("writeInputRegisters")
//   client.writeInputRegisters(req.body.address, [req.body.value]).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
// InstallationModbusTCPController.readCoils = (req, res) => {
//   console.log("readCoils")
//   client.readCoils(req.body.address, req.body.quantity).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
// InstallationModbusTCPController.writeCoils = (req, res) => {
//   console.log("writeCoils")
//   client.writeCoils(req.body.address, req.body.value).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
// InstallationModbusTCPController.readDiscreteInputs = (req, res) => {
//   console.log("readDiscreteInputs")
//   client.readDiscreteInputs(req.body.address, req.body.quantity).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
// InstallationModbusTCPController.writeDiscreteInputs = (req, res) => {
//   console.log("writeDiscreteInputs")
//   client.writeDiscreteInputs(req.body.address, req.body.value).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
// InstallationModbusTCPController.writeMultipleCoils = (req, res) => {
//   console.log("writeMultipleCoils")
//   client.writeMultipleCoils(req.body.address, req.body.value).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
// InstallationModbusTCPController.writeMultipleRegisters = (req, res) => {
//   console.log("writeMultipleRegisters")
//   client.writeMultipleRegisters(req.body.address, req.body.value).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
// InstallationModbusTCPController.writeSingleRegister = (req, res) => {
//   console.log("writeSingleRegister")
//   client.writeSingleRegister(req.body.address, req.body.value).then(function (resp) {
//     console.log(resp)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }



const authConfig = require("../config/auth");
const {
  RealTimeInstallation
} = require("../models/index");
const axios = require('axios');
const InstallationModbusTCPController = {};






//modbus tcp

console.log("hola")

const net = require('net');
const modbus = require('jsmodbus');
const options = {
  'host': '192.168.1.10',
  'port': '502',
  'unitId': '1',
  'autoReconnect': true,
  'reconnectTimeout': 1000,
  'timeout': 1000,
  'logEnabled': false
};

const netServer = new net.Server();
const server = new modbus.server.TCP(netServer);


server.on('connection', function (client) {
  console.log('Client connected');
});
netServer.listen(options.host,options.port,)



// netServer.listen(function () {
//   console.log('Modbus TCP Server listening on port 502');



// });

// netServer.listen('connect', function (socket) {
//   console.log('Client connected');
//   socket.on('end', function () {
//     console.log('Client disconnected');
//   });
//   socket.on('data', function (data) {
//     console.log('Received: ' + data);
//   });
// });




// server.readHoldingRegisters(0, 1).then(function (resp) {
//   const myData = resp.response._body._values[0]
//   console.log("data1", myData)
// }).catch(function (err) {
//   console.log(err)
// })



// const socket = new net.Server();
// const options = {
//   'host':'192.168.1.10',
//   'port': '502'
// }
// const client = new modbus.server.TCP(socket)
// var myData = 0;

// socket.on('connect',()=>{
//   console.log("Conectado")
//   function getdate(){
//     client.readHoldingRegisters(40,8).then(function(resp){
//       myData=resp.response._body._values[0]
//       console.log("data1",myData)
//       myData=resp.response._body._values[1]
//       console.log("data2",myData)
//       myData=resp.response._body._values[2]
//       console.log("data3",myData)
//       myData=resp.response._body._values[3]
//       console.log("data4",myData)
//     }).catch(function(){
//       console.error(arguments)
//       socket.end()
//     })
//     client.readHoldingRegisters(40,1).then(function(resp){
//       myData=resp.response._body._values[0]
//       console.log("data1",myData)
//       const bit1=Boolean(myData&(1<<0))
//       const bit2=Boolean(myData&(1<<1))
//       const bit3=Boolean(myData&(1<<2))
//       const bit4=Boolean(myData&(1<<3))
//       const bit5=Boolean(myData&(1<<4))
//       const bit6=Boolean(myData&(1<<5))
//       const bit7=Boolean(myData&(1<<6))
//       const bit8=Boolean(myData&(1<<7))
//       const bit9=Boolean(myData&(1<<8))
//       const bit10=Boolean(myData&(1<<9))
//       const bit11=Boolean(myData&(1<<10))
//       const bit12=Boolean(myData&(1<<11))
//       const bit13=Boolean(myData&(1<<12))
//       const bit14=Boolean(myData&(1<<13))
//       const bit15=Boolean(myData&(1<<14))
//       const bit16=Boolean(myData&(1<<15))

//       console.log("data1",bit1)
//       console.log("data2",bit2)
//       console.log("data3",bit3)
//       console.log("data4",bit4)
//       console.log("data5",bit5)
//       console.log("data6",bit6)
//       console.log("data7",bit7)
//       console.log("data8",bit8)
//       console.log("data9",bit9)
//       console.log("data10",bit10)
//       console.log("data11",bit11)
//       console.log("data12",bit12)
//       console.log("data13",bit13)
//       console.log("data14",bit14)
//       console.log("data15",bit15)
//       console.log("data16",bit16)

//       // const bit16=Boolean(myData&(valor<<16)) para poner primera palabra encima del todo
//       //luego haces suma





//     }).catch(function(){
//       console.error(arguments)
//       socket.end()
//     })
//   }
//   setInterval(getdate,1000)

// })

// // socket.on('error',()=>{
// //   console.log("sin servidor en puerto ",port," de ",host)
// // })

// // socket.on('data',(data)=>{
// //   console.log("data",data)
// // })


// socket.connect(options.port,options.host)








module.exports = InstallationModbusTCPController;







module.exports = InstallationModbusTCPController;