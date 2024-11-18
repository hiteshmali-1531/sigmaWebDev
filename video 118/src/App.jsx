import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './componets/Navbar'

function App() {

  const [count, setCount] = useState(0)
  const [adjective, setAdjective] = useState("good");
  // const getAdjective = () =>{
  //   return "another";
  // }

  const getAdjective = useCallback(
    () =>{
      return "another" +count;
    },[count]
  )

  return (
    <>
      <p>{count}</p>
      <button onClick={() =>setCount(count+1)}>click</button>
      <button 
      // onClick={() => getAdjective()}
      >On click</button>
      <Navbar adjective={adjective}
       getAdjective={getAdjective} 

       />
    </>
  )
}

export default App
