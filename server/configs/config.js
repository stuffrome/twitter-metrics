//This file holds any configuration variables we may need
//"config.js" is typically ignored by git to protect sensitive information, such as your database"s username and password

module.exports = {
  db: {
    uri: 'mongodb://admin:team3rocks@ds121603.mlab.com:21603/twitter-metrics',
  },
  port: 8080,
  secret: 'thebestteamever',
  twitter: {
    consumer_key: 'M16DHGc5yBtnmmCNeHxMPbqE8',
    consumer_secret: 'dGfQ3bIKgZ1W7v82Wyeaw9mZ4W9d6vjmPrDcX6kBO7A9A3LrPG',
    access_token: '1101550079029198849-W33IzSSg0RhDPRjXRyptkoZICfBtWf',
    access_token_secret: 'Q5AizweUTVUxS652krsGjv74o3hGLIg8YZHHNXvEV95hT'
  }
};