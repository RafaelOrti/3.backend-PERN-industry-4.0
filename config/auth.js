require('dotenv').config()
module.exports = {
  secret: process.env.AUTH_SECRET || 'zA23RtfLoPP', //    KEY USED TO ENCRYPT
  expires: process.env.AUTH_EXPIRES || '24h', //     TOKEN DURATION
  rounds: process.env.AUTH_ROUNDS || 10 //    TIMES THE PASSWORD IS ENCRYPTED
}
