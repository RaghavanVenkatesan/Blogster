const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

// const redisUrl = 'redis://127.0.0.1:6379';
// const client = redis.createClient(redisUrl);

// https://redis.io/docs/getting-started/installation/install-redis-on-windows/#connect-to-redis

// const client = redis.createClient({
//     socket: {
//         host: '127.0.0.1',
//         port: 6379
//     }
// });
const client = redis.createClient(keys.redisUrl);

client.on('error', err => {
    console.log('Error ' + err);
});

client.HMGET = util.promisify(client.HMGET);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}){
    this.useCache = true;

    // High level hash options object // THIS IS APPLIED FOR THIS PROJECT
    this.hashKey = JSON.stringify(options.key || '');

    return this;
}

mongoose.Query.prototype.exec = async function() {
   if(!this.useCache){
    return exec.apply(this, arguments);
   }

   const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    })
   );

   const cacheValue = await client.HMGET(this.hashKey, key);

//    console.log("cached value: ", cacheValue);

   if(!cacheValue) {
    console.log("coming")
      const doc = JSON.parse(cacheValue);

      return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
       : new this.model(doc);
   }

   const result = await exec.apply(this, arguments);

   client.HMSET(this.hashKey, key, JSON.stringify(result), 'EX', 10);

   return result;
}

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey))
    }
}