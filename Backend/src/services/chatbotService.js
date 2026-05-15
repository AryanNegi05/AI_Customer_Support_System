// =====================================================
// QUESTION FLOWS
// =====================================================

export const flows = {

  network_issue: [

    "What router model are you using?",

    "Did you restart the router?",

    "Are all devices affected?"

  ],



  billing_issue: [

    "What billing issue are you facing?",

    "Did payment get deducted?",

    "When did this issue start?"

  ],



  login_issue: [

    "Are you seeing any error message?",

    "Did you try resetting password?",

    "Are you able to access email OTP?"

  ]

};



// =====================================================
// CATEGORY DETECTION
// =====================================================

export const detectCategory = async (
  message
) => {

  const msg = message.toLowerCase();



  // network
  if (

    msg.includes("wifi") ||

    msg.includes("internet") ||

    msg.includes("router") ||

    msg.includes("network")

  ) {

    return "network_issue";

  }



  // billing
  if (

    msg.includes("payment") ||

    msg.includes("bill") ||

    msg.includes("refund") ||

    msg.includes("charged")

  ) {

    return "billing_issue";

  }



  // login
  if (

    msg.includes("login") ||

    msg.includes("password") ||

    msg.includes("otp") ||

    msg.includes("signin")

  ) {

    return "login_issue";

  }



  return "general_issue";

};



// =====================================================
// GET NEXT QUESTION
// =====================================================

export const getNextQuestion = async (

  category,

  index

) => {

  const questions = flows[category];

  if (!questions) return null;

  return questions[index] || null;

};