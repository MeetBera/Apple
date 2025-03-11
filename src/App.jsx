import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Highlights from './Components/Highlights'
import Model from './Components/Model'
import Footer from './Components/Footer'

function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Footer />
    </main>
  )
}

export default App