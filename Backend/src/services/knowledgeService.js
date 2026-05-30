import Knowledge from "../models/Knowledge.js"

export const searchKnowledgeBase =
async ({ issue }) => {

  try {

    const words =
      issue
        .toLowerCase()
        .split(" ")

    const knowledge =
      await Knowledge.findOne({

        keywords: {
          $in: words
        },

        isActive: true

      })

    if (!knowledge) {

      return null

    }

    return `
Title:
${knowledge.title}

Problem:
${knowledge.problem}

Solution:
${knowledge.solution}
`

  }

  catch (error) {

    console.log(error)

    return null

  }

}