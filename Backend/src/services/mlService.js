import axios from "axios";



// ======================================================
// CATEGORY MAPPING
// ======================================================

const categoryMap = {

  "Technical issue":
    "network_issue",



  "Billing inquiry":
    "billing_issue",



  "Product inquiry":
    "technical_bug"

};



// ======================================================
// CALL FASTAPI ML SERVICE
// ======================================================

export const predictTicket = async (

  text

) => {

  try {

    const response = await axios.post(

      "http://127.0.0.1:8000/predict",

      {

        text

      }

    );



    // ===============================================
    // MAP ML LABELS
    // ===============================================

    const mappedCategory =

      categoryMap[
        response.data.intent
      ] || "technical_bug";



    return {

      intent: mappedCategory,

      priority:
        response.data.priority

    };

  }

  catch (error) {

    console.log(

      "ML API Error:",

      error.message

    );



    return {

      intent: "technical_bug",

      priority: "medium"

    };

  }

};