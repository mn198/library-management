module.exports = {
    "db_url": "mongodb://mn198:mmn198@ds135796.mlab.com:35796/mn-library",
    "port": 3600,
    "appEndpoint": "http://localhost:3600",
    "apiEndpoint": "http://localhost:3600",
    "jwt_secret": "myS33!!creeeT",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    }
  }
  