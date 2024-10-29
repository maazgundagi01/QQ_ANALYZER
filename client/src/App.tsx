import Nav from "./components/Nav"
import Router from "./Router"
import { useState, useEffect } from "react";


function App() {
  const[titleVisible, setTitleVisible] = useState<boolean>(true);
  useEffect(()=>{
    const mainTitle = document.getElementById('main-title')
    if (mainTitle){
      mainTitle.style.display = titleVisible ? 'block' : 'none';
    } 
  },[titleVisible])

  return (
    <div>
      <Nav/>
      
      <div className="min-h-full">
            <Router/>
      </div>
    </div>
  )
}

export default App
