const authConfig = require("../config/auth");
const {
  RealTimeInstallation
} = require("../models/index");
const axios = require('axios');

//oauth2.0
const oauth = require('axios-oauth-client');

const InstallationHomeController = {};


//----------------------------------------------
//10 HOURS LOGIN
//'http://localhost:5000/installation/userInstallation'
//----------------------------------------------

//timers
const frecuencyLogin = 10 * 60 * 60 * 1000; // 10 hour in msec, frecuency call timing
const firstCall = 10000; //first call timing
let tokenInstallation;
let call = async () => {
  tokenInstallation = await axios.post(`http://localhost:5000/installation/homeUserInstallation`);
}
// setTimeout(
//   call, firstCall);
// setInterval(
//   call,
//   frecuencyLogin);
//userInstallation
//http://localhost:5000/installation/userInstallation

InstallationHomeController.userInstallation = async (req, res) => {

  const getOwnerCredentials = oauth.client(axios.create(), {
    url: 'https://la-api-de-test.ddns.net:18452/users/login',
    username: 'rafa',
    password: '12345678',
  });

  const auth = await getOwnerCredentials();
  //console.log(auth.access_token);
  res.send(auth)

}


//----------------------------------------------
//10 WRITE COIL
//http://localhost:5000/installation/userInstallation
//----------------------------------------------
InstallationHomeController.homeOn = async (req, res) => {

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
  //console.log(auth.access_token);

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
    //console.log(readData);
    res.send(readData.data);

  } catch (error) {
    //console.log(error);
    res.send(error);
  }
}



//----------------------------------------------
//10 WRITE COIL
//http://localhost:5000/installation/userInstallation
//----------------------------------------------
InstallationHomeController.homePreservation = async (req, res) => {

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
  //console.log(auth.access_token);

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
    //console.log(readData);
    res.send(readData.data);

  } catch (error) {
    //console.log(error);
    res.send(error);
  }
}



//----------------------------------------------
//10 READ COIL
//http://localhost:5000/installation/userInstallation
//----------------------------------------------
let readedValues = {};
InstallationHomeController.homeValueReading = async (req, res) => {

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
  //console.log(auth.access_token);


  try {

    //COILS
    let body = {
      "host": "192.168.1.9",
      "port": 502,
      "protocol": "modbusTCP",
      "memory_area": "coils",
      "address_from": 0,
      "quantity": 2
    }
    let header = {
      "Authorization": `Bearer ${auth.access_token}`,
      'accept': ' application/json',
      'Content-Type': 'application/json'
    }

    let readData = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body, {
      headers: header
    });
    //console.log(readData);
    let chunk1 = []
    //console.log(readData.data.data);
    for (let i = 0; i < 2; i++) {
      chunk1[i] = readData.data.data[i];

      // do whatever
    }
    console.log(chunk1);
    readedValues.coils = chunk1


    //discrete_inputs

    body = {
      "host": "192.168.1.9",
      "port": 502,
      "protocol": "modbusTCP",
      "memory_area": "discrete_inputs",
      "address_from": 0,
      "quantity": 9
    }


    readData = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body, {
      headers: header
    });

    let chunk2 = []
    //console.log(readData.data.data);
    for (let i = 0; i < 9; i++) {
      chunk2[i] = readData.data.data[i];
      //console.log(readData.data.data[i]);
      // do whatever
    }
    //console.log(chunk)
    console.log(chunk2);
    readedValues.discrete = chunk2


    // input registers
    body = {
    "host": "192.168.1.9",
    "port": 502,
    "protocol": "modbusTCP",
    "memory_area": "input_registers",
    "address_from": 0,
    "quantity": 18
  }


    readData = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body, {
      headers: header
    });
    //console.log(readData);
    let chunk3 = []
    //console.log(readData.data.data);
    for (let i = 0; i < 7; i++) {
      chunk3[i] = readData.data.data[i];

      // do whatever
    }
    console.log(chunk3);
    readedValues.registers = chunk3
    res.send(readedValues);



  } catch (error) {
    //console.log(error);
    res.send(error);
  }
}



//----------------------------------------------
//10 READ COIL
//http://localhost:5000/installation/userInstallation
//----------------------------------------------
let readedAlarmsValues = {};
InstallationHomeController.homeAlarmsReading = async (req, res) => {

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
  //console.log(auth.access_token);


  try {


    let header = {
      "Authorization": `Bearer ${auth.access_token}`,
      'accept': ' application/json',
      'Content-Type': 'application/json'
    }

    body = {
      "host": "192.168.1.9",
      "port": 502,
      "protocol": "modbusTCP",
      "memory_area": "discrete_inputs",
      "address_from": 0,
      "quantity": 9
    }


    readData = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body, {
      headers: header
    });

    let chunk2 = []
    //console.log(readData.data.data);
    for (let i = 0; i < 9; i++) {
      chunk2[i] = readData.data.data[i];
      //console.log(readData.data.data[i]);
      // do whatever
    }
    //console.log(chunk)
    console.log(chunk2);
    readedAlarmsValues.discrete = chunk2


    res.send(readedAlarmsValues);



  } catch (error) {
    //console.log(error);
    res.send(error);
  }
}

module.exports = InstallationHomeController;