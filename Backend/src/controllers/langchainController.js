// import {askSupportBot}
// from "../langchain/chatbot.js"
// export const chat = async (req, res) => {

//   try {
//     console.log("REQUEST RECEIVED")
//     const { message } = req.body
//     console.log("MESSAGE =", message)

//     const reply = await askSupportBot(message)

//     console.log("REPLY RECEIVED")

//     res.json({
//       success: true,
//       reply
//     })

//   } catch (error) {

//     console.log("CONTROLLER ERROR")
//     console.log(error)

//     res.status(500).json({
//       success: false
//     })
//   }
// }