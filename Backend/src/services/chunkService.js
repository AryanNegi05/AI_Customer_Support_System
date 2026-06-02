import {
  RecursiveCharacterTextSplitter
}
from "@langchain/textsplitters"

export const splitText =
async (text) => {

  const splitter =
    new RecursiveCharacterTextSplitter({

      chunkSize: 800,

      chunkOverlap: 100

    })

  return splitter.splitText(text)
}