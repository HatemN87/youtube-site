import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
function Home({sidebar}) {
  let[category,setCategory]=useState(0)
  return (
    <>
    
      
      <Sidebar sidebar={sidebar} setCategory={setCategory} category={category}/>
      
      <div className={`container ${sidebar?'':'large-container'}`}>
        <Feed category={category}/>
      </div>


    

    </>
  )
}

export default Home