module.exports = {
  apps: [
    {
      name: 'BACKEND',
      script: 'bin/www',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'prod'
      },
      instances: 4,
      mode: 'cluster_mode'
    }
  ]
}
