import { useState } from 'react'

/*Components*/
import LoadingComponent from "./components/loading/loading"
import Loves from "./components/loves/loves"

/*Files*/
import './App.css'

function App() {

  const [loading, setLoading] = useState(false)
  
  
  
  if(!loading){
    return (
      <>
      <LoadingComponent/>
      <Loves lovesNumbers={200}/>
      </>
    )
  }

}

export default App
