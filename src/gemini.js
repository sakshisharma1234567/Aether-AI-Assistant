// let apiKey="AIzaSyDO65uuGr8Rhns0yrT0PiiJBAkp2r3bcsI"
// import{
//       GoogleGenerativeAI,
//       HarmCategory,
//       HarmBlockThreshold,
//   } from "@google/generative-ai";
 
//   const genAI= new GoogleGenerativeAI(apiKey);
//   const model= genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//     });
    
// const generatingConfig = {
//           temperature:1,
//           topP:0.95,
//           topK:40,
//           maxOutputTokens: 20 ,
//           responseMimeType:"text/plan",
//       };
      
// async function run(prompt){
//         const chatSession = model.startChat({
//                 generatingConfig,
//             history:[
//              ],
//               })
//               const result = await chatSession.sendMessage(prompt);
//                return result.response.text()
          
//           }
//           export  default run;
          




let apiKey = "AIzaSyDO65uuGr8Rhns0yrT0PiiJBAkp2r3bcsI";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generatingConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 50, // thoda bada rakh lo
  responseMimeType: "text/plain", // "plan" nahi, "plain"
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generatingConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(prompt);

    // raw text lo
    let text = result.response.text() || "";

    // ** ya * clean karo
    text = text.replace(/\*/g, "").trim();

    // agar empty reh gaya to fallback
    if (!text) text = "Sorry, I can't get a proper response right now.";

    return text;
  } catch (err) {
    console.error("Gemini API error:", err);
    return "AI service is unavailable at the moment.";
  }
}

export default run;
