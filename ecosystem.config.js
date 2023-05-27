module.exports = {
  env: {

  },
  apps: [
    {
      name: 'api.adns.localhost',
      script: 'npm run serve:api',
      namespace: 'adns-local',
      env: {
        QUEUE_PREFIX: 'workers',
        API_PORT: 3001,
        WALLET_PORT: 3000,
        IDP_PORT: 3002,
        MONGO_CONNECTION_URI: 'mongodb://localhost:27017/adns'
      }
    },
    {
      name: 'wallet.adns.localhost',
      script: 'npm run serve:wallet',
      namespace: 'adns-local',
      env: {
        QUEUE_PREFIX: 'workers',
        API_PORT: 3001,
        WALLET_PORT: 3000,
        IDP_PORT: 3002,
        MONGO_CONNECTION_URI: 'mongodb://localhost:27017/adns'
      }
    },
    {
      name: 'idp.adns.localhost',
      script: 'npm run serve:idp',
      namespace: 'adns-local',
      env: {
        QUEUE_PREFIX: 'workers',
        API_PORT: 3001,
        WALLET_PORT: 3000,
        IDP_PORT: 3002,
        MONGO_CONNECTION_URI: 'mongodb://localhost:27017/adns'
      }
    },
    {
      name: '@workers.adns.localhost',
      script: 'npm run worker start',
      namespace: 'adns-local',
      env: {
        QUEUE_PREFIX: 'workers',
        API_PORT: 3001,
        WALLET_PORT: 3000,
        IDP_PORT: 3002,
        MONGO_CONNECTION_URI: 'mongodb://localhost:27017/adns'
      }
    }
  ]
}
