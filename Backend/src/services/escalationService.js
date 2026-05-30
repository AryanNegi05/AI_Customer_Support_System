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
  "system down",
  "escalate this issue",
  "immediately",
  "assign to agent",
  "need human support",
  "talk to agent",
]

export const isCriticalIssue = (message) => {
  const text = message.toLowerCase()
  return criticalKeywords.some(keyword => text.includes(keyword))
}

export const increaseFailedAttempts = async (conversation) => {
  conversation.failedAttempts += 1
  await conversation.save()
  return conversation.failedAttempts
}

export const shouldEscalate = (conversation, latestMessage) => {
  const critical = isCriticalIssue(latestMessage)

  if (critical) {
    if (conversation.failedAttempts >= 1) {
      return { escalate: true, reason: "critical_issue" }
    }
    return { escalate: false, reason: null }
  }

  if (conversation.failedAttempts >= 3) {
    return { escalate: true, reason: "failed_attempts" }
  }

  return { escalate: false, reason: null }
}