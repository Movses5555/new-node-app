## Getting Started 

Create a file named `default.json` in `/config` folder.
Set all data in `default.json` file

`{
  "appPort": 8000,
  "corsOrigin": "http://localhost:3000",
  "mssqlDB": {
    "host": "",
    "server": "",
    "username": "",
    "password": "",
    "database": "",
    "dialect": "",
    "port": 1433,
    "logging": false,
    "dialectOptions": {
      "transactionTimeout": 5000,
      "options": {
        "cryptoCredentialsDetails": {
          "minVersion": "TLSv1.2"
        },
        "enableArithAbort": true,
        "connectTimeout": 10000,
        "requestTimeout": 10000
      }
    }
  }
}`


## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`


