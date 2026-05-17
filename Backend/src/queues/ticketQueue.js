import { Queue } from "bullmq";

import redisConnection
from "../redis/redisClient.js";



const ticketQueue = new Queue(

  "ticketQueue",

  {

    connection:
      redisConnection

  }

);



export default ticketQueue;