module.exports = {
    "db_url": "mongodb://mn198:mmn198@ds135796.mlab.com:35796/mn-library",
    "port": 8080,
    "appEndpoint": "http://localhost:8080",
    "apiEndpoint": "http://localhost:8080",
    "jwt_secret": "myS33!!creeeT",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    },
    "ADD_READER": 1,
    "EDIT_READER": 2,
    "DELETE_READER": 4,
    "ADD_BOOK": 8,
    "EDIT_BOOK": 16,
    "DELETE_BOOK": 32,
    "ADD_LENDING": 64,
    "EDIT_LENDING": 128,
    "DELETE_LENDING": 256
  }
  