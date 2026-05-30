// =====================================================
// CRITICAL ISSUE KEYWORDS
// =====================================================

const criticalKeywords = [
  "server down",
  "service outage",
  "payment deducted",
  "money deducted",
  "account hacked",
  "security breach",
  "cannot access account",
  "urgent",
  "critical",
  "system down"
]

// =====================================================
// CHECK IF ISSUE IS CRITICAL
// =====================================================

export const isCriticalIssue = (message) => {

  const text = message.toLowerCase()

  return criticalKeywords.some(
    keyword => text.includes(keyword)
  )

}



// =====================================================
// INCREASE FAILED ATTEMPTS
// =====================================================

export const increaseFailedAttempts =
async (conversation) => {

  conversation.failedAttempts += 1

  await conversation.save()

  return conversation.failedAttempts

}



// =====================================================
// SHOULD ESCALATE
// =====================================================

export const shouldEscalate = (

  conversation,

  latestMessage

) => {

  const critical =
    isCriticalIssue(latestMessage)

  if (critical) {

    if (
      conversation.failedAttempts >= 1
    ) {

      return {

        escalate: true,

        reason:
          "critical_issue"

      }

    }

    return {

      escalate: false,

      reason: null

    }

  }

  if (
    conversation.failedAttempts >= 3
  ) {

    return {

      escalate: true,

      reason:
        "failed_attempts"

    }

  }

  return {

    escalate: false,

    reason: null

  }

}