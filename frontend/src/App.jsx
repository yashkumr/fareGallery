
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Searching from './Pages/Searching.jsx';
import AirlinesListing from './Pages/AirlinesListing.jsx';
import Booking from "./Pages/booking.jsx";
import { ThankYou } from "./Pages/ThankYou.jsx";
function App() {

  return (
    <>
     
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/searching' element ={<Searching />} />
          <Route path='/search-results' element ={<AirlinesListing />} />
          
          <Route path="/flight-details/:id" element={<Booking />} />
          <Route path='/thankyou' element={<ThankYou />} />
        </Routes>
     
    </>
  )
}

export default App
