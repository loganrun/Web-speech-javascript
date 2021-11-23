import React, { useState, useEffect} from 'react'
import './App.css';

let speech;
let mic;
if (window.webkitSpeechRecognition) {
  // eslint-disable-next-line
  const SpeechRecognition = webkitSpeechRecognition;
  speech = new SpeechRecognition();
  speech.continuous = true;
  mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-us'
} else {
  speech = null;
}

//const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// const mic = new SpeechRecognition()

// mic.continuous = true
// mic.interimResults = true
// mic.lang = 'en-us'


function App() {
const [isListening, setIsListening] = useState(false)
const [note, setNote] = useState(null)
const [savedNotes, setSavedNotes] = useState([])

useEffect(() =>{
  handleListen()

}, [isListening])

const handleListen = ()=>{
  if(isListening){
    mic.start()
    mic.onend = ()=> {
      console.log('continue ...')
      mic.start()
    }
  } else {
    mic.stop()
    mic.onend = ()=>{
      console.log('Stopped Mic')
    }
  }

  mic.onstart = () => {
    console.log('Mics on')
  }

  mic.onresult = event => {
    const transcript = Array.from(event.results)
    .map(results => results[0])
    .map(results => results.transcript)
    .join('')
    console.log(transcript)
    setNote(transcript)
    mic.onerror = event => {
      console.log(event.error)
    }
  }
}

const handleSaveNote=()=>{
  setSavedNotes([...savedNotes, note])
  setNote('')

}

  return (
    <div className="container">
    <div className="box">
      <h2>Current Note</h2>
      {isListening ? <span>mic on</span> : <span>mic off</span>}
      <button onClick={handleSaveNote} disabled={!note}>Save a Note</button>
      <button onClick={()=> setIsListening(prevState => !prevState)}>Start/Stop</button>

      <p>{note}</p>

    </div>

    <div className="box">
      <h2>Notes</h2>

      {savedNotes.map(n => (
        <p key={n}>{n}</p>
      ))}
    </div>
      
    </div>
  );
}

export default App;
