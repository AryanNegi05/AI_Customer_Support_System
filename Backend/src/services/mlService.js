import axios from "axios";
export const predictTicket = async (text) => {

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      {
        text
      }

    );
    return response.data;

  }
  catch (error) {
    console.log(
      "ML API Error:",
      error.message
    );
    return {
      intent: "general_issue",
      priority: "medium"
    };

  }

};