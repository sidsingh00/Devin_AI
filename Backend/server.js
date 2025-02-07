import http from 'http';
import app from './app.js'
import  dotenv from "dotenv"


dotenv.config();
const server = http.createServer(app);

const PORT = process.env.PORT|| 3000;

server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})