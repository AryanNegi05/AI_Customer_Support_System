import redisConnection
from "../redis/redisClient.js";



// =====================================================
// GET AGENT WORKLOAD
// =====================================================

export const getAgentTicketCount =
async (agentId) => {

  const count =
    await redisConnection.get(

      `agent:${agentId}:tickets`

    );



  return Number(count) || 0;

};



// =====================================================
// INCREASE AGENT WORKLOAD
// =====================================================

export const increaseAgentTickets =
async (agentId) => {

  await redisConnection.incr(

    `agent:${agentId}:tickets`

  );

};



// =====================================================
// DECREASE AGENT WORKLOAD
// =====================================================

export const decreaseAgentTickets =
async (agentId) => {

  const current =
    await getAgentTicketCount(
      agentId
    );



  if (current > 0) {

    await redisConnection.decr(

      `agent:${agentId}:tickets`

    );

  }

};