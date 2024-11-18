"use client"
import React, { useEffect } from 'react'

function Error({error, reset}) {
    useEffect(() =>{
        console.log(error)
    },[error]);
  return (
    <div>
      <h2>Something went Wrong!</h2>
      <button onClick={()=>{reset()}}>Try again</button>
    </div>
  )
}

export default Error
