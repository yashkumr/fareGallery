import { createRoot } from 'react-dom/client'
import "./assets/css/global.css"
import "./assets/css/flight.css"
import "./assets/css/booking.css"
import "./assets/css/media.css"
import "./assets/css/vkStyle.css"
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FlightProvider } from './context/FlightContext.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'

createRoot(document.getElementById('root')).render(



  <CurrencyProvider>
    <FlightProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FlightProvider>
  </CurrencyProvider>

)
