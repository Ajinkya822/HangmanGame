import React, {useEffect, useState} from 'react'

function App() {
  const [apiData, setApiData]=useState([{}])

  useEffect(()=>{
    fetch("https://hangman-game-server-beige.vercel.app/api").then(
      response=>response.json()
    ).then(
      data=> {
        setApiData(data)
      }
    )
  },[])
  return (
    <div>
      {(typeof apiData.users === 'undefined') ? (
        <p> Loading data ....</p>
      ) :(
        apiData.users.map((user, i) => (
        <p key={i}>{user}</p>
      ))
      )

      }
    
    </div>
  )
}

export default App