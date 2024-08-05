import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BoxC from './Box'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section className=' bg-[#d4d4d4] flex w-full h-screen justify-center items-center ' >
          <BoxC/>
    </section>
    
  )
}

export default App
