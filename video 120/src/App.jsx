import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { increment, decrement , multiply,incrementByAmount } from './redux/counter/counter'
import { useDispatch ,useSelector} from 'react-redux'

function App() {
  const dispatch = useDispatch();
  
  const count = useSelector((state ) => state.counter.value);

  return (
    <>
    <Navbar count={count} />
      <div>
      <button onClick={()=>dispatch(increment())}>+</button>        {count}
      <button onClick={()=>dispatch(decrement())}>-</button>       
      <button onClick={()=>dispatch(multiply(4))}>*</button>    
      <button onClick={() =>dispatch(incrementByAmount(3))}>incrementByAmount</button>   
      </div>
    </>
  )
}

export default App
