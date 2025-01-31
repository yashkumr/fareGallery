import React from 'react'
import { useLocation } from 'react-router-dom';

function Searching() {

    const location = useLocation();

    const paramNames = ["adults", "infants", "children", "source", "destination", "date","classes"];
    const params = new URLSearchParams(location?.search);


    const { adults: adults, infants: infants, children: children, source: source, destination: destination, date:date } = Object.fromEntries(
        paramNames.map((key) => [key, params.get(key)])
    );


    const originCode = source.split('-')[0];
    const originAirport = source.substring(source.indexOf('-') + 1);

    const destCode = destination.split('-')[0];
    const destAirport = destination.substring(destination.indexOf('-') + 1);



    return (
        <>
           
            <section className="container-fluid container-xl ">
                <div className="row common_padding">
                    <div className="col-12 col-xl-8 text-center m-auto bg_search_cheap mt-0">
                        <h4 className='search_tt'>Searching Cheapest Flights for you...</h4>

                        <div className="search_contt flex_prop justify-content-between">
                            <div className='search_bb'>
                                <p className='search_code'>{originCode}</p>
                                {/* <p className='search_country'>{source}</p> */}
                                <p className='search_airport'>{originAirport}</p>
                            </div>
                            <span className="loader"></span>
                            <div className='search_bb'>
                                <p className='search_code'>{destCode}</p>
                                {/* <p className='search_country'>{destination}</p> */}
                                <p className='search_airport'>{destAirport}</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className='dates_all'>{date} , {adults}:Adults, {infants}:Infants, {children}:children </p>
                        </div>
                        <div className="mt-4">
                            <a className="num_n flex_props justify-content-center gap-2" href="tel:+44 800 520 0069">
                                <img src="/imgs/ph-i.png" />
                                <div>
                                    Call Only Deals |  +44 800 520 0069
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            


        </>
    )
}

export default Searching