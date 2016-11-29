const redis = require('redis');

function redisService () {
  const cache = redis.createClient(process.env.REDIS_CONN);


}

module.exports = function cache () {
  return {
    get() {

    },
    set() {

    },
    del() {

    },
  };
}

