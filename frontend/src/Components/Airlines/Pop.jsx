import React from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Pop = ({ bookingPop, setBookingPop, flight, onClose }) => {

    const location = useLocation();

    const currentLocation = useLocation();

    // Determine if the button should be visible or hidden
    const isListingPage = currentLocation.pathname.includes('search-results');
    const isBookingPage = currentLocation.pathname.includes('flight-details');

    const [searchParams] = useSearchParams();
    const tripType = searchParams.get("trpType");



    const paramNames = ["adults", "infants", "children", "source", "destination", "date", "classes"];
    const params = new URLSearchParams(location?.search);


    const { adults: adults, infants: infants, children: children, source: source, destination: destination, date: date } = Object.fromEntries(
        paramNames.map((key) => [key, params.get(key)])
    );





    const getTimeAndDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return {
            time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: date.toLocaleDateString(),
        };
    };

    function formatDuration(duration) {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
        const match = duration.match(regex);
        const hours = match[1] ? `${match[1]} hour${match[1] > 1 ? 's' : ''}` : '';
        const minutes = match[2] ? `${match[2]} minute${match[2] > 1 ? 's' : ''}` : '';

        return [hours, minutes].filter(Boolean).join(' ');
    }



    return (
        <>
            <div className={bookingPop ? "pop_up_one pop_up_one_ac" : "pop_up_one"}>
                <section className="pop_modal_sm">
                    <div className="pop_main relative">

                        <div className="pop_head flex_props gap-2">
                            <button onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
                            <p>Flight details</p>

                        </div>
                        <div className="pop_body">

                            <div className="pop_headd">
                                Depart : {source}| {flight?.cityFrom}
                            </div>


                            {flight?.outboundFlights && (

                                <>
                                    {(() => {
                                        const routeArray = Object.values(flight.outboundFlights);

                                        const chunkArray = (array, chunkSize) => {
                                            if (chunkSize <= 1) {
                                                throw new Error("Chunk size must be greater than 1");
                                            }

                                            const chunks = [];
                                            let i = 0;

                                            while (i < array.length) {
                                                let chunk = array.slice(i, i + chunkSize);

                                                if (i + chunkSize > array.length) {
                                                    const lastElement = chunk[chunk.length - 1];
                                                    while (chunk.length < chunkSize) {
                                                        chunk.push(lastElement);
                                                    }
                                                }

                                                chunks.push(chunk);

                                                i += chunkSize - 1;
                                            }

                                            return chunks;
                                        };

                                        const chunkRoundData = chunkArray(routeArray, 2);

                                        return (
                                            <>
                                                {chunkRoundData.map((routeData, index) => (
                                                    <>

                                                        <div key={index} >
                                                            {routeData.map((route, innerIndex) => {
                                                                // Track the previously displayed layover duration
                                                                const showLayover =
                                                                    innerIndex > 0 &&
                                                                    route?.duration_layover !== routeData[innerIndex - 1]?.duration_layover;

                                                                return (
                                                                    <>

                                                                        <div className="pop_main_bo flex_props">

                                                                            {index === chunkRoundData.length - 1 && innerIndex === routeData.length - 1

                                                                                ? <>
                                                                                    <div className='hei_pop pop_time_all'>

                                                                                        {route && (() => {
                                                                                            const departure = getTimeAndDate(route?.local_arrival);
                                                                                            return (
                                                                                                <div className="">
                                                                                                    <p className="num_de">
                                                                                                        {departure.time}
                                                                                                    </p>
                                                                                                    <p className="num_de"> {departure.date}</p>
                                                                                                </div>
                                                                                            );
                                                                                        })()}

                                                                                    </div>

                                                                                </>
                                                                                // Check if it's the last index
                                                                                : <>

                                                                                    <div className='hei_pop pop_time_all'>


                                                                                        {route && (() => {
                                                                                            const departure = getTimeAndDate(route?.local_departure);
                                                                                            return (

                                                                                                <div>
                                                                                                    <p className="num_de">{departure.time}</p>
                                                                                                    <p className='num_de'>{departure.date}</p>
                                                                                                </div>

                                                                                            );
                                                                                        })()}


                                                                                    </div>

                                                                                </>}


                                                                            {/* {innerIndex >= 0 && innerIndex < 1 && (

)} */}

                                                                            <div >

                                                                                <span className="pop_stopss"></span>

                                                                            </div>




                                                                            <div className="hei_pop pop_dess">

                                                                                {index === chunkRoundData.length - 1 && innerIndex === routeData.length - 1

                                                                                    ? <>
                                                                                        <div className='pop_dess1'>
                                                                                            <p className="num_de">{route?.cityTo} ({route?.cityCodeTo})</p>
                                                                                            <p className="num_de">Flight No. {route?.flight_no} </p>
                                                                                            <p className="num_de">
                                                                                                {Math.floor(route?.durationInMinutes / 60)}h:{route?.durationInMinutes % 60}m
                                                                                            </p>

                                                                                        </div>

                                                                                    </>
                                                                                    // Check if it's the last index
                                                                                    : <>
                                                                                        <div className='pop_dess1'>
                                                                                            <p className="num_de">{route?.cityFrom} ({route?.cityCodeFrom})</p>
                                                                                            <p className="num_de">Flight No : {route?.flight_no} </p>
                                                                                            <p className="num_de">
                                                                                                {Math.floor(route?.durationInMinutes / 60)}h:{route?.durationInMinutes % 60}m
                                                                                            </p>
                                                                                        </div>


                                                                                    </>}


                                                                            </div>


                                                                            <div className="hei_pop pop_dess">
                                                                                {innerIndex >= 0 && innerIndex < 1 && (

                                                                                    <div className='pop_dess1'>
                                                                                        <p className="num_de">{route?.airlineName}</p>
                                                                                        <p className="num_de"> {route?.airline} - {route?.flight_no}</p>
                                                                                        <p className='num_de num_de1 my-1'>Operated by {route?.airline}</p>
                                                                                        <p className="num_de class_c">
                                                                                            Class - {(() => {
                                                                                                switch (route?.fare_category) {
                                                                                                    case 'M':
                                                                                                        return 'Economy';
                                                                                                    case 'W':
                                                                                                        return 'Premium Economy';
                                                                                                    case 'C':
                                                                                                        return 'Business';
                                                                                                    case 'F':
                                                                                                        return 'First';
                                                                                                    default:
                                                                                                        return 'Unknown Class';
                                                                                                }
                                                                                            })()}
                                                                                        </p>

                                                                                    </div>

                                                                                )}


                                                                            </div>

                                                                        </div>

                                                                        <div
                                                                            className={`lay_over_c relative lay_over_c_pop ${!showLayover ? "hidden" : ""
                                                                                }`}
                                                                            key={`${index}-${innerIndex}`}
                                                                        >
                                                                            <span>Layover: </span>
                                                                            {index >= 0 &&
                                                                                index < chunkRoundData.length - 1 &&
                                                                                showLayover && (
                                                                                    <span>Layover: {formatDuration(route?.duration_layover)}</span>
                                                                                )}
                                                                        </div>
                                                                    </>
                                                                );
                                                            })}
                                                        </div>



                                                    </>
                                                ))}

                                            </>
                                        );


                                    })()}
                                </>

                            )}

                            {/* <div className="pop_main_bo flex_props">

                                <div className='hei_pop pop_time_all'>
                                    <div>
                                        <p className="num_de">4:55 am</p>
                                        <p className="num_de num_de1">28 Jan 2022</p>
                                    </div>
                                    <div>
                                        <p className="num_de">4:55 am</p>
                                        <p className="num_de num_de1">28 Jan 2022</p>
                                    </div>
                                </div>

                                <div className='hei_pop pop_stop_mainm'>
                                    <span className="pop_stopss"></span>

                                </div>
                                <div className="hei_pop pop_dess">
                                    <div className='pop_dess1'>
                                        <p className="num_de">Los Angeles Intl Airport (LAX)</p>
                                        <p className='num_de num_de1'>Los Angeles, United States of America</p>
                                    </div>
                                    <div className="pop_dess2">
                                        <p className="flight_pop_gr">Flight duration: <b>05h 00min</b> | Flight number: <b>AA 1622</b></p>
                                        <p className='num_de num_de1'>Los Angeles, United States of America</p>
                                    </div>
                                    <div className='pop_dess1'>
                                        <p className="num_de">Los Angeles Intl Airport (LAX)</p>
                                        <p className='num_de num_de1'>Los Angeles, United States of America</p>
                                    </div>
                                </div>
                                <div className="hei_pop pop_dess">
                                    <div className='pop_dess1'>
                                        <p className="num_de">American Airlines</p>
                                        <p className='num_de num_de1 my-1'>Operated by AA</p>
                                        <p className="num_de class_c">Class - Economy</p>
                                    </div>


                                </div>
                            </div> */}

                            {tripType == "roundtrip" && (

                                <div className="pop_headd">
                                    Return :  {destination} |  {flight?.cityTo}
                                </div>


                            )

                            }




                            {flight?.inboundFlights && (

                                <>
                                    {(() => {
                                        const routeArray = Object.values(flight.inboundFlights);

                                        const chunkArray = (array, chunkSize) => {
                                            if (chunkSize <= 1) {
                                                throw new Error("Chunk size must be greater than 1");
                                            }

                                            const chunks = [];
                                            let i = 0;

                                            while (i < array.length) {
                                                let chunk = array.slice(i, i + chunkSize);

                                                if (i + chunkSize > array.length) {
                                                    const lastElement = chunk[chunk.length - 1];
                                                    while (chunk.length < chunkSize) {
                                                        chunk.push(lastElement);
                                                    }
                                                }

                                                chunks.push(chunk);

                                                i += chunkSize - 1;
                                            }

                                            return chunks;
                                        };

                                        const chunkRoundData = chunkArray(routeArray, 2);

                                        return (
                                            <>
                                                {chunkRoundData.map((routeData, index) => (
                                                    <>

                                                        <div key={index} >
                                                            {routeData.map((route, innerIndex) => {
                                                                // Track the previously displayed layover duration
                                                                const showLayover =
                                                                    innerIndex > 0 &&
                                                                    route?.duration_layover !== routeData[innerIndex - 1]?.duration_layover;

                                                                return (
                                                                    <>

                                                                        <div className="pop_main_bo flex_props">

                                                                            {index === chunkRoundData.length - 1 && innerIndex === routeData.length - 1

                                                                                ? <>
                                                                                    <div className='hei_pop pop_time_all'>

                                                                                        {route && (() => {
                                                                                            const departure = getTimeAndDate(route?.local_arrival);
                                                                                            return (
                                                                                                <div className="">
                                                                                                    <p className="num_de">
                                                                                                        {departure.time}
                                                                                                    </p>
                                                                                                    <p className="num_de"> {departure.date}</p>
                                                                                                </div>
                                                                                            );
                                                                                        })()}

                                                                                    </div>

                                                                                </>
                                                                                // Check if it's the last index
                                                                                : <>

                                                                                    <div className='hei_pop pop_time_all'>


                                                                                        {route && (() => {
                                                                                            const departure = getTimeAndDate(route?.local_departure);
                                                                                            return (

                                                                                                <div>
                                                                                                    <p className="num_de">{departure.time}</p>
                                                                                                    <p className='num_de'>{departure.date}</p>
                                                                                                </div>

                                                                                            );
                                                                                        })()}


                                                                                    </div>

                                                                                </>}

                                                                            <div className='hei_pop pop_stop_mainm'>
                                                                                <span className="pop_stopss"></span>

                                                                            </div>


                                                                            <div className="hei_pop pop_dess">

                                                                                {index === chunkRoundData.length - 1 && innerIndex === routeData.length - 1

                                                                                    ? <>
                                                                                        <div className='pop_dess1'>
                                                                                            <p className="num_de">{route?.cityTo} ({route?.cityCodeTo})</p>
                                                                                            <p className="num_de">Flight No. {route?.flight_no} </p>
                                                                                            <p className="num_de">
                                                                                                {Math.floor(route?.durationInMinutes / 60)}h:{route?.durationInMinutes % 60}m
                                                                                            </p>

                                                                                        </div>

                                                                                    </>
                                                                                    // Check if it's the last index
                                                                                    : <>
                                                                                        <div className='pop_dess1'>
                                                                                            <p className="num_de">{route?.cityFrom} ({route?.cityCodeFrom})</p>
                                                                                            <p className="num_de">Flight No : {route?.flight_no} </p>
                                                                                            <p className="num_de">
                                                                                                {Math.floor(route?.durationInMinutes / 60)}h:{route?.durationInMinutes % 60}m
                                                                                            </p>
                                                                                        </div>


                                                                                    </>}


                                                                            </div>


                                                                            <div className="hei_pop pop_dess">
                                                                                {innerIndex >= 0 && innerIndex <= 1 && (

                                                                                    <div className='pop_dess1'>
                                                                                        <p className="num_de">{route?.airlineName}</p>
                                                                                        <p className="num_de"> {route?.airline} - {route?.flight_no}</p>
                                                                                        <p className='num_de num_de1 my-1'>Operated by {route?.airline}</p>
                                                                                        <p className="num_de class_c">
                                                                                            Class - {(() => {
                                                                                                switch (route?.fare_category) {
                                                                                                    case 'M':
                                                                                                        return 'Economy';
                                                                                                    case 'W':
                                                                                                        return 'Premium Economy';
                                                                                                    case 'C':
                                                                                                        return 'Business';
                                                                                                    case 'F':
                                                                                                        return 'First';
                                                                                                    default:
                                                                                                        return 'Unknown Class';
                                                                                                }
                                                                                            })()}
                                                                                        </p>

                                                                                    </div>

                                                                                )}


                                                                            </div>

                                                                        </div>

                                                                        <div
                                                                            className={`lay_over_c relative lay_over_c_pop ${!showLayover ? "hidden" : ""}`}
                                                                            key={`${index}-${innerIndex}`}
                                                                        >
                                                                            <span>Layover: </span>
                                                                            {index >= 0 &&
                                                                                index < chunkRoundData.length - 1 &&
                                                                                showLayover && (
                                                                                    <span>Layover: {formatDuration(route?.duration_layover)}</span>
                                                                                )}
                                                                        </div>

                                                                    </>
                                                                );
                                                            })}
                                                        </div>



                                                    </>
                                                ))}

                                            </>
                                        );


                                    })()}
                                </>

                            )}


                        </div >
                        {/* 
                        <div className="select_all_pop flex_props justify-content-between">
                            <div className="select_all_pop_i">
                                <p className='select_pprr'>{flight?.price_dropdown?.base_fare}</p>
                                <p className='font_14'> Price per 1 passenger </p>
                            </div>
                            <Link className='select_ff' to={`/flight-details/${flight?.id}`} state={{ flight, location }} >Select Fare <i className="fa-solid fa-circle-arrow-right"></i></Link>
                        </div> */}



                        {isListingPage && (

                            <div className="select_all_pop flex_props justify-content-between">
                                <div className="select_all_pop_i">
                                    <p className="select_pprr">{flight?.price_dropdown?.base_fare}</p>
                                    <p className="font_14">Price per 1 passenger</p>
                                </div>
                                <Link
                                    className="select_ff"
                                    to={`/flight-details/${flight?.id}`}
                                    state={{ flight, location }}
                                >
                                    Select Fare <i className="fa-solid fa-circle-arrow-right"></i>
                                </Link>
                            </div>

                        )}
                        {isBookingPage && (

                            <div className="select_all_pop flex_props justify-content-between">
                                <div className="select_all_pop_i ">
                                    <p className="select_pprr">{flight?.price_dropdown?.base_fare}</p>
                                    <p className="font_14">Price per 1 passenger</p>
                                </div>
                                <button className="select_ff" onClick={onClose}>

                                    Continue <i className="fa-solid fa-circle-arrow-right"></i>
                                </button>
                            </div>

                            // <button className="select_ff" style={{ display: 'none' }}>
                            //     {/* Button Hidden */}
                            // </button>
                        )}


                    </div>
                </section >
            </div >
        </>
    )
}