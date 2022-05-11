const authConfig = require("../config/auth");
const {
  RealTimeInstallation
} = require("../models/index");
const axios = require('axios');

//oauth2.0
const oauth = require('axios-oauth-client');

const InstallationController = {};


//----------------------------------------------
//10 HOURS LOGIN
//'http://localhost:5000/installation/userInstallation'
//----------------------------------------------

// //timers
// const frecuencyLogin = 10 * 60 * 60 * 1000; // 10 hour in msec, frecuency call timing
// const firstCall = 100; //first call timing
// let tokenInstallation;
// let call = async () => {
//   tokenInstallation = await axios.post(`http://localhost:5000/installation/userInstallation`);
// }
// setTimeout(
//   call, firstCall);
// setInterval(
//   call,
//   frecuencyLogin);
// //userInstallation
// //http://localhost:5000/installation/userInstallation

// InstallationController.userInstallation = async (req, res) => {

//   const getOwnerCredentials = oauth.client(axios.create(), {
//     url: 'https://la-api-de-test.ddns.net:18452/users/login',
//     username: 'rafa',
//     password: '12345678',
//   });

//   const auth = await getOwnerCredentials();
//   console.log(auth.access_token);
//   res.send(auth)

// }


// // ----------------------------------------------
// // REAL TIME
// // 'http://localhost:5000/installation/readInstallation'
// // ----------------------------------------------

// let realTimeArray = [];
// let insideArray = [];


// const frecuencyRealTime = 2000; //first call timing
// let realTime = async () => {
//   await axios.post(`http://localhost:5000/installation/readInstallation`);
// }
// // setInterval(
// //   realTime,
// //   frecuencyRealTime);
// //userInstallation
// //http://localhost:5000/installation/userInstallation
// InstallationController.readInstallation = async (req, res) => {


//   if (tokenInstallation === undefined) {
//     await call().catch(console.log('error'))
//     //nodemailer
//   }

//   console.log(tokenInstallation);


//   let comoPideLosDatos = `
//   curl -X 'POST' \
//   'https://la-api-de-test.ddns.net:18452/get_raw_data/' \
//   -H 'accept: application/json' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb3NlbSIsImV4cCI6MTY1MDk2ODI4OH0.Nva--HRtUtROOwm78D-ajnIDnlT4TVF43Bgk4C6OOAg' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "host": "192.168.1.9",
//   "port": 502,
//   "protocol": "modbusTCP",
//   "memory_area": "input_registers",
//   "address_from": 0,
//   "quantity": 5
// }'
// `
//   let body = {
//     "host": "192.168.1.9",
//     "port": 502,
//     "protocol": "modbusTCP",
//     "memory_area": "input_registers",
//     "address_from": 0,
//     "quantity": 18
//   }

//   let header = {
//     "Authorization": `Bearer ${tokenInstallation.data.access_token}`,
//     'accept': ' application/json',
//     'Content-Type': 'application/json'
//   }
//   try {

//     //2 3 4 5 6 7 8 9 10 11
//     //ponerle el id 

//     // let numberRowsSQL = `
//     // SELECT COUNT(*)
//     // FROM realtimeinstallations;
//     // `;

//     // let numberRowsResult = await RealTimeInstallation.sequelize.query(numberRowsSQL, {
//     //   type: RealTimeInstallation.sequelize.QueryTypes.SELECT
//     // });
//     // console.log('555555',numberRowsResult[0]['COUNT(*)']);


//     // if (numberRowsResult[0]['COUNT(*)'] > 10) {
//     //   let consulta = `
//     //   DELETE FROM realtimeinstallations LIMIT 1
//     //   `;
//     //   await RealTimeInstallation.sequelize.query(consulta, {
//     //     type: RealTimeInstallation.sequelize.QueryTypes.DELETE
//     //   });
//     //   // console.log(resultado)
//     // }

//     let readData = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body, {
//       headers: header
//     });
//     // //save in db
//     // RealTimeInstallation.create({
//     //   temperature: readData.data.data[0] / 100,
//     //   h2o: readData.data.data[1],
//     //   co2: readData.data.data[2],
//     //   c2h4: readData.data.data[3] / 10000
//     // }).then(RealTimeInstallation => {
//     //   res.send(`Registrado tiempo real, ${RealTimeInstallation}`);
//     // }).catch((error) => {
//     //   res.send(`db error ${error}`);
//     // });


//     let a = realTimeArray.length
//     console.log(a);
//     if (a > 3) {


//       insideArray[0] = readData.data.data[0] / 100
//       insideArray[1] = readData.data.data[1] / Math.random()
//       insideArray[2] = readData.data.data[2]
//       insideArray[3] = readData.data.data[3] / 10000

//       realTimeArray.shift();
//       // realTimeArray.push(insideArray);
//       // realTimeArray[a-1] = insideArray


//       // for (let i = 0; i < 3; i++) {
//       //   realTimeArray[i] = realTimeArray[i+1] 
//       //   console.log("eeee",realTimeArray[i],i);
//       // }



//     } else {
//       console.log("holaaaaaaa")

//       insideArray[0] = readData.data.data[0] / 100
//       insideArray[1] = readData.data.data[1] / Math.random()
//       insideArray[2] = readData.data.data[2]
//       insideArray[3] = readData.data.data[3] / 10000

//       realTimeArray[0].push(insideArray)
//       // realTimeArray[a+1][2] = readData.data.data[1],
//       // realTimeArray[a+1][3] = readData.data.data[2],
//       // realTimeArray[a+1][4] = readData.data.data[3] / 10000
//     }
//     console.log("99999", realTimeArray)
//   } catch (error) {
//     console.log(error);
//   }
// }



//----------------------------------------------
//10 WRITE COIL
//http://localhost:5000/installation/userInstallation
//----------------------------------------------
InstallationController.writeCoils = async (req, res) => {

  if (tokenInstallation === undefined) {
    await call().catch(console.log('error'))
    //nodemailer
  }

  const getOwnerCredentials = oauth.client(axios.create(), {
    url: 'https://la-api-de-test.ddns.net:18452/users/login',
    username: 'rafa',
    password: '12345678',
  });

  const auth = await getOwnerCredentials();
  console.log(auth.access_token);

  let body = req.body
  // res.send(body)

  // {
  //   "host": "192.168.1.9",
  //   "port": 502,
  //   "protocol": "modbusTCP",
  //   "memory_area": "coils",
  //   "address_from": 0,
  //   "quantity": 1
  // }

  let header = {
    "Authorization": `Bearer ${auth.access_token}`,
    'accept': ' application/json',
    'Content-Type': 'application/json'
  }

  try {

    let readData = await axios.post(`https://la-api-de-test.ddns.net:18452/write_raw_data`, body, {
      headers: header
    });
    console.log(readData);
    res.send(readData.data);

  } catch (error) {
    console.log(error);
    res.send(error);
  }
}


//----------------------------------------------
//10 READ COIL
//http://localhost:5000/installation/userInstallation
//----------------------------------------------

InstallationController.readCoils = async (req, res) => {

  if (tokenInstallation === undefined) {
    await call().catch(console.log('error'))
    //nodemailer
  }

  const getOwnerCredentials = oauth.client(axios.create(), {
    url: 'https://la-api-de-test.ddns.net:18452/users/login',
    username: 'rafa',
    password: '12345678',
  });

  const auth = await getOwnerCredentials();
  console.log(auth.access_token);


  let body = req.body
  let header = {
    "Authorization": `Bearer ${auth.access_token}`,
    'accept': ' application/json',
    'Content-Type': 'application/json'
  }


  try {

    let readData = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body, {
      headers: header
    });
    console.log(readData);
    let chunk=[]
    console.log(readData.data.data);
    for (let i = 0; i < 2; i ++) {
      chunk[i] = readData.data.data[i];

      // do whatever
    }
    console.log(chunk)
    res.send(chunk);
    


  } catch (error) {
    console.log(error);
    res.send(error);
  }
}



//----------------------------------------------
//10 READ DISCRETE INPUT
//https://la-api-de-test.ddns.net:18452/get_raw_data
//----------------------------------------------

InstallationController.readDiscreteInputs = async (req, res) => {

  if (tokenInstallation === undefined) {
    await call().catch(console.log('error'))
    //nodemailer
  }


  let body = {
    "host": "192.168.1.9",
    "port": 502,
    "protocol": "modbusTCP",
    "memory_area": "discrete_inputs",
    "address_from": 0,
    "quantity": 9
  }

  let header = {
    "Authorization": `Bearer ${tokenInstallation.data.access_token}`,
    'accept': ' application/json',
    'Content-Type': 'application/json'
  }
  try {


    let readData = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body, {
      headers: header
    });

    let chunk=[]
    console.log(readData.data.data);
    for (let i = 0; i < 9; i ++) {
      chunk[i] = readData.data.data[i];
      console.log(readData.data.data[i]);
      // do whatever
    }
    console.log(chunk)
    res.send(chunk);

    // //save in db
    // RealTimeInstallation.create({
    //   temperature: readData.data.data[0] / 100,
    //   h2o: readData.data.data[1],
    //   co2: readData.data.data[2],
    //   c2h4: readData.data.data[3] / 10000
    // }).then(RealTimeInstallation => {
    //   res.send(`Registrado tiempo real, ${RealTimeInstallation}`);
    // }).catch((error) => {
    //   res.send(`db error ${error}`);
    // });

  } catch (error) {
    console.log(error);
    res.send(error);
  }
}


//----------------------------------------------
//10 WRITE HOLDING REGISTER
//https://la-api-de-test.ddns.net:18452/write_raw_data
//----------------------------------------------
InstallationController.writeHoldingRegisters = async (req, res) => {

  const getOwnerCredentials = oauth.client(axios.create(), {
    url: 'https://la-api-de-test.ddns.net:18452/users/login',
    username: 'rafa',
    password: '12345678',
  });

  const auth = await getOwnerCredentials();
  console.log(auth.access_token);

  let body = req.body
  // res.send(body)



  let header = {
    "Authorization": `Bearer ${auth.access_token}`,
    'accept': ' application/json',
    'Content-Type': 'application/json'
  }

    // {
  //   "host": "192.168.1.9",
  //   "port": 502,
  //   "protocol": "modbusTCP",
  //   "memory_area": "coils",
  //   "address_from": 0,
  //   "quantity": 1
  // }

  try {

    let readData = await axios.post(`https://la-api-de-test.ddns.net:18452/write_raw_data`, body, {
      headers: header
    });
    console.log(readData);
    res.send(readData.data);




  } catch (error) {
    console.log(error);
    res.send(error);
  }
}


//----------------------------------------------
//10 READ HOLDING REGISTER
//https://la-api-de-test.ddns.net:18452/get_raw_data
//----------------------------------------------

InstallationController.readHoldingRegisters = async (req, res) => {

  if (tokenInstallation === undefined) {
    await call().catch(console.log('error'))
    //nodemailer
  }


  let body = {
    "host": "192.168.1.9",
    "port": 502,
    "protocol": "modbusTCP",
    "memory_area": "holding_registers",
    "address_from": 0,
    "quantity": 7
  }

  let header = {
    "Authorization": `Bearer ${tokenInstallation.data.access_token}`,
    'accept': ' application/json',
    'Content-Type': 'application/json'
  }
  try {


    let readData = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body, {
      headers: header
    });
    console.log(readData);
    res.send(readData.data);
    // //save in db
    // RealTimeInstallation.create({
    //   temperature: readData.data.data[0] / 100,
    //   h2o: readData.data.data[1],
    //   co2: readData.data.data[2],
    //   c2h4: readData.data.data[3] / 10000
    // }).then(RealTimeInstallation => {
    //   res.send(`Registrado tiempo real, ${RealTimeInstallation}`);
    // }).catch((error) => {
    //   res.send(`db error ${error}`);
    // });

  } catch (error) {
    console.log(error);
    res.send(error);
  }
}





//----------------------------------------------
//10 READ INPUT REGISTER
//https://la-api-de-test.ddns.net:18452/get_raw_data
//----------------------------------------------

InstallationController.readInputRegisters = async (req, res) => {

  if (tokenInstallation === undefined) {
    await call().catch(console.log('error'))
    //nodemailer
  }


  let body = {
    "host": "192.168.1.9",
    "port": 502,
    "protocol": "modbusTCP",
    "memory_area": "input_registers",
    "address_from": 0,
    "quantity": 18
  }

  let header = {
    "Authorization": `Bearer ${tokenInstallation.data.access_token}`,
    'accept': ' application/json',
    'Content-Type': 'application/json'
  }
  try {


    let readData = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body, {
      headers: header
    });
    console.log(readData);

    let chunk=[]
    console.log(readData.data.data);
    for (let i = 0; i < 7; i ++) {
      chunk[i] = readData.data.data[i];

      // do whatever
    }
    console.log(chunk)
    res.send(chunk);
    // //save in db
    // RealTimeInstallation.create({
    //   temperature: readData.data.data[0] / 100,
    //   h2o: readData.data.data[1],
    //   co2: readData.data.data[2],
    //   c2h4: readData.data.data[3] / 10000
    // }).then(RealTimeInstallation => {
    //   res.send(`Registrado tiempo real, ${RealTimeInstallation}`);
    // }).catch((error) => {
    //   res.send(`db error ${error}`);
    // });

  } catch (error) {
    console.log(error);
    res.send(error);
  }
}


module.exports = InstallationController;