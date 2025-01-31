import React, { useEffect, useState } from 'react'
import DatePicker from "react-multi-date-picker";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

const MainSearch = () => {

    const [value, setValue] = useState(new Date());
    const [valueTo, setValueTo] = useState(new Date());
    const [adult, setAdults] = useState(1);
    const [child, setChild] = useState(0);
    const [infant, setInfant] = useState(0);
    const [totalR, setRTotal] = useState(adult);
    const [pass, setPass] = useState(false);
    const [classR, setClassR] = useState('Economy');


    // vk code

    const [tripType, setTripType] = useState("oneWay"); // State to manage trip type
    const [keyword, setKeyword] = useState('DEL');
    const [locations, setLocations] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [showSuggestionsDest, setShowSuggestionsDest] = useState(false);

    const [dkeyword, setDkeyword] = useState('BLR');
    const [destinations, setDestinations] = useState([]);

    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7))
        .toISOString()
        .slice(0, 10));

    const [travellers, setTravellers] = useState({
        adults: 1,
        children: 0,
        infants: 0,
        class: "Economy",
    });

    const navigate = useNavigate();

    // origin
    const handleInputChange = async (event) => {
        const value = event.target.value;
        setKeyword(value);
        if (value.length >= 3) {
            try {
                const response = await axios.get(`/api/v1/flights/locations?keyword=${value}`);
                setLocations(response.data);
                // console.log(response.data);
                setShowSuggestions(true);

            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        }
    };
    const handleSuggestionClick = (location) => {
        setKeyword(location);

        setShowSuggestions(false);

    };
    // Destinations
    const handleInputChange2 = async (event) => {
        const value = event.target.value;
        setDkeyword(value);

        if (value.length >= 3) {

            try {
                const response = await axios.get(`/api/v1/flights/locations?keyword=${value}`);
                setDestinations(response.data);

                setShowSuggestionsDest(true);

            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        }
    };
    const handleSuggestionClick2 = (location) => {
        setDkeyword(location);


        setShowSuggestionsDest(false);

    };
    const handleTravellerChange = (type, value) => {

        setTravellers((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const handleClassChange = (classType) => {

        setTravellers((prev) => ({
            ...prev,
            class: classType,
        }));

    };



    const handleSearch = (event) => {
        event.preventDefault();

        setKeyword(event.target.keyword || keyword);
        setDkeyword(event.target.dkeyword || dkeyword);
        setDate(event.target.date || date);
        setReturnDate(event.target.returnDate || returnDate);

        // console.log("hello", keyword, dkeyword, date, returnDate);


        navigate(
            `/search-results?source=${keyword}&destination=${dkeyword}&date=${date}&rtnDate=${returnDate}&trpType=${tripType}&adults=${adult}&children=${child}&infants=${infant}&tpassenger=${totalR}&class=${classR}`
        );
    };


    useEffect(() => {
        setValueTo(value);
        setRTotal(() => {
            return adult + child + infant
        });
        const formCheckElements = document.querySelectorAll('.form_check_h label');

        const handleClick = (formCheckElement) => {
            setClassR(formCheckElement.innerHTML);
        };

        formCheckElements.forEach((formCheck1) => {
            formCheck1.addEventListener('click', () => handleClick(formCheck1));
        });

        return () => {
            formCheckElements.forEach((formCheck1) => {
                formCheck1.removeEventListener('click', () => handleClick(formCheck1));
            });
        };

    }, [value, adult, child, infant, classR])
    return (
        <>
            <div className="col-12 col-lg-11 mt-4 m-auto">
                <div className="row">
                    <div className="col-12">
                        <div className="tabb_bt flex_props">
                            <button
                                className={tripType === "oneWay" ? "selected" : ""}
                                onClick={() => setTripType("oneWay")}
                            >
                                <img src="imgs/dot-i.png" alt="dot" />
                                One Way</button>

                            <button
                                onClick={() => setTripType("roundtrip")}
                                className={tripType === "roundtrip" ? "active" : ""}
                            >
                                <img src="imgs/dot-i.png" alt="dot-icon" /> Round Way
                            </button>
                        </div>
                    </div>

                </div>

                <form onSubmit={handleSearch}>

                    <div className="row form_search_us align-items-center">

                        <div className="col-6 col-md-3 col-lg-2 form_search_us_m relative">
                            <div className="form_search_c">
                                <label htmlFor=""><img src="imgs/loc-iii.png" /> From</label>
                                <input type="text" value={keyword} onChange={handleInputChange} className="form-control" required />


                                <p className="small_de">City Or Airport</p>
                                <div className="listing_airport_ul">
                                    {showSuggestions && (
                                        <ul className='autoSugge-ul'>
                                            {locations.map((location) => (
                                                <>
                                                    <li className='autoSuggestData cursor-pointer' onClick={() => handleSuggestionClick(location)}>
                                                        <span className="listing_airport_icon">
                                                            <img src="/imgs/airline-img.png" />
                                                        </span>
                                                        <span>{location}</span>
                                                    </li>
                                                </>
                                            ))}
                                        </ul>

                                    )}
                                </div>
                            </div>

                            <div className="swap_bt">
                                <img src="imgs/swap-ar.png" />
                            </div>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2 form_search_us_m relative">
                            <div className="form_search_c">
                                <label htmlFor=""><img src="imgs/loc-iii.png" /> To</label>
                                <input type="text" value={dkeyword} onChange={handleInputChange2} className="form-control" required />



                                <p className="small_de">City Or Airport</p>
                                <div className="listing_airport_ul">
                                    {showSuggestionsDest && (
                                        <ul className='autoSugge-ul'>
                                            {destinations.map((location) => (
                                                <>
                                                    <li className='autoSuggestData cursor-pointer' onClick={() => handleSuggestionClick2(location)}>
                                                        <span className="listing_airport_icon">
                                                            <img src="/imgs/airline-img.png" />
                                                        </span>
                                                        <span>{location}</span>
                                                    </li>
                                                </>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>



                        </div>

                        <div className="col-6 col-md-3 col-lg-2 form_search_us_m">
                            <div className="form_search_c">
                                <label htmlFor='dDate'><img src="/imgs/loc-iii.png" /> Depature</label>
                                {/* <input
                                    type="date"
                                    id='dDate'
                                    name='dDate'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    format="MMM-DD-YYYY"
                                    required
                                /> */}
                                <DatePicker value={date} onChange={setDate} minDate={new Date()} />
                                <p className="small_de">MMM/DD/YYYY</p>
                            </div>
                        </div>

                        {
                            tripType === "roundtrip" ? (

                                <div className="col-6 col-md-3 col-lg-2 form_search_us_m">
                                    <div className="form_search_c">
                                        <label htmlFor=""><img src="/imgs/loc-iii.png" /> Return</label>
                                        {/* <input
                                            type="date"
                                            value={returnDate}
                                            onChange={(e) => setReturnDate(e.target.value)}
                                        /> */}
                                        <DatePicker value={returnDate} onChange={setReturnDate} minDate={new Date()} />
                                        <p className="small_de">MMM/DD/YYYY</p>
                                    </div>
                                </div>

                            ) : (

                                <div className="col-6 col-md-3 col-lg-2 form_search_us_m">
                                    <div className="form_search_c">
                                        <label htmlFor=""><img src="/imgs/loc-iii.png" /> Return</label>
                                        {/* <input
                                            className="form-check-input mt-2"
                                            type="date"
                                            name="tripType"
                                            id="roundtrip"
                                            value={returnDate}
                                            checked={tripType === "roundtrip"}
                                            onChange={(e) => {
                                                setTripType("roundtrip");
                                                setReturnDate(e.target.value);
                                            }}
                                        /> */}
                                        <DatePicker id="roundtrip" name="tripType" checked={tripType === "roundtrip"} value={returnDate} onChange={setReturnDate} minDate={new Date()} />

                                        <p className="small_de">MMM/DD/YYYY</p>
                                    </div>
                                </div>

                            )
                        }

                        <div className="col-6 col-md-3 col-lg-2 form_search_us_m">
                            <div className="form_h_semi form_h_semi222 input_aa inpt_aa_flight inpt_aa_flight_flight">
                                <label htmlFor="">
                                    <img src="/imgs/loc-iii.png" alt="Traveller Icon" /> Traveller's
                                </label>
                                <div
                                    className="pass_all_main"
                                    onClick={() => {
                                        setPass(!pass);
                                    }}
                                >
                                    <div className="pass_inn">
                                        <span className="pass_numm1 pass_numm1_flight">{totalR}</span>
                                        Passenger
                                    </div>
                                    <p className="className_holdd color-grey">{classR}</p>
                                    <input type="hidden" name="adt" value={adult} id="adult" />
                                    <input type="hidden" name="chd" value={child} id="child" />
                                    <input type="hidden" name="inf" value={infant} id="infant" />
                                </div>
                                <div
                                    className={
                                        pass
                                            ? "passenger_modal passenger_modal_flight passenger_modal_active"
                                            : "passenger_modal passenger_modal_flight"
                                    }
                                >
                                    <button
                                        className="close_bb_modd close_bb_modd_flight"
                                        onClick={() => {
                                            setPass(!pass);
                                        }}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                    <div className="passenger_mod_main">
                                        {/* Adults */}
                                        <div className="pass_container_1">
                                            <p className="pass_para_p">
                                                <span className="para1_mod_title">Adults - </span>
                                                <span className="add_cont add_cont_flight">{adult}</span>
                                            </p>
                                            <div className="pass_btnss d-flex">
                                                <div
                                                    className="adult_min adult_min_flight pass_btnssbt"
                                                    onClick={() => {
                                                        setAdults((prev) => (prev > 1 ? prev - 1 : prev));
                                                    }}
                                                >
                                                   <FiMinus />
                                                </div>
                                                <div
                                                    className="adult_add adult_add_flight pass_btnssbt"
                                                    onClick={() => {
                                                        setAdults((prev) => prev + 1);
                                                    }}
                                                >
                                                    <FaPlus />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Children */}
                                        <div className="pass_container_1">
                                            <p className="pass_para_p">
                                                <span className="para1_mod_title">Children - </span>
                                                <span className="add_cont_child add_cont_child_flight">{child}</span>
                                            </p>
                                            <p className="color-grey font_cs">2- 12 Years</p>
                                            <div className="pass_btnss d-flex">
                                                <div
                                                    className="add_child_min add_child_min_flight pass_btnssbt"
                                                    onClick={() => {
                                                        setChild((prev) => (prev > 0 ? prev - 1 : prev));
                                                    }}
                                                >
                                                   <FiMinus />
                                                </div>
                                                <div className="add_child_add add_child_add_flight pass_btnssbt"
                                                    onClick={() => {
                                                        setChild((prev) => (prev < 10 ? prev + 1 : prev));
                                                    }}
                                                >
                                                   <FaPlus />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Infants */}
                                        <div className="pass_container_1">
                                            <p className="pass_para_p">
                                                <span className="para1_mod_title">Infants - </span>
                                                <span className="add_cont_inf add_cont_inf_flight">{infant}</span>
                                            </p>
                                            <p className="color-grey font_cs">0- 23 Months</p>
                                            <div className="pass_btnss d-flex">
                                                <div
                                                    className="add_inf_min_flight pass_btnssbt"
                                                    onClick={() => {
                                                        setInfant((prev) => (prev > 0 ? prev - 1 : prev));
                                                    }}
                                                >
                                                   <FiMinus />
                                                </div>
                                                <div
                                                    className="add_inf_add add_inf_add_flight pass_btnssbt"
                                                    onClick={() => {
                                                        setInfant((prev) => (prev < 2 ? prev + 1 : prev));
                                                    }}
                                                >
                                                   <FaPlus />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Class Selection */}
                                    <div className="form_check_h">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="cabin"
                                                id="flexRadioDefault1"
                                                value="Economy"
                                                checked={classR === "Economy"}
                                                onChange={() => setClassR("Economy")}
                                            />
                                            <label
                                                className="form-check-label form_h_semi2222"
                                                htmlFor="flexRadioDefault1"
                                            >
                                                Economy
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="cabin"
                                                id="flexRadioDefault2"
                                                value="Premium Economy"
                                                checked={classR === "Premium Economy"}
                                                onChange={() => setClassR("Premium Economy")}
                                            />
                                            <label
                                                className="form-check-label form_h_semi2222"
                                                htmlFor="flexRadioDefault2"
                                            >
                                                Premium Economy
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="cabin"
                                                id="flexRadioDefault3"
                                                value="Business"
                                                checked={classR === "Business"}
                                                onChange={() => setClassR("Business")}
                                            />
                                            <label
                                                className="form-check-label form_h_semi2222"
                                                htmlFor="flexRadioDefault3"
                                            >
                                                Business
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        className="appl_btn appl_btn_flight"
                                        type="button"
                                        onClick={() => {
                                            setPass(!pass);
                                        }}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-md-3 col-lg-2 form_search_us_m">
                            <div className="form_search_c">
                                <button className='' type='submit'>Search Flights <img src="imgs/search-a.png" /> </button>
                            </div>
                        </div>

                    </div>

                </form>

            </div>

            <div className="col-12 col-lg-11 m-auto margin_tt">
                <div className="row white">
                    <div className="col-12 col-md-6">
                        <div className="d-flex align-items-center check_boxx">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Direct Flights
                                </label>
                            </div>
                            <span className="line_sss"></span>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Defence Fare

                                </label>
                            </div>
                            <span className="line_sss"></span>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3" />
                                <label className="form-check-label" htmlFor="flexCheckDefault3">
                                    Student Fare
                                </label>
                            </div>
                            <span className="line_sss"></span>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked4" />
                                <label className="form-check-label" htmlFor="flexCheckChecked4">
                                    Senior Citizen Fare
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 text-center text-md-end mt-2 mt-md-0 d-none d-md-block">
                        <p className="last_tt">From Dreams to Destination - Book Your Tickets Today</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainSearch