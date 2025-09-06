let apiKey="AIzaSyDO65uuGr8Rhns0yrT0PiiJBAkp2r3bcsI"
import{
      GoogleGenerativeAI,
      HarmCategory,
      HarmBlockThreshold,
  } from "@google/generative-ai";
 
  const genAI= new GoogleGenerativeAI(apiKey);
  const model= genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });
    
const generatingConfig = {
          temperature:1,
          topP:0.95,
          topK:40,
          maxOutputTokens: 20,
          responseMimeType:"text/plain",
      };


async function run(prompt) {
    const chatSession = model.startChat({ generatingConfig, history: [] });
    const result = await chatSession.sendMessage(prompt);

    
    let text = await result.response.text();
    text = text.replace(/\*/g, ""); 
    return text;
}

export default run;




