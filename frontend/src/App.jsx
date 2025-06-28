import React from 'react'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'



const App = () => {
  return (
       <div className='h-screen w-full '>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={  <Home />}
        />
        <Route
          path="/gallery"
          element={  <Gallery />}
        />
         <Route
          path="/admin"
          element={  <Admin />}
        />
        <Route path="*" 
        element={<NotFound />} 
        />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
     
    </div>
  )
}

export default App