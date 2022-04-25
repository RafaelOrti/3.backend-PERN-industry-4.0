const authConfig = require("../config/auth");
const { User } = require("../models/index");
const axios = require('axios');

//oauth2.0
const oauth = require('axios-oauth-client');

const InstallationController = {};

//timers
const delay = 10 * 60 * 60 * 1000; // 10 hour in msec, frecuency call timing
const firstCall = 1000; //first call timing

let tokenInstallation ;

let call = async() => {
  tokenInstallation = await axios.post(`http://localhost:3000/installation/userInstallation`);
}


//  setTimeout(
//   call
// , firstCall);

setInterval(
  call,
 delay);

'http://localhost:3000/installation/userInstallation'



//userInstallation
//http://localhost:3000/installation/userInstallation
InstallationController.userInstallation = async (req, res) => {




  const getOwnerCredentials = oauth.client(axios.create(), {
    url: 'https://la-api-de-test.ddns.net:18452/users/login',
    username: 'rafa',
    password: '12345678',
  });

  const auth = await getOwnerCredentials();
  console.log(auth.access_token);
  res.send(auth)

}


//userInstallation
//http://localhost:3000/installation/userInstallation
InstallationController.readInstallation = async (req, res) => {

  
  if(tokenInstallation===undefined){
    await call().catch(console.log('error'))
    //nodemailer
  }

  console.log(tokenInstallation);


  let comoPideLosDatos=`
  curl -X 'POST' \
  'https://la-api-de-test.ddns.net:18452/get_raw_data/' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb3NlbSIsImV4cCI6MTY1MDk2ODI4OH0.Nva--HRtUtROOwm78D-ajnIDnlT4TVF43Bgk4C6OOAg' \
  -H 'Content-Type: application/json' \
  -d '{
  "host": "192.168.1.9",
  "port": 502,
  "protocol": "modbusTCP",
  "memory_area": "input_registers",
  "address_from": 0,
  "quantity": 5
}'
`
let body = {
  "host": "192.168.1.9",
  "port": 502,
  "protocol": "modbusTCP",
  "memory_area": "input_registers",
  "address_from": 0,
  "quantity": 18
}

let header =  { 
  "Authorization": `Bearer ${tokenInstallation.data.access_token}`,
  'accept':' application/json',
  'Content-Type': 'application/json' 
}     
  try {

      let resultados = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body , { headers: header});
      console.log(resultados);
      res.send(resultados.data);
      
  } catch (error) {
      console.log(error);
  }
}


//userInstallation
//http://localhost:3000/installation/userInstallation
InstallationController.writeCoil = async (req, res) => {

  if(tokenInstallation===undefined){
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

  let comoPideLosDatos=`
  curl -X 'POST' \
  'https://la-api-de-test.ddns.net:18452/get_raw_data/' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb3NlbSIsImV4cCI6MTY1MDk2ODI4OH0.Nva--HRtUtROOwm78D-ajnIDnlT4TVF43Bgk4C6OOAg' \
  -H 'Content-Type: application/json' \
  -d '{
  "host": "192.168.1.9",
  "port": 502,
  "protocol": "modbusTCP",
  "memory_area": "input_registers",
  "address_from": 0,
  "quantity": 5
}'
`

let body = req.body
res.send(body)

// {
//   "host": "192.168.1.9",
//   "port": 502,
//   "protocol": "modbusTCP",
//   "memory_area": "coils",
//   "address_from": 0,
//   "quantity": 1
// }

let header =  { 
  "Authorization": `Bearer ${auth.access_token}`,
  'accept':' application/json',
  'Content-Type': 'application/json' 
}
      
  try {

      let resultados = await axios.post(`https://la-api-de-test.ddns.net:18452/write_raw_data`, body , { headers: header});
      console.log(resultados);
      res.send(resultados.data);
      
  } catch (error) {
      console.log(error);
      res.send(error);
  }
}



//userInstallation
//http://localhost:3000/installation/userInstallation
InstallationController.readCoil = async (req, res) => {

  if(tokenInstallation===undefined){
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

  let comoPideLosDatos=`
  curl -X 'POST' \
  'https://la-api-de-test.ddns.net:18452/get_raw_data/' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb3NlbSIsImV4cCI6MTY1MDk2ODI4OH0.Nva--HRtUtROOwm78D-ajnIDnlT4TVF43Bgk4C6OOAg' \
  -H 'Content-Type: application/json' \
  -d '{
  "host": "192.168.1.9",
  "port": 502,
  "protocol": "modbusTCP",
  "memory_area": "input_registers",
  "address_from": 0,
  "quantity": 5
}'
`
let body = req.body


let header =  { 
  "Authorization": `Bearer ${auth.access_token}`,
  'accept':' application/json',
  'Content-Type': 'application/json' 
}

         
  try {

      let resultados = await axios.post(`https://la-api-de-test.ddns.net:18452/get_raw_data`, body , { headers: header});
      console.log(resultados);
      res.send(resultados.data);
      
 
  } catch (error) {
      console.log(error);
  }
}


module.exports = InstallationController;