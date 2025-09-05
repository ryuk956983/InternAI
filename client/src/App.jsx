import React,{useState} from 'react'
import Navbar from './components/Navbar'
import LandingPage from './mainRouter/LandingPage'
import Spinner from './components/Spinner'
const App = () => {
  
  const [loading, setloading] = useState(false);
  return (
    <div className='h-screen '>
 {loading &&  <Spinner />}
      <Navbar />
      <LandingPage setloading={setloading}/>

    </div>

  )
}

export default App