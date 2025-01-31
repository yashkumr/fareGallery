import React from 'react'
import OneWayLayover from '../DealsBox/OneWayLayover'
import RoundTripLayover from '../DealsBox/RoundTripLayover'

function Deals() {
    return (
        <div className="col-12 col-xl-7 remove_sp mt-1 mt-sm-3 mt-lg-4 mt-lg-0">

            <a href="#" className="res_f fw6">192 Results Found</a>
            <p className="fw6 title_fl mt-1 mt-sm-3 mb-0 mb-sm-2">242 results found
                All Airports (NYC) - McCarran International Airport (LAS)
                Sun, Jul 07, 2024 - Tue, Jul 16, 2024</p>
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
            <div className="flight_c remove_sp">

                {/* onewaytrip */}
                <div className="flight_listing">

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
                                            <p className="fw4 fl_tt">Deutsche Lufthansa AG <span>- 99234</span></p>

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
                                        <div>
                                            <p>Delhi(DEL) - <span className="time_1">23:35</span></p>
                                            <p className="font_12_date">27-Dec-2024</p>
                                        </div>
                                        <div className="text-center l_l_minus">
                                            <span className="line_l_l"></span>
                                            <p className="font_12_date">(28h 25m, 1 stops)</p>
                                        </div>
                                        <div className="text_end">
                                            <p>New York(JFK) - <span className="time_1">23:35</span></p>
                                            <p className="font_12_date">27-Dec-2024</p>
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className="fl_price d-flex align-items-end text-end flex-column fl_price_none">
                                <div className="d-flex start_price">
                                    <p className=""><del>$400.00</del> $350.00</p>
                                </div>
                                <div className="text-center control_stops2">
                                    <p>Roundtrip Per Traveler</p>
                                    <a href="#" className="book_btn2">Book Flight Now <i className="fa-solid fa-caret-right"></i></a>
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
                                        <div className="num_s white">03</div>
                                    </div>

                                </div>
                            </div>
                            <span>|</span>
                            <a href="#" className="view_detail_a">View More Details <i className="fa-solid fa-sort-down"></i></a>
                        </div>
                    </div>
                </div>

                {/* end onewaytrip */}

                {/* roundtrip */}
                <div className="flight_listing">

                    <div className="flight_list_c">

                        <div className="list_cont_c d-flex justify-content-between align-items-center">
                            <div className="w_cont">
                                <div className="fl_cont2 round_trip relative">
                                    <div className="depature_tab">Depart Details</div>
                                    <div className="fl_cont2_main flex_props justify-content-between">
                                        <div className="d-flex align-items-center gap-2 mb-1">
                                            <div className="fl_icon">
                                                <img src="/imgs/luf.png" />
                                            </div>
                                            <p className="fw4 fl_tt">Deutsche Lufthansa AG <span>- 99234</span></p>

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
                                        <div>
                                            <p>Delhi(DEL) - <span className="time_1">23:35</span></p>
                                            <p className="font_12_date">27-Dec-2024</p>
                                        </div>
                                        <div className="text-center l_l_minus">
                                            <span className="line_l_l"></span>
                                            <p className="font_12_date">(28h 25m, 1 stops)</p>
                                        </div>
                                        <div className="text_end">
                                            <p>New York(JFK) - <span className="time_1">23:35</span></p>
                                            <p className="font_12_date">27-Dec-2024</p>
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
                                            <p className="fw4 fl_tt">Deutsche Lufthansa AG <span>- 99234</span></p>

                                        </div>

                                    </div>
                                    <div className="d-flex gap-2 gap-sm-4 font_in mt-1 align-items-center">
                                        <div>
                                            <p>New York(JFK) - <span className="time_1">23:35</span></p>
                                            <p className="font_12_date">27-Dec-2024</p>
                                        </div>
                                        <div className="text-center l_l_minus">
                                            <span className="line_l_l"></span>
                                            <p className="font_12_date">(28h 25m, 1 stops)</p>
                                        </div>
                                        <div className="text_end">
                                            <p>Washington(WAS) - <span className="time_1">23:35</span></p>
                                            <p className="font_12_date">27-Dec-2024</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="fl_price d-flex align-items-end text-end flex-column fl_price_none">
                                <div className="d-flex start_price">
                                    <p className=""><del>$400.00</del> $350.00</p>
                                </div>
                                <div className="text-center control_stops2">
                                    <p>Roundtrip Per Traveler</p>
                                    <a href="#" className="book_btn2">Book Flight Now <i className="fa-solid fa-caret-right"></i></a>
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
                                        <div className="num_s white">03</div>
                                    </div>

                                </div>
                            </div>

                            <a href="#" className="view_detail_a">View More Details <i className="fa-solid fa-sort-down"></i></a>
                        </div>
                    </div>
                </div>
                {/* end roundtrip */}
                <OneWayLayover />
                <RoundTripLayover />
            </div>

        </div>
    )
}

export default Deals