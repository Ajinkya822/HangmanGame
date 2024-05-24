import React, {useEffect, useState} from 'react'

function App() {
  const [apiData, setApiData]=useState([{}])
  
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api`).then(
      
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
        <p> Loading datavg ....</p>
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