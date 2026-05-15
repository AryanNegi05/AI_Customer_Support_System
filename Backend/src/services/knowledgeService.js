import Knowledge from "../models/Knowledge.js";



// =====================================================
// SEARCH KNOWLEDGE BASE
// =====================================================

export const searchKnowledgeBase = async ({

  category,

  conversation

}) => {

  try {

    // ===============================================
    // FETCH KNOWLEDGE DOC
    // ===============================================

    const knowledge =
      await Knowledge.findOne({

        category,

        isActive: true

      });



    if (!knowledge) {

      return null;

    }



    // ===============================================
    // LATER:
    // LangChain / Vector Search Here
    // ===============================================

    /*
    
      Future Flow:
      
      conversation
         ↓
      embeddings
         ↓
      vector search
         ↓
      semantic retrieval
    
    */



    return knowledge.solution;

  }

  catch (error) {

    console.log(error);

    return null;

  }

};