import React, { createContext ,useState} from 'react'
import run from '../gemini';

export const dataContext = createContext()

function UserContext({children}) {

    let [speaking,setSpeaking]=useState(false)
     let [prompt , setPrompt] = useState("listening...")
let [response, setResponse] = useState(false);

function speak(text){
   window.speechSynthesis.cancel();  
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-GB";
    window.speechSynthesis.speak(utterance);
}
     async function aiResponse(prompt){
        let text = await run(prompt)
       text = text.split(".")[0];
       setPrompt(text)
        speak(text)
        setResponse(true)
       setTimeout(()=>{
          setSpeaking(false)
       },5000)
     }

  
   let SpeechRecognition=window.speechRecognition || window.webkitSpeechRecognition
    let recognition = new SpeechRecognition()
    recognition.onresult=(e)=>{
            let currentIndex=e.resultIndex
            let transcript=e.results[currentIndex][0].transcript
            setPrompt(transcript)
           takeCommand(transcript.toLowerCase())
    }
    recognition.onend = () => {
  
  if (speaking) setSpeaking(false);
};
     function takeCommand(command){
    if(command.includes("open") && command.includes("youtube")){
        window.open('https://www.youtube.com/',"_blank")
        speak("opening Youtube...")
        setPrompt("opening Youtube...")
          setTimeout(()=>{
          setSpeaking(false)
  },5000)
    }else if(command.includes("open") && command.includes("google")){
        window.open('https://www.google.com/',"_blank")
        speak("opening Google...")
        setPrompt("opening Google...")
          setTimeout(()=>{
          setSpeaking(false)
  },5000)
    }
    else if(command.includes("spotify") && command.includes("music")){
        window.open("https://open.spotify.com/", "_blank")
        speak("Opening Spotify...")
        setPrompt("Opening Spotify...")
          setTimeout(()=>{
          setSpeaking(false)
  },5000)
    }
        else if(command.includes("instagram") && command.includes("instagram")){
        window.open("https://www.instagram.com/", "_blank")
        speak("Opening Instagram...")
        setPrompt("Opening Instagram...")
          setTimeout(()=>{
          setSpeaking(false)
  },5000)
    }
    
    else{
      aiResponse(command)
    }
    }
  const value={
recognition,
speaking,
setSpeaking,
prompt,
setPrompt,
response, setResponse
  }
  return (
    <div>
        <dataContext.Provider value={value}>
    {children}
    </dataContext.Provider>
    </div>
  )
}

export default UserContext

