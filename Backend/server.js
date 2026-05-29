import "./src/config/env.js"

import app from "./src/app.js"
import connectDB from "./src/config/db.js"
import "./src/redis/redisClient.js"
import "./src/workers/ticketWorker.js"



// =====================================================
// CONNECT DATABASE
// =====================================================

connectDB();



// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});