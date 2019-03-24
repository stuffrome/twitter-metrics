//This file holds any configuration variables we may need 
//"config.js" is typically ignored by git to protect sensitive information, such as your database"s username and password

module.exports = {
  db: {
    uri: "mongodb://twittermetrics:team3rocks@ds025469.mlab.com:25469/users",
  }, 
  port: 8080,
  secret: "thebestteamever"
};