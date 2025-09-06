import React, { createContext ,useState} from 'react'
import run from '../gemini';

export const dataContext = createContext()

function UserContext({children}) {

    let [speaking,setSpeaking]=useState(false)
     let [prompt , setPrompt] = useState("listening...")
let [response, setResponse] = useState(false);
   function speak(text){
        let text_speak = new SpeechSynthesisUtterance(text)
         text_speak.volume=1;
         text_speak.rate=1;
         text_speak.pitch=1;
         text_speak.lang="en-GB";
 window.speechSynthesis.speak(text_speak)
   }
     async function aiResponse(prompt){
        let text = await run(prompt)
       

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
  // mic band hone par UI reset
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
