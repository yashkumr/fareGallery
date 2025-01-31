import React, { useContext, useEffect, useState } from 'react'
import Offer from '../Components/Airlines/Offer'
import Layout from '../Components/Layout.jsx'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useFlight } from '../context/FlightContext.jsx'
import { CurrencyContext } from '../context/CurrencyContext.jsx'
import Searching from './Searching.jsx'
import { Pop } from '../Components/Airlines/Pop.jsx'
import MainSearch from '../Components/Search/MainSearch.jsx'
import Header from '../Components/Header.jsx'
import Modify from '../Components/Search/Modify.jsx'

const AirlinesListing = () => {

    const [bookingPop, setBookingPop] = useState(false)

    const { currency, convertPrice } = useContext(CurrencyContext);
    const location = useLocation();
    const { flights, loading, fetchFlights, errorCode } = useFlight();
    const [filteredFlights, setFilteredFlights] = useState(flights); // Store filtered data
    const [filters, setFilters] = useState({ priceRange: [0, 0], airline: [], stops: null, selectedTimeSlot: "", selectedArrivalTimeSlot: "", sortBy: "Lowest" });
    const [minMaxPrice, setMinMaxPrice] = useState({
        minPrice: 0,
        maxPrice: 0,
    });
    const [showAll, setShowAll] = useState(false);
    const [tripType, setTripType] = useState('');
    const [flightDetailShow, setFlightDetailShow] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [availableAirlines, setAvailableAirlines] = useState([]); // State for available airlines
    const [airlineCounts, setAirlineCounts] = useState([])


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const trpType = params.get('trpType');
        setTripType(trpType);

        fetchFlights(params.toString());
    }, [location]);

    // Update the default price range based on flights data
    useEffect(() => {
        if (flights.length > 0) {
            // Get prices and set min/max price
            const prices = flights.map((flight) => convertPrice(flight?.price_dropdown?.base_fare, currency)).filter(Boolean);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            setMinMaxPrice({ minPrice, maxPrice });

            setFilters((prevFilters) => ({
                ...prevFilters,
                priceRange: [minPrice, maxPrice],
            }));

            setFilteredFlights(flights);

            // Extract and set available airlines
            const airlines = Array.from(
                new Set(flights.map((flight) => flight?.airlinesName?.name))
            );
            setAvailableAirlines(airlines);

            // Extract airline counts and minimum prices
            const airlineDataMap = flights.reduce((acc, flight) => {
                const airlineName = flight?.airlinesName?.name || "Unknown";
                const price = flight?.price;

                // If airline is already in the map
                if (acc[airlineName]) {
                    acc[airlineName].count += 1; // Increment the count
                    acc[airlineName].minPrice = Math.min(acc[airlineName].minPrice, price); // Update the minimum price
                } else {
                    // Initialize the count and set the current price as minPrice
                    acc[airlineName] = { count: 1, minPrice: price };
                }

                return acc;
            }, {});

            setAirlineCounts(airlineDataMap); // Assuming you have a state for airline data
            console.log(airlineDataMap); // Log the counts and minimum prices for verification

        }
    }, [flights]);



    const handleAirlineCheckboxChange = (airline) => {
        setFilters((prevFilters) => {
            let updatedAirlines = [...prevFilters.airline];
            if (updatedAirlines.includes(airline)) {
                // If airline is already selected, remove it
                updatedAirlines = updatedAirlines.filter((item) => item !== airline);
            } else {
                // If airline is not selected, add it
                updatedAirlines.push(airline);
            }
            return {
                ...prevFilters,
                airline: updatedAirlines
            };
        });
    };



    useEffect(() => {
        const handleFilter = () => {
            let updatedFlights = [...flights];

            // Filter by price range
            updatedFlights = updatedFlights.filter(
                (flight) =>
                    convertPrice(flight?.price_dropdown?.base_fare, currency) >= filters.priceRange[0] &&
                    convertPrice(flight?.price_dropdown?.base_fare, currency) <= filters.priceRange[1]
            );

            // Filter by selected airlines
            if (filters.airline && filters.airline.length > 0) {
                updatedFlights = updatedFlights.filter((flight) =>
                    filters.airline.some((selectedAirline) =>
                        flight?.airlinesName?.name?.toLowerCase().includes(selectedAirline.toLowerCase())
                    )
                );
            }


            // Filter by stops
            if (filters.stops !== null) {
                updatedFlights = updatedFlights.filter((flight) => {
                    const stopCount = flight?.route ? Object.keys(flight.route).length - 1 : 0;
                    if (filters.stops >= 2) {
                        return stopCount >= 2; // For flights with 2 or more stops
                    }
                    return stopCount === filters.stops; // For specific stop counts
                });
            }

            // Filter by time slot
            if (filters.selectedTimeSlot) {
                updatedFlights = updatedFlights.filter((flight) => {
                    const firstRoute = Object.values(flight?.route)?.[0];
                    if (!firstRoute) return false;
                    const departureHour = new Date(firstRoute.local_departure).getHours();

                    switch (filters.selectedTimeSlot) {
                        case "Morning":
                            return departureHour >= 6 && departureHour < 12;
                        case "Afternoon":
                            return departureHour >= 12 && departureHour < 18;
                        case "Evening":
                            return departureHour >= 18 && departureHour < 24;
                        default:
                            return true;
                    }
                });
            }


            // Filter by local arrival
            if (filters.selectedArrivalTimeSlot) {
                updatedFlights = updatedFlights.filter((flight) => {
                    const routes = Object.values(flight?.route);
                    if (!routes.length) return false;

                    // Get the last route
                    const lastRoute = routes[routes.length - 1];
                    if (!lastRoute) return false;
                    const arrivalHour = new Date(lastRoute.local_arrival).getHours();

                    switch (filters.selectedArrivalTimeSlot) {
                        case "Morning":
                            return arrivalHour >= 6 && arrivalHour < 12;
                        case "Afternoon":
                            return arrivalHour >= 12 && arrivalHour < 18;
                        case "Evening":
                            return arrivalHour >= 18 && arrivalHour < 24;
                        default:
                            return true;
                    }
                });
            }

            // Sort flights by price
            if (filters.sortBy) {
                updatedFlights.sort((a, b) => {
                    const priceA = convertPrice(a?.price_dropdown?.base_fare, currency);
                    const priceB = convertPrice(b?.price_dropdown?.base_fare, currency);

                    return filters.sortBy === "Lowest" ? priceA - priceB : priceB - priceA;
                });
            }

            setFilteredFlights(updatedFlights);
        };

        handleFilter();
    }, [flights, filters]);

    const getTimeAndDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return {
            time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: date.toLocaleDateString(),
        };
    };

    // Divide the data
    // const halfIndex = Math.ceil(filteredFlights.length / 2);
    // const displayedFlights = showAll ? filteredFlights : filteredFlights.slice(0, halfIndex);

    const handleMinChange = (e) => {
        const newMin = parseInt(e.target.value, 10);
        if (newMin <= filters.priceRange[1]) {
            setFilters({ ...filters, priceRange: [newMin, filters.priceRange[1]] });
        }
    };

    const handleMaxChange = (e) => {
        const newMax = parseInt(e.target.value, 10);
        if (newMax >= filters.priceRange[0]) {
            setFilters({ ...filters, priceRange: [filters.priceRange[0], newMax] });
        }
    };

    const handleStopChange = (stopValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            stops: prevFilters.stops === stopValue ? null : stopValue, // Toggle stop value
        }));
    };


    // if (minMaxPrice.minPrice === minMaxPrice.maxPrice) {
    //     return <div className="loading-popup d-flex justify-content-center align-items-center bg-gray" style={{ height: "100vh" }}>
    //         <div className="d-flex justify-content-center align-items-center ">
    //             <div className="spinner-border " role="status">
    //                 <span className="">Loading...</span>
    //             </div>
    //         </div>
    //     </div>;

    // }

    const clearFilters = () => {
        setFilters({
            airline: "", stops: null, selectedTimeSlot: "", selectedArrivalTimeSlot: "",
            priceRange: [minMaxPrice.minPrice, minMaxPrice.maxPrice],
        });

        setFilteredFlights(flights);
    };

    const showFlightDetails = (flight) => {
        setSelectedFlight(flight); // Set the selected flight data
        setBookingPop(true); // Open the popup
    };

    const closePopup = () => {
        setBookingPop(false); // Close the popup
        setSelectedFlight(null); // Reset the selected flight
    };

    // if (!flights || !flights.route) return <p>No flight data available</p>;

    // const departureFlights = Object.values(flights.route).filter(flight => flight.return === 0).length;
    // console.log(departureFlights.length);
    // const returnFlights = Object.values(flights.route).filter(flight => flight.return === 1);


    useEffect(() => {

        let roundFlights = [...flights]

        roundFlights = roundFlights.filter((flight) => {

            flight.outboundFlights = Object.values(flight?.route).filter(flight => flight.return === 0);
            flight.inboundFlights = Object.values(flight?.route).filter(flight => flight.return === 1);
            console.log(flight.outboundFlights);

            return flight.outboundFlights >= 0 && flight.inboundFlights >= 0;
        });
        setFilteredFlights(roundFlights);

    }, [flights]);




    const paramNames = ["adults", "infants", "children", "source", "destination", "date", "classes"];
    const params = new URLSearchParams(location?.search);


    const { adults: adults, infants: infants, children: children, source: source, destination: destination, date: date } = Object.fromEntries(
        paramNames.map((key) => [key, params.get(key)])
    );


    const originCode = source.split('-')[0];
    const originAirport = source.substring(source.indexOf('-') + 1);

    const destCode = destination.split('-')[0];
    const destAirport = destination.substring(destination.indexOf('-') + 1);





    return (
        <>
            <Layout title="Faresgallery" description="welcome to Faresgallery" >

                <Modify />
                <Header />
                <section className="container-fluid blur_me">
                    <div className="container-fluid container-xl control_cont">
                        <div className="row listing_cont common_padding">
                            <div className="row se_cont justify-content-between">

                                <div>

                                    {errorCode ? (
                                        <>
                                            {/* If there is error from server */}
                                            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                                                <p style={{ color: "red", fontSize: "18px" }}>{errorCode}</p>
                                            </div>
                                        </>


                                    ) : loading ? (
                                        <>
                                            {/* If there is no data yet */}

                                            <Searching />

                                        </>


                                    ) : (

                                        <>
                                            <div className='row'>

                                                {/* Asides Filters */}
                                                <div className="col-12 col-lg-3 remove_sp aside_cont_fixed pe-3">
                                                    <div className="d-flex d-xl-none align-items-center mb-2 gap-2">
                                                        <button className="close_short d-flex align-items-center justify-content-center"
                                                            fdprocessedid="sje10o">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708">
                                                                </path>
                                                            </svg>
                                                        </button>
                                                        <p className="fil_title">Short &amp; Filter</p>
                                                    </div>
                                                    <div className="aside_flight">
                                                        <div className="d-flex justify-content-between align-items-center fil_head">
                                                            <p className="title_fl fw6 mb-0 letter title_fl_f">Filters</p>

                                                        </div>
                                                        <div className="stops_cont mt-3 mt-sm-2">
                                                            <div className="d-flex justify-content-between align-items-center cursor-pointer">
                                                                <p className="title_fl fw6 mb-0 letter">Stop</p>
                                                                <p className="fw6 font_12 letter cursor-pointer" onClick={clearFilters}>RESET</p>
                                                            </div>
                                                            <hr className="hr_c" />

                                                            <div className="gr_f">
                                                                <div className="form-check form_check">
                                                                    <label className="form-check-label" htmlFor="flexCheckNonStop">
                                                                        <div>
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                value="0"
                                                                                id="flexCheckNonStop"
                                                                                checked={filters.stops === 0}
                                                                                onChange={() => handleStopChange(0)} // Non-stop
                                                                            />
                                                                            <p className="check_ti">Non-stop</p>
                                                                        </div>
                                                                    </label>
                                                                </div>

                                                                <div className="form-check form_check">
                                                                    <label className="form-check-label" htmlFor="flexCheckOneStop">
                                                                        <div>
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                value="1"
                                                                                id="flexCheckOneStop"
                                                                                checked={filters.stops === 1}
                                                                                onChange={() => handleStopChange(1)} // 1 Stop
                                                                            />
                                                                            <p className="check_ti">1 Stop</p>
                                                                        </div>
                                                                    </label>
                                                                </div>

                                                                <div className="form-check form_check">
                                                                    <label className="form-check-label" htmlFor="flexCheckTwoPlusStops">
                                                                        <div>
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                value="2"
                                                                                id="flexCheckTwoPlusStops"
                                                                                checked={filters.stops === 2}
                                                                                onChange={() => handleStopChange(2)} // 2+ Stops
                                                                            />
                                                                            <p className="check_ti">2+ Stops</p>
                                                                        </div>
                                                                    </label>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <hr className="hr_c" />
                                                        <div className="price_range">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p className="title_fl fw6 mb-0 letter">Min</p>
                                                                <p className="fw6 font_12 letter">Max</p>
                                                            </div>
                                                            <label htmlFor="customRange1" className="form-label mt-1 mb-0 d-flex justify-content-between range_r">
                                                                <p>{currency}  {filters.priceRange[0]}</p>
                                                                <p>{currency}  {filters.priceRange[1]}</p>
                                                            </label>
                                                            <div style={{ position: "relative", height: "30px" }}>

                                                                <div
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "20px",
                                                                        left: "0",
                                                                        right: "0",
                                                                        height: "6px",
                                                                        background: "#ddd",
                                                                        borderRadius: "5px",

                                                                    }}
                                                                />
                                                                {/* Range Highlight */}
                                                                <div
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "20px",
                                                                        left: `${((filters.priceRange[0] - minMaxPrice.minPrice) / (minMaxPrice.maxPrice - minMaxPrice.minPrice)) * 100}%`,
                                                                        right: `${100 - ((filters.priceRange[1] - minMaxPrice.minPrice) / (minMaxPrice.maxPrice - minMaxPrice.minPrice)) * 100}%`,
                                                                        height: "6px",
                                                                        background: "#007aff",
                                                                        borderRadius: "5px",
                                                                        border: "1px solid red solid",
                                                                    }}
                                                                />
                                                                {/* Minimum slider */}
                                                                <input
                                                                    type="range"
                                                                    min={minMaxPrice.minPrice}
                                                                    max={minMaxPrice.maxPrice}
                                                                    value={filters.priceRange[0]}
                                                                    onChange={handleMinChange}
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "10px",
                                                                        zIndex: "2",
                                                                        width: "100%",
                                                                        pointerEvents: "auto",
                                                                        appearance: "none",
                                                                    }}
                                                                />
                                                                {/* Maximum slider */}
                                                                <input
                                                                    type="range"
                                                                    min={minMaxPrice.minPrice}
                                                                    max={minMaxPrice.maxPrice}
                                                                    value={filters.priceRange[1]}
                                                                    onChange={handleMaxChange}
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "10px",
                                                                        zIndex: "2",
                                                                        width: "100%",
                                                                        height: "16px",
                                                                        borderRadius: "11px",
                                                                        pointerEvents: "auto",
                                                                        appearance: "none",
                                                                        backgroundImage: 'linear-gradient(135deg, #92FFC0 10%, #002661 100%)',
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="depart_cont mt-0 mt-sm-2">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p className="title_fl fw6 mb-0 letter">Departure Time</p>

                                                            </div>
                                                            <div className="time_de mt-0 mt-sm-3">
                                                                <div className="time_de_cont text-center">
                                                                    <img src="imgs/sunrise.png" />
                                                                    <div onClick={() => setFilters({ ...filters, selectedTimeSlot: "Morning" })}>
                                                                        <p className="fw5 font_14">Early Morning</p>
                                                                        <p className="font_13">6 AM - 12 PM</p>
                                                                    </div>
                                                                </div>
                                                                <div className="time_de_cont text-center">
                                                                    <img src="imgs/morning-icon.png" />
                                                                    <div onClick={() => setFilters({ ...filters, selectedTimeSlot: "Afternoon" })}>
                                                                        <p className="fw5 font_14"> Afternoon</p>
                                                                        <p className="font_13">12 PM - 6 PM</p>
                                                                    </div>
                                                                </div>
                                                                <div className="time_de_cont text-center">
                                                                    <img src="imgs/add-sun.png" />
                                                                    <div onClick={() => setFilters({ ...filters, selectedTimeSlot: "Evening" })}>
                                                                        <p className="fw5 font_14">Evening</p>
                                                                        <p className="font_13">6 PM - 12 AM</p>
                                                                    </div>
                                                                </div>
                                                                <div className="time_de_cont text-center" onClick={() => setFilters({ ...filters, selectedTimeSlot: "" })}>
                                                                    <img src="imgs/evv.png" />
                                                                    <div>
                                                                        <p className="fw5 font_14"></p>
                                                                        <p className="font_13">All Times</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr className="hr_c" />
                                                        <div className="depart_cont mt-0 mt-sm-2">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p className="title_fl fw6 mb-0 letter">Return Time</p>

                                                            </div>
                                                            <div className="time_de mt-0 mt-sm-3">
                                                                <div className="time_de_cont text-center">
                                                                    <img src="imgs/sunrise.png" />
                                                                    <div onClick={() => setFilters({ ...filters, selectedArrivalTimeSlot: "Morning" })}>
                                                                        <p className="fw5 font_14">Early Morning</p>
                                                                        <p className="font_13">6 AM - 12 PM</p>
                                                                    </div>
                                                                </div>
                                                                <div className="time_de_cont text-center">
                                                                    <img src="imgs/morning-icon.png" />
                                                                    <div onClick={() => setFilters({ ...filters, selectedArrivalTimeSlot: "Afternoon" })}>
                                                                        <p className="fw5 font_14"> Afternoon</p>
                                                                        <p className="font_13">12 PM - 6 PM</p>
                                                                    </div>
                                                                </div>
                                                                <div className="time_de_cont text-center">
                                                                    <img src="imgs/add-sun.png" />
                                                                    <div onClick={() => setFilters({ ...filters, selectedArrivalTimeSlot: "Evening" })}>
                                                                        <p className="fw5 font_14">Evening</p>
                                                                        <p className="font_13">6 PM - 12 AM</p>
                                                                    </div>
                                                                </div>
                                                                <div className="time_de_cont text-center" onClick={() => setFilters({ ...filters, selectedArrivalTimeSlot: "" })}>
                                                                    <img src="imgs/evv.png" />
                                                                    <div>
                                                                        <p className="fw5 font_14"></p>
                                                                        <p className="font_13">All Times</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <hr className="hr_c" />
                                                            <div className="price_range">

                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <p className="title_fl fw7 mb-0 letter">Airlines</p>
                                                                    <p className="fw6 font_12 letter">Category</p>
                                                                </div>

                                                                {Object.entries(airlineCounts).map(([airline, { count, minPrice }]) => (

                                                                    <div className="form-check form_check" key={airline}>

                                                                        <label className="form-check-label" for="flexCheckDefaultam">
                                                                            <div>
                                                                                <input className="form-check-input" type="checkbox" checked={filters.airline.includes(airline)}
                                                                                    onChange={() => handleAirlineCheckboxChange(airline)}
                                                                                    id="flexCheckDefaultam" />
                                                                                <p className="check_ti">
                                                                                    <img src="imgs/a-icon.png" />
                                                                                    {airline} ({count} )

                                                                                </p>
                                                                            </div>
                                                                            <div className="price_check">
                                                                                {minPrice}
                                                                            </div>
                                                                        </label>
                                                                    </div>

                                                                ))}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Asides Filters End */}


                                                {/* trips */}
                                                <div className="col-12 col-lg-9 col-xl-7 remove_sp mt-1 mt-sm-3 mt-lg-4 mt-lg-0">

                                                    <a href="#" className="res_f fw6">{flights.length} Results Found</a>
                                                    <p className="fw6 title_fl mt-1 mt-sm-3 mb-0 mb-sm-2">{flights.length} results found from
                                                        All Airports ({originCode}) - {source}  to {destCode} -{destination}
                                                        On Current Date {date}</p>
                                                    <div className="col-12 d-block d-xl-none">
                                                        <button className="sh_fil_btn" fdprocessedid="z19qi">
                                                            <img src="imgs/filter-icon.png" />
                                                            Short &amp; Filter</button>
                                                    </div>
                                                    <hr className="my-3" />

                                                    <div className="d-flex justify-content-between assit_cont flex-column gap-2">

                                                        <ul className="t_ul mb-0">
                                                            <li>

                                                                Grab exciting deals for your dream holiday!
                                                            </li> <span className="line_ll"></span>
                                                            <li>24-hour free cancellation policy.</li>
                                                        </ul>
                                                    </div>
                                                    <div className="phone_flight_cont mt-2 mt-sm-4">
                                                        <div className="d-flex align-items-center justify-content-between flex-column flex-sm-row">
                                                            <p className="fw6 title_fl mt-0 mb-0 ph_f ph_f_start">
                                                                Phone Only Offers - Fares starting from <span>$1200.00*</span>
                                                            </p>

                                                            <a className="fw5 title_fl mt-0 mb-0 ph_f ph_f_c" href="#"><img src="imgs/call-only.png" />
                                                                Call Us : <span> +44 01902
                                                                    500214</span>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    {/* Sort By Price */}
                                                    <div >
                                                        <label  > <p style={{ color: "#4d5f5c", fontSize: "14px" }}>Sort By Price </p> </label>
                                                        <select
                                                            value={filters.sortBy}
                                                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                                            style={{ color: "#4d5f5c", fontSize: "11px" }} >

                                                            <option value="Lowest">Lowest Price</option>
                                                            <option value="Highest">Highest Price</option>
                                                        </select>
                                                    </div>
                                                    <div className="flight_c remove_sp">

                                                        {tripType === 'roundtrip' ? (
                                                            <>

                                                                {/* Popup for Roundtrip */}

                                                                {/* Popup Component */}
                                                                {bookingPop && (
                                                                    <Pop
                                                                        bookingPop={bookingPop}
                                                                        setBookingPop={setBookingPop}
                                                                        flight={selectedFlight} // Pass the selected flight data
                                                                        onClose={closePopup} // Close popup handler
                                                                    />
                                                                )}


                                                                {/* end Popup for Roundtrip */}



                                                                {/* roundtrip */}
                                                                <div className="flight_listing">

                                                                    {filteredFlights && filteredFlights.length > 0 ? (
                                                                        filteredFlights.map((flight) => (

                                                                            <>


                                                                                <div className="flight_list_c" key={flight.id}>
                                                                                    <div className="list_cont_c d-flex justify-content-between align-items-center">
                                                                                        <div className="w_cont">

                                                                                            <div className="fl_cont2 round_trip relative">
                                                                                                <div className="depature_tab">Depart Details</div>
                                                                                                <div className="fl_cont2_main flex_props justify-content-between">
                                                                                                    <div className="d-flex align-items-center gap-2 mb-1">
                                                                                                        <div className="fl_icon">
                                                                                                            <img src="/imgs/luf.png" />
                                                                                                        </div>
                                                                                                        <p className="fw4 fl_tt">{flight?.airlines[0]} <span>- {flight?.flightarray?.flight_no[0]}</span></p>

                                                                                                    </div>
                                                                                                    <div className="fl_price d-flex align-items-end text-end flex-column fl_price_none1">
                                                                                                        <div className="d-flex start_price">
                                                                                                            <p className=""><del>$400.00</del> $350.00</p>
                                                                                                        </div>
                                                                                                        <div className="text-center control_stops2">
                                                                                                            <p>Roundtrip Per Traveler</p>
                                                                                                            <a href="#" className="book_btn2">Book Flight Now <i className="fa-solid fa-caret-right"></i></a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="d-flex gap-2 gap-sm-4 font_in mt-1 align-items-center">
                                                                                                    <div className="text_end">

                                                                                                        {Object.values(flight?.route)?.[0] && (() => {
                                                                                                            const firstRoute = Object.values(flight?.route)?.[0];
                                                                                                            const departure = getTimeAndDate(firstRoute?.local_departure);
                                                                                                            return (
                                                                                                                <div >
                                                                                                                    <p>{flight?.cityFrom}({flight?.cityCodeFrom}) - <span className="time_1">{departure.time}</span></p>
                                                                                                                    <p className="font_12_date">{departure.date}</p>

                                                                                                                </div>
                                                                                                            );
                                                                                                        })()}
                                                                                                    </div>
                                                                                                    <div className="text-center l_l_minus">
                                                                                                    <span className="line_l_l"></span>
                                                                                                        <p className="font_12_date"> ({Math.floor(
                                                                                                            Object.values(flight.outboundFlights || {}).reduce((sum, f) => sum + (f.durationInMinutes || 0), 0) / 60
                                                                                                        )}h : {Object.values(flight.outboundFlights || {}).reduce((sum, f) => sum + (f.durationInMinutes || 0), 0) % 60}m , {flight.outboundFlights && Object.keys(flight.outboundFlights).length === 1
                                                                                                            ? "Non Stops"
                                                                                                            : Object.keys(flight.outboundFlights).length - 1} stops)</p>
                                                                                                       



                                                                                                    </div>
                                                                                                    <div className="text_end">



                                                                                                        {Object.values(flight?.outboundFlights)?.[Object.values(flight?.outboundFlights).length - 1] && (() => {
                                                                                                            const lastRoute = Object.values(flight?.outboundFlights)?.[Object.values(flight?.outboundFlights).length - 1];
                                                                                                            const arrival = getTimeAndDate(lastRoute?.local_arrival);
                                                                                                            return (
                                                                                                                <div >
                                                                                                                    <p>{flight?.cityTo}({flight?.cityCodeTo}) - <span className="time_1">{arrival.time}</span></p>
                                                                                                                    <p className="font_12_date"> {arrival.date}</p>

                                                                                                                </div>
                                                                                                            );
                                                                                                        })()}


                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>


                                                                                            <div className="fl_cont2 round_trip relative">
                                                                                                <div className="depature_tab">Return Details</div>
                                                                                                <div className="fl_cont2_main flex_props justify-content-between">
                                                                                                    <div className="d-flex align-items-center gap-2 mb-1">
                                                                                                        <div className="fl_icon">
                                                                                                            <img src="/imgs/luf.png" />
                                                                                                        </div>
                                                                                                        <p className="fw4 fl_tt">{flight?.inboundFlights[flight?.inboundFlights?.length - 1]?.airline} <span>- {flight?.inboundFlights[flight?.inboundFlights?.length - 1]?.flight_no}</span></p>



                                                                                                    </div>

                                                                                                </div>
                                                                                                <div className="d-flex gap-2 gap-sm-4 font_in mt-1 align-items-center">
                                                                                                    <div className="text_end">

                                                                                                        {Object.values(flight.inboundFlights)?.[0] && (() => {
                                                                                                            const firstRoute = Object.values(flight?.inboundFlights)?.[0];
                                                                                                            const departure = getTimeAndDate(firstRoute?.local_departure);
                                                                                                            return (
                                                                                                                <div className="">
                                                                                                                    <p>{flight.inboundFlights[0]?.cityFrom}({flight.inboundFlights[0]?.cityCodeFrom}) - <span className="time_1">{departure.time}</span></p>
                                                                                                                    <p className="font_12_date">{departure.date}</p>

                                                                                                                </div>
                                                                                                            );
                                                                                                        })()}
                                                                                                    </div>
                                                                                                    <div className="text-center l_l_minus">
                                                                                                    <span className="line_l_l"></span>
                                                                                                        <p className="font_12_date">({Math.floor(
                                                                                                            Object.values(flight.inboundFlights || {}).reduce((sum, f) => sum + (f.durationInMinutes || 0), 0) / 60
                                                                                                        )}h : {Object.values(flight.inboundFlights || {}).reduce((sum, f) => sum + (f.durationInMinutes || 0), 0) % 60}m , {flight.inboundFlights && Object.keys(flight.inboundFlights).length === 1
                                                                                                            ? "Non Stops"
                                                                                                            : Object.keys(flight.inboundFlights).length - 1}  stops)</p>
                                                                                                       


                                                                                                    </div>
                                                                                                    <div className="text_end">
                                                                                                        {Object.values(flight?.inboundFlights)?.[Object.values(flight?.inboundFlights).length - 1] && (() => {
                                                                                                            const lastRoute = Object.values(flight?.inboundFlights)?.[Object.values(flight?.inboundFlights).length - 1];
                                                                                                            const arrival = getTimeAndDate(lastRoute?.local_arrival);
                                                                                                            return (
                                                                                                                <div>
                                                                                                                    <p>{flight.inboundFlights[flight.inboundFlights.length - 1].cityTo}({flight.inboundFlights[flight.inboundFlights.length - 1].cityCodeTo})- <span className="time_1">{arrival.time}</span></p>
                                                                                                                    <p className="font_12_date">{arrival.date}</p>

                                                                                                                </div>
                                                                                                            );
                                                                                                        })()}


                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="fl_price d-flex align-items-end text-end flex-column fl_price_none">
                                                                                            <div className="d-flex start_price">
                                                                                                <p className=""><del></del> {currency} {convertPrice(flight?.price_dropdown?.base_fare, currency)}</p>
                                                                                            </div>
                                                                                            <div className="text-center control_stops2">
                                                                                                <p>Roundtrip Per Traveler</p>
                                                                                                <Link to={`/flight-details/${flight.id}`} state={{ flight, location }} className="book_btn2">
                                                                                                    Book Flight Now<i className="fa-solid fa-caret-right"></i>
                                                                                                </Link>
                                                                                                {/* <a href="#" className="book_btn2">Book Flight Now <i className="fa-solid fa-caret-right"></i></a> */}
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flight-head d-flex align-items-center gap-1 justify-content-between white">
                                                                                    <div className="d-flex align-items-center gap-1">

                                                                                        <p className="mb-0">No Change Fee | Seat Choice Included | Seat Choice Included</p>
                                                                                    </div>
                                                                                    <div className="d-flex gap-2 align-items-center">
                                                                                        <div className="d-flex gap-2 align-items-center">

                                                                                            <div className="seat_left d-flex justify-content-end align-items-center">

                                                                                                <div className="d-flex align-items-center gap-1">

                                                                                                    <img src="/imgs/seat-icon1.png" />
                                                                                                    <p className="fw5">Seats Left:</p>
                                                                                                    <div className="num_s white">{flight?.availability?.seats}</div>
                                                                                                </div>

                                                                                            </div>
                                                                                        </div>




                                                                                        {/* <button className='viw_d' onClick={() => showFlightDetails(flight)}>View details</button> */}
                                                                                        <a className='viw_d' href="tel:+44 800 520 0069">Call us Now</a>
                                                                                    </div>
                                                                                </div>





                                                                            </>


                                                                        ))
                                                                    ) :
                                                                        (
                                                                            <>

                                                                                <div className=" d-flex justify-content-center align-items-center bg-gray" style={{ height: "100vh" }}>
                                                                                    <h3 className="text-center fw-bold text-warning">Sorry! There is no flight available on this Route...</h3>
                                                                                </div>

                                                                            </>
                                                                        )}


                                                                </div>
                                                                {/* end  roundtrip */}
                                                            </>


                                                        ) : (
                                                            <>

                                                                {/* onewaytrip */}

                                                                {/* Popup for Roundtrip */}

                                                                {/* Popup Component */}
                                                                {bookingPop && (
                                                                    <Pop
                                                                        bookingPop={bookingPop}
                                                                        setBookingPop={setBookingPop}
                                                                        flight={selectedFlight} // Pass the selected flight data
                                                                        onClose={closePopup} // Close popup handler
                                                                    />
                                                                )}


                                                                {/* end Popup for Roundtrip */}


                                                                <div className="flight_listing">

                                                                    {filteredFlights && filteredFlights.length > 0 ? (
                                                                        filteredFlights.map((flight) => (

                                                                            <>


                                                                                <div className="flight_list_c">
                                                                                    <div className="depature_tab">Depart Details</div>
                                                                                    <div className="list_cont_c d-flex justify-content-between align-items-center">
                                                                                        <div className="d-flex justify-content-between align-items-center w_cont">
                                                                                            <div className="fl_cont2">
                                                                                                <div className="fl_cont2_main flex_props justify-content-between">
                                                                                                    <div className="d-flex align-items-center gap-2 mb-1">
                                                                                                        <div className="fl_icon">
                                                                                                            <img src="imgs/luf.png" />
                                                                                                        </div>
                                                                                                        <p className="fw4 fl_tt">{flight?.airlinesName?.name} <span>{flight?.airlines[0]}-{flight?.flightarray?.flight_no[0]}</span></p>

                                                                                                    </div>
                                                                                                    <div className="fl_price d-flex align-items-end text-end flex-column fl_price_none1">
                                                                                                        <div className="d-flex start_price">
                                                                                                            {/* <p className=""><del>$400.00</del> $350.00</p> */}
                                                                                                        </div>
                                                                                                        <div className="text-center control_stops2">
                                                                                                            <p>Roundtrip Per Traveler</p>
                                                                                                            <a href="#" className="book_btn2">Book Flight Now <i className="fa-solid fa-caret-right"></i></a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="d-flex gap-2 gap-sm-4 font_in mt-1 align-items-center">
                                                                                                    <div>

                                                                                                        {Object.values(flight?.route)?.[0] && (() => {
                                                                                                            const firstRoute = Object.values(flight?.route)?.[0];
                                                                                                            const departure = getTimeAndDate(firstRoute?.local_departure);
                                                                                                            return (
                                                                                                                <div >
                                                                                                                    <p>{flight?.cityFrom}({flight?.cityCodeFrom}) - <span className="time_1">{departure.time}</span></p>
                                                                                                                    <p className="font_12_date">{departure.date}</p>
                                                                                                                </div>
                                                                                                            );
                                                                                                        })()}

                                                                                                    </div>
                                                                                                    <div className="text-center l_l_minus">
                                                                                                        <span className="line_l_l"></span>
                                                                                                        {/* <p className="font_12_date">(28h 25m, 1 stops)</p> */}
                                                                                                        <p className="font_12_date">({Math.floor(
                                                                                                            Object.values(flight?.route || {}).reduce((sum, f) => sum + (f.durationInMinutes || 0), 0) / 60
                                                                                                        )}h  {Object.values(flight?.route || {}).reduce((sum, f) => sum + (f.durationInMinutes || 0), 0) % 60}m, {flight?.route && Object.keys(flight.route).length === 1
                                                                                                            ? "Non Stops"
                                                                                                            : Object.keys(flight.route).length - 1}) stops</p>
                                                                                                    </div>

                                                                                                    {Object.values(flight?.route)?.[Object.values(flight?.route).length - 1] && (() => {
                                                                                                        const lastRoute = Object.values(flight?.route)?.[Object.values(flight?.route).length - 1];
                                                                                                        const arrival = getTimeAndDate(lastRoute?.local_arrival);
                                                                                                        return (


                                                                                                            <div className="text_end">
                                                                                                                <p>{flight?.cityTo}({flight?.cityCodeTo}) - <span className="time_1">{arrival.time}</span></p>
                                                                                                                <p className="font_12_date">{arrival.date}</p>
                                                                                                            </div>

                                                                                                        );
                                                                                                    })()}

                                                                                                </div>

                                                                                            </div>


                                                                                        </div>
                                                                                        <div className="fl_price d-flex align-items-end text-end flex-column fl_price_none">
                                                                                            <div className="d-flex start_price">
                                                                                                <p className=""><del></del>  {currency} {convertPrice(flight?.price_dropdown?.base_fare, currency)}</p>
                                                                                            </div>
                                                                                            <div className="text-center control_stops2">
                                                                                                <p>Roundtrip Per Traveler</p>
                                                                                                {/* <a href="#" className="book_btn2">Book Flight Now <i className="fa-solid fa-caret-right"></i></a> */}
                                                                                                <Link to={`/flight-details/${flight.id}`} state={{ flight, location }} className="book_btn2">
                                                                                                    Book Flight Now<i className="fa-solid fa-caret-right"></i>
                                                                                                </Link>
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="flight-head d-flex align-items-center gap-1 justify-content-between white">
                                                                                    <div className="d-flex align-items-center gap-1">

                                                                                        <p className="mb-0">No Change Fee | Seat Choice Included | Seat Choice Included</p>
                                                                                    </div>
                                                                                    <div className="d-flex gap-2 align-items-center">
                                                                                        <div className="d-flex gap-2 align-items-center">

                                                                                            <div className="seat_left d-flex justify-content-end align-items-center">

                                                                                                <div className="d-flex align-items-center gap-1">

                                                                                                    <img src="/imgs/seat-icon1.png" />
                                                                                                    <p className="fw5"> Seats Left:</p>
                                                                                                    <div className="num_s white">{flight?.availability?.seats}</div>
                                                                                                </div>

                                                                                            </div>
                                                                                        </div>
                                                                                        <span>|</span>
                                                                                        <button className='viw_d' onClick={() => showFlightDetails(flight)}>View details</button>
                                                                                    </div>
                                                                                </div>


                                                                            </>

                                                                        ))
                                                                    ) : (
                                                                        <>


                                                                            <div className=" d-flex justify-content-center align-items-center bg-gray" style={{ height: "100vh" }}>
                                                                                <h3 className="text-center fw-bold text-warning">Sorry! There is no flight available on this Route...</h3>
                                                                            </div>
                                                                        </>
                                                                    )}


                                                                </div>

                                                                {/* end onewaytrip */}


                                                            </>
                                                        )
                                                        }





                                                    </div>

                                                </div>
                                                {/* end trips */}

                                                <Offer />

                                            </div>
                                        </>



                                    )}
                                </div>






                            </div>
                        </div>
                    </div>
                </section>

            </Layout >



        </>
    )
}

export default AirlinesListing