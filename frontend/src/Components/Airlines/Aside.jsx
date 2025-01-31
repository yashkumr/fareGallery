import React from 'react'

function Aside() {
    return (
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
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="title_fl fw6 mb-0 letter">Stop</p>
                        <p className="fw6 font_12 letter">RESET</p>
                    </div>
                    <hr className="hr_c" />
                    <div className="gr_f">
                        <div className="form-check form_check">

                            <label className="form-check-label" for="flexCheckDefault">
                                <div>
                                    <input className="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault" />
                                    <p className="check_ti">Non-stop</p>
                                </div>
                                <div className="price_check">
                                    $2048
                                </div>
                            </label>
                        </div>
                        <div className="form-check form_check">

                            <label className="form-check-label" for="flexCheckDefault2">
                                <div>
                                    <input className="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault2" />
                                    <p className="check_ti">1 Stop</p>
                                </div>
                                <div className="price_check">
                                    $4048
                                </div>
                            </label>
                        </div>
                        <div className="form-check form_check">

                            <label className="form-check-label" for="flexCheckDefault2more">
                                <div>
                                    <input className="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault2more" />
                                    <p className="check_ti">1+ Stop</p>
                                </div>
                                <div className="price_check">
                                    $2048
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <hr className="hr_c" />
                <div className="price_range">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="title_fl fw6 mb-0 letter">Price</p>
                        <p className="fw6 font_12 letter">Range</p>
                    </div>
                    <label for="customRange1" className="form-label mt-1 mb-0 d-flex justify-content-between range_r">
                        <p>₹44564.95</p>
                        <p>₹544564.95</p>
                    </label>
                    <input type="range" className="form-range" id="customRange1" />
                </div>

                <div className="depart_cont mt-0 mt-sm-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="title_fl fw6 mb-0 letter">Depart from McCarran</p>

                    </div>
                    <div className="time_de mt-0 mt-sm-3">
                        <div className="time_de_cont text-center">
                            <img src="imgs/sunrise.png" />
                            <div>
                                <p className="fw5 font_14">Early Morning</p>
                                <p className="font_13">12AM - 5:59AM</p>
                            </div>
                        </div>
                        <div className="time_de_cont text-center">
                            <img src="imgs/morning-icon.png" />
                            <div>
                                <p className="fw5 font_14"> Morning</p>
                                <p className="font_13">6AM - 11:59AM</p>
                            </div>
                        </div>
                        <div className="time_de_cont text-center">
                            <img src="imgs/add-sun.png" />
                            <div>
                                <p className="fw5 font_14">Afternoon</p>
                                <p className="font_13">12PM - 5:59PM</p>
                            </div>
                        </div>
                        <div className="time_de_cont text-center">
                            <img src="imgs/evv.png" />
                            <div>
                                <p className="fw5 font_14">Evening</p>
                                <p className="font_13">6PM - 11:59PM</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="hr_c" />
                <div className="depart_cont mt-0 mt-sm-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="title_fl fw6 mb-0 letter">Return from Dubai, AE</p>

                    </div>
                    <div className="time_de mt-0 mt-sm-3">
                        <div className="time_de_cont text-center">
                            <img src="imgs/sunrise.png" />
                            <div>
                                <p className="fw5 font_14">Early Morning</p>
                                <p className="font_13">12AM - 5:59AM</p>
                            </div>
                        </div>
                        <div className="time_de_cont text-center">
                            <img src="imgs/morning-icon.png" />
                            <div>
                                <p className="fw5 font_14"> Morning</p>
                                <p className="font_13">6AM - 11:59AM</p>
                            </div>
                        </div>
                        <div className="time_de_cont text-center">
                            <img src="imgs/add-sun.png" />
                            <div>
                                <p className="fw5 font_14">Afternoon</p>
                                <p className="font_13">12PM - 5:59PM</p>
                            </div>
                        </div>
                        <div className="time_de_cont text-center">
                            <img src="imgs/evv.png" />
                            <div>
                                <p className="fw5 font_14">Evening</p>
                                <p className="font_13">6PM - 11:59PM</p>
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
                        <div className="form-check form_check">

                            <label className="form-check-label" for="flexCheckDefaultam">
                                <div>
                                    <input className="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefaultam" />
                                    <p className="check_ti">
                                        <img src="imgs/a-icon.png" />
                                        American Airlines

                                    </p>
                                </div>
                                <div className="price_check">
                                    $2048
                                </div>
                            </label>
                        </div>
                        <div className="form-check form_check">

                            <label className="form-check-label" for="flexCheckDefaultgu">
                                <div>
                                    <input className="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefaultgu" />
                                    <p className="check_ti">
                                        <img src="imgs/g-icon.png" />
                                        Gulf Airlines

                                    </p>
                                </div>
                                <div className="price_check">
                                    $2048
                                </div>
                            </label>
                        </div>
                        <div className="form-check form_check">

                            <label className="form-check-label" for="fleexCheckDefaulteth">
                                <div>
                                    <input className="form-check-input" type="checkbox" value=""
                                        id="fleexCheckDefaulteth" />
                                    <p className="check_ti">
                                        <img src="imgs/a-icon.png" />
                                        Etihad Airways
                                    </p>
                                </div>
                                <div className="price_check">
                                    $2048
                                </div>
                            </label>
                        </div>
                        <div className="form-check form_check">

                            <label className="form-check-label" for="flexCheckDefaulttur">
                                <div>
                                    <input className="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefaulttur" />
                                    <p className="check_ti">
                                        <img src="imgs/g-icon.png" />
                                        Turkish Airlines
                                    </p>
                                </div>
                                <div className="price_check">
                                    $2048
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aside