//This file holds any configuration variables we may need 
//"config.js" is typically ignored by git to protect sensitive information, such as your database"s username and password

module.exports = {
  db: {
    uri: "mongodb://app:appacce55@dbh54.mlab.com:27547/users",
  }, 
  port: 8080,
  secret: "thebestteamever"
};