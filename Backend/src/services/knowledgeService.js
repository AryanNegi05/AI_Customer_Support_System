import Knowledge from "../models/Knowledge.js"

export const searchKnowledgeBase = async ({ issue }) => {
  try {
    const words = (issue.toLowerCase().match(/[a-z0-9]+/g) || []).filter(Boolean)

    const knowledge = await Knowledge.findOne({
      isActive: true,
      $or: [
        { keywords: { $in: words } },
        { title: { $regex: issue, $options: "i" } },
        { problem: { $regex: issue, $options: "i" } }
      ]
    })

    if (!knowledge) return null

    return `
Title:
${knowledge.title}

Problem:
${knowledge.problem}

Solution:
${knowledge.solution}
`.trim()
  } catch (error) {
    console.log(error)
    return null
  }
}