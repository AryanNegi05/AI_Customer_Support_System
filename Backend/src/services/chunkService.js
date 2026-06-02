import {
  RecursiveCharacterTextSplitter
}
from "langchain/text_splitter"

export const splitText =
async (text) => {

  const splitter =
    new RecursiveCharacterTextSplitter({

      chunkSize: 800,

      chunkOverlap: 100

    })

  return splitter.splitText(text)
}