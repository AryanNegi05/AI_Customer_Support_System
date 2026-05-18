import { Worker } from "bullmq";

import redisConnection
from "../redis/redisClient.js";

import {

  routeTicket

} from "../services/routingService.js";



const ticketWorker = new Worker(

  "ticketQueue",

  async (job) => {

    console.log(
      "Processing Ticket..."
    );



    console.log(job.data);



    // ==========================================
    // ROUTE TICKET
    // ==========================================

    await routeTicket(

      job.data.ticketId

    );

  },

  {

    connection:
      redisConnection

  }

);



ticketWorker.on(

  "completed",

  (job) => {

    console.log(

      `Job ${job.id} completed`

    );

  }

);



ticketWorker.on(

  "failed",

  (job, err) => {

    console.log(

      `Job ${job.id} failed`

    );



    console.log(err);

  }

);