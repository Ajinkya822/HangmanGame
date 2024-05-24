import React, {useEffect, useState} from 'react'
import {ReactTyped} from "react-typed"

function App() {
  
  
 
  return (
    <div>
      <h1>
        <ReactTyped strings={["Welcome to Hangman"]} typeSpeed={100} loop/>
      </h1>
    
    </div>
  )
}
export default App