// =====================================================
// GENERATE TICKET SUMMARY
// =====================================================

export const generateSummary = async (
  conversation
) => {

  try {

    const category =
      conversation.category;

    const extractedInfo =
      conversation.extractedInfo;



    // =================================================
    // NETWORK ISSUE
    // =================================================

    if (category === "network_issue") {

      return `
Customer facing network connectivity issues.

Router Details:
${extractedInfo.get("answer_0") || "Not provided"}

Router Restart Attempt:
${extractedInfo.get("answer_1") || "Unknown"}

Affected Devices:
${extractedInfo.get("answer_2") || "Unknown"}
      `.trim();

    }



    // =================================================
    // BILLING ISSUE
    // =================================================

    if (category === "billing_issue") {

      return `
Customer facing billing/payment issue.

Issue Details:
${extractedInfo.get("answer_0") || "Not provided"}

Payment Deducted:
${extractedInfo.get("answer_1") || "Unknown"}

Issue Start Time:
${extractedInfo.get("answer_2") || "Unknown"}
      `.trim();

    }



    // =================================================
    // LOGIN ISSUE
    // =================================================

    if (category === "login_issue") {

      return `
Customer facing login/authentication issue.

Error Message:
${extractedInfo.get("answer_0") || "Not provided"}

Password Reset Attempt:
${extractedInfo.get("answer_1") || "Unknown"}

OTP Access:
${extractedInfo.get("answer_2") || "Unknown"}
      `.trim();

    }



    // =================================================
    // GENERAL FALLBACK
    // =================================================

    const customerMessages =
      conversation.messages

        .filter(
          msg =>
            msg.sender === "customer"
        )

        .map(msg => msg.message)

        .join(" ");




    return `
Customer support issue reported.

Conversation Summary:
${customerMessages}
    `.trim();

  }

  catch (error) {

    console.log(error);

    return "Customer support issue reported.";

  }

};