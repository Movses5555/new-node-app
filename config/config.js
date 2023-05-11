
module.exports = {
  "mssql": {
    "host": process.env.MS_HOST,
    "server": process.env.MS_SERVER,
    "username": process.env.MS_USERNAME,
    "password": process.env.MS_PASSWORD,
    "database": process.env.MS_DB_NAME,
    "dialect": process.env.MS_DIALECT,
    "port": process.env.MS_PORT,
    "logging": false,
    "dialectOptions": {
      "options": {
        "cryptoCredentialsDetails": {
          "minVersion": "TLSv1.2"
        },
        "enableArithAbort": true,
        "connectTimeout": 10000,
        "requestTimeout": 15000
      }
    }
  }
};
