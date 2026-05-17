import { Worker } from "bullmq";

import redisConnection
from "../redis/redisClient.js";



const ticketWorker = new Worker(

  "ticketQueue",

  async (job) => {

    console.log(
      "Processing Job..."
    );



    console.log(
      job.data
    );



    // ==================================
    // FUTURE:
    // ML prediction
    // Redis routing
    // Agent assignment
    // ==================================

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