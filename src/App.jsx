import React, { useContext } from 'react'
import './App.css'
import va from './assets/ai.png'
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from './context/UserContext';
import speak from "./assets/speak.gif"
import  ai from "./assets/aiVoice.gif";


function  App ( ){
  const  {recognition,speaking,setSpeaking,prompt,response,setResponse,setPrompt}=useContext(dataContext)
 

  return (
    <div className='main'>
<img src={va} alt="" id='Aether' />
      <span>I'm  Aether , Your Advanced Virtual Assistant</span>
      {!speaking? <button onClick={()=>{
        setPrompt("listening...")
        setSpeaking(true)
   recognition.start()
   setResponse(false)
      }}>Click here<CiMicrophoneOn /> </button>
      :
      <div className='response'>
        {!response?
        <img src={speak} alt=""  id='speaking' />
        :
         <img src={ai} alt=""  id='ai' />}
        
        <p>{prompt}</p>
      </div>
      }
     
    </div>
  )
}

export default App




