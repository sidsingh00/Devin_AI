import Redis from 'ioredis'

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    paassword: process.env.REDIS_PASSWORD

})

redisClient.on('connect',()=>{
    console.log('Redis connected');
})

export default redisClient;