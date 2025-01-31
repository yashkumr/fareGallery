// FlightContext.js
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const FlightContext = createContext();

export const useFlight = () => useContext(FlightContext);

export const FlightProvider = ({ children }) => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const[errorCode, setErrorCode] = useState(null);

    const fetchFlights = async (searchParams) => {
        try {
            setLoading(true);
            setErrorCode(null);
            const response = await axios.get(`/api/v1/flights/search-flights?${searchParams}`);
           
        
            if (response.data.length === 0) {
                setErrorCode("There is no flight available between this route.");
              } else {
                setFlights(response.data);
                console.log("Fetched flights:", response.data);


              }

            setLoading(false);

        } catch (error) {
            console.error("Error fetching flights:", error);
            setErrorCode("Failed to fetch flight Flights. Please try again later.");
        }
        finally {
            setLoading(false);
        }
        
    };

    return (
        <FlightContext.Provider value={{ flights, loading,errorCode, fetchFlights,setFlights }}>
            {children}
        </FlightContext.Provider>
    );
};
