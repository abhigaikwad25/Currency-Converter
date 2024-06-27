import { useState } from 'react'
import CurrencyConverter from './Components/CurrencyConverter'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
        <div className=' min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
          <div className='container'>
          <CurrencyConverter />
          </div>
        </div>

  )
}

export default App
