import { useEffect, useMemo, useState } from 'react'

import './App.css'

const nums = new Array(20_000_000).fill(0).map((_,i) =>{
  return {
    index : i,
    isMagical: i == 19_000_000,

  }
})
function App() {
  const [number, setNumber] = useState(nums);
  const [count , setCount] = useState(0);
  const magical = useMemo(() =>number.find((item) => item.isMagical == true),[number]) 
  useEffect(()=>{
    console.log("hii")
  },[]);
  return (
    <>
    <div style={{color:'#fff'}}>

      <p>count {count}</p>
      <span style={{color:'#fff'}}>Magical number is {magical.index}</span>
      <button onClick={()=>{
          setCount(count+1);
        if(count+1   == 10){
          console.log(count); 
          setNumber(new Array(10_000_000).fill(0).map((_,i) =>{
            return {
              index: i,
              isMagical: i ==9_000_000
            }
          }))
        }
       }}>Click</button>
    </div>
      </>
  )
}

export default App
