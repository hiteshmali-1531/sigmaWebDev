"use client"
import { handleSubmit } from '@/actions/action';
import { useRef } from 'react'
export default function Home() {
  const ref = useRef();
  
  return (
    <main >
    <form ref={ref} action={(e)=>{handleSubmit(e); ref.current.reset()} }>

      <div className='my-2'>
        <input type="text" name="name" />
      </div>
      <div>
        <input type="text" name="email" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>

    </form>
      
    </main>
  );
}
