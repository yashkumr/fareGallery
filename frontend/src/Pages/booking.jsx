import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { CurrencyContext } from '../context/CurrencyContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"
import { Pop } from '../Components/Airlines/Pop';

function Booking() {

    

    const [bookingPop, setBookingPop] = useState(false)
    const [selectedFlight, setSelectedFlight] = useState(null);
    const { currency, convertPrice } = useContext(CurrencyContext);
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobile: "",
        dob: "",
        cardHolderName: "",
        cardNumber: "",
        cardDetails: "",
        address: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
    });
    const [step, setStep] = useState(1);
    const [popup, setPopup] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const flight = location.state?.flight || [];
    console.log(flight);



    // console.log(searchData?.split('&')[0].split('=')[1]);
    const paramNames = ["adults", "infants", "children", "source", "destination"];
    const params = new URLSearchParams(location?.state?.location?.search);


    const { adults: adt, infants: ift, children: chd, source: src, destination: dest } = Object.fromEntries(
        paramNames.map((key) => [key, params.get(key)])
    );

    // console.log(adults, infants,children,source,destination)

    const originCode = src?.split('-')[0];
    const originAirport = src?.substring(src?.indexOf('-') + 1);

    const destCode = dest?.split('-')[0];
    const destAirport = dest?.substring(dest?.indexOf('-') + 1);

    useEffect(()=>{
                     
    }, [])




    const grandTotal = Number(convertPrice(flight?.fare?.adults * adt, currency)) + Number(convertPrice(flight?.fare?.infants * ift, currency)) + Number(convertPrice(flight?.fare?.children * chd, currency));


    // {convertPrice(flight?.fare?.adults, currency)}



    // Handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });


    };

    const validateForm = () => {
        const { email, cardNumber, expiryDate, cardDetails, cardHolderName } = formData;


        // Email validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        // Card number validation
        if (!/^\d{16}$/.test(cardNumber)) {
            toast.error("Card number must be 16 digits.");
            return false;
        }

        // Expiry date validation (MM/YY)
        // if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        //     toast.error("Expiry date must be in MM/YY format.");
        //     return false;
        // }

        // Security code validation
        if (!/^\d{3}$/.test(cardDetails)) {
            toast.error("Security code must be 3 digits.");
            return false;
        }

        // Cardholder name validation
        if (!cardHolderName.trim()) {
            toast.error("Cardholder name is required.");
            return false;
        }

        return true;
    };
        //   const adtTotal = flight?.price_dropdown?.base_fare / (adt + ift + chd)

        //   console.log(adtTotal);

    const finalData = { ...formData, flight, grandTotal, adt, ift, chd };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (validateForm()) {

                const { data } = await axios.post('/api/v1/flights/travel/getbill', finalData);
                console.log(data);
                toast.success(data.message || "Form submitted successfully!");
                navigate("/thankyou");
                
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error("Failed to submit the form. Please try again.");

        };

    }


    const getTimeAndDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return {
            time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: date.toLocaleDateString(),
        };
    };
    const showFlightDetails = (flight) => {
        setSelectedFlight(flight); // Set the selected flight data
        setBookingPop(true);
    };

    const closePopup = () => {
        setBookingPop(false);
        setSelectedFlight(null);
    };

    return (
        <>

            <Layout title="Faresgallery" description="welcome to Faresgallery" >


                <form className='listing_body' onSubmit={handleSubmit}>

                    <section className="banner_booking">
                        <div className="container-fluid container-xl">
                            <div className="row">
                                <div className="col-12 flex_me">
                                    <div>
                                        <p className='bagde_cust flex_prop justify-content-center'>
                                            <div className="badge_icon">
                                                <img src="/imgs/right-chevron.png" />
                                            </div>
                                            Payment and booking</p>
                                    </div>
                                    <div className='price_summ'>
                                        <p className='total_prr'>Total Price Summary</p>
                                        <p className='price_tit'>
                                            <img src="/imgs/down-ar.png" />
                                            900.00 <span className='color_redd'>USD</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="booking_cont container-fluid container-xl py-4 py-sm-5">
                        <div className="row justify-content-center common_padding">

                            <div className="col-12 col-lg-9 col-xl-8 pe-0 pe-lg-3" >
                                <div className="boking_header" >
                                    <div className="booking_main">
                                        <p className='booking_title'>
                                            <div className="book_semi1">
                                                <img src="/imgs/personal-icon.png" />
                                                Personal Details
                                            </div>
                                            <span>(Fill the below information)</span></p>
                                        <div className="mt-4 booking_main_m">
                                            <div className="row form_booking_f">
                                                <div className="col-6">
                                                    <div className="form_booking">
                                                        <label htmlFor="">First name <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" id="firstName" value={formData.firstName}
                                                                onChange={handleInputChange}
                                                                required placeholder='Enter Your Name' className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Last name <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder='Enter Your Name' className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="row form_booking">
                                                        <div className="col-12">
                                                            <label htmlFor="">Date of birth <span>*</span></label>
                                                        </div>
                                                        <div className="col-12 form_input_minus_m">
                                                            <div className="row">
                                                                {/* <div className="col-3 col-sm-2">
                                                                    <div className="form_input form_input_minus">
                                                                        <input type="text"  className='form-control' placeholder='DD' maxLength={3} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="form_input form_input_minus">
                                                                        <select name="" className='form-select form-control'>
                                                                            <option value="">January</option>
                                                                            <option value="">February</option>
                                                                            <option value="">March</option>
                                                                            <option value="">April</option>
                                                                            <option value="">May</option>
                                                                            <option value="">June</option>
                                                                            <option value="">July</option>
                                                                            <option value="">August</option>
                                                                            <option value="">September</option>
                                                                            <option value="">October</option>
                                                                            <option value="">November</option>
                                                                            <option value="">December</option>
                                                                        </select>
                                                                    </div>
                                                                </div> */}
                                                                <div className="col-12 col-sm-12">
                                                                    <div className="form_input form_input_minus">
                                                                        <input type="date" id="dob" value={formData.dob} onChange={handleInputChange} required placeholder='YYYY' className='form-control' maxLength={4} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Title <span>*</span></label>
                                                        <div className="form_input">
                                                            <select name="" id="middleName" value={formData.middleName} onChange={handleInputChange} required className='form-select form-control'>
                                                                <option value="mr">Mr.</option>
                                                                <option value="mrs. /miss /ms.">Mrs. / Miss / Ms.</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="booking_main booking_main1">
                                        <p className='booking_title'>
                                            <div className="book_semi1">
                                                <img src="/imgs/adult-icon.png" />
                                                Contact Details </div>  <span>(Enter your email and phone number and we will send you a booking confirmation with all the details)</span></p>
                                        <div className="mt-4 booking_main_m">
                                            <div className="row form_booking_f">
                                                <div className="col-6">
                                                    <div className="form_booking">
                                                        <label htmlFor="">E-mail <span>*</span></label>
                                                        <div className="form_input">

                                                            <input type="tesxt" id="email" value={formData.email} onChange={handleInputChange} required placeholder='Enter Your Email' className='form-control' />

                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-6">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Re-enter e-mail * <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" placeholder='Enter Your Email' className='form-control' />
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div className="col-6">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Phone number <span>*</span></label>
                                                        <div className="form_input">
                                                            <input
                                                                type="Number"
                                                                maxLength="10"
                                                                id="mobile"
                                                                value={formData.mobile}
                                                                onChange={handleInputChange}
                                                                required
                                                                placeholder="Enter Your Number"
                                                                className="form-control"
                                                                pattern="\d*" // Allows only numbers
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-6">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Alternate Phone number <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" placeholder='Enter Your Number' className='form-control' />
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="booking_main booking_main1">
                                        <p className='booking_title'>
                                            <div className="book_semi1">
                                                <img src="/imgs/pay-icon.png" />
                                                Payment Details </div> <span>(
                                                    lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum tempore nemo obcaecati )</span></p>
                                        <div className="mt-4 booking_main_m">
                                            <div className="row form_booking_f">
                                                <div className="col-12">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Card Number <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="number" id="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required className='form-control' maxLength={16} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Expiry date <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="date" id="expiryDate" placeholder='Enter Your Email' className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Security code <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" id="cardDetails" value={formData.cardDetails} onChange={handleInputChange} required placeholder='Enter Your Number' className='form-control' maxLength={3} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Card Holder Name <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" id="cardHolderName" value={formData.cardHolderName} onChange={handleInputChange} required placeholder='Enter Your Number' className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="booking_main booking_main1">
                                        <p className='booking_title'>
                                            <div className="book_semi1">
                                                <img src="/imgs/bill-payment.png" />
                                                Billing Details </div> <span>(
                                                    lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum tempore nemo obcaecati )</span></p>
                                        <div className="mt-4 booking_main_m">
                                            <div className="row form_booking_f">
                                                <div className="col-12 col-sm-9">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Country <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" id="country" value={formData.country} onChange={handleInputChange} required className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-3">
                                                    <div className="form_booking">
                                                        <label htmlFor="">ZIP/Postal code <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" id="postalCode" value={formData.postalCode} onChange={handleInputChange} required className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-9">
                                                    <div className="form_booking">
                                                        <label htmlFor="">City <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" id="city" value={formData.city} onChange={handleInputChange} required className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-3">
                                                    <div className="form_booking">
                                                        <label htmlFor="">State <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" id="state" value={formData.state} onChange={handleInputChange} required className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form_booking">
                                                        <label htmlFor="">Street <span>*</span></label>
                                                        <div className="form_input">
                                                            <input type="text" id="address" value={formData.address} onChange={handleInputChange} required className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form_booking">
                                                        <label htmlFor="">House / apartment no.</label>
                                                        <div className="form_input">
                                                            <input type="text" id="apartment" className='form-control' />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-8 col-lg-9">
                                            <div className="form_booking">
                                                <p className="secure_tit flex_props gap-2">
                                                    <img src="/imgs/protect.png" />
                                                    Secure payment Highest standards of security for card payments</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4 col-lg-3">
                                            <div className="form_booking">
                                                <button type="submit" value="submit" className="book_btn_booking">Book Ticket Now <i className="fa-solid fa-arrow-right-to-bracket"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-3 ps-0 ps-lg-3 price_bg">
                                <button className="close_price_sum">
                                    <i className="fa-solid fa-xmark"></i>
                                    Travel Details

                                </button>

                                <div className="pass_detail_price p-0">
                                    <div className="pass_de_cont p-0 pass_de_cont_h relative flex_props">
                                        <h4 className='price_s'>Flight information</h4>
                                        {/* <button className='viw_d' onClick={() => showFlightDetails(flight)}>View details</button> */}

                                    </div>
                                    <div className="flex_props booking_flight_d">
                                        <div className='hei_pop pop_time_all'>

                                            {Object.values(flight?.route)?.[0] && (() => {
                                                const firstRoute = Object.values(flight?.route)?.[0];
                                                const departure = getTimeAndDate(firstRoute?.local_departure);
                                                return (

                                                    <div>
                                                        <p className="num_de">{departure.time}</p>
                                                        <p className="num_de num_de1">{departure.date}</p>
                                                    </div>

                                                );
                                            })()}



                                            {Object.values(flight?.route)?.[Object.values(flight?.route).length - 1] && (() => {
                                                const lastRoute = Object.values(flight?.route)?.[Object.values(flight?.route).length - 1];
                                                const arrival = getTimeAndDate(lastRoute?.local_arrival);
                                                return (


                                                    <div >
                                                        {/* <p>{flight?.cityTo}({flight?.cityCodeTo}) - <span className="time_1">{arrival.time}</span></p>
                                                        <p className="font_12_date">{arrival.date}</p> */}
                                                          <p className="num_de">{arrival.time}</p>
                                                          <p className="num_de num_de1">{arrival.date}</p>
                                                    </div>

                                                );
                                            })()}


                                        </div>

                                        <div className='hei_pop pop_stop_mainm'>
                                            <span className="pop_stopss"></span>

                                        </div>
                                        <div className="hei_pop pop_dess">
                                            <div className='pop_dess1'>
                                                <p className="num_de">{originAirport}-({originCode})</p>
                                                <p className='num_de num_de1'>{flight?.cityFrom}, {flight?.countryFrom?.code}</p>
                                            </div>
                                            <div className="pop_dess2">
                                                <p className="flight_pop_gr">Flight duration: <b>({Math.floor(
                                                    Object.values(flight?.route || {}).reduce((sum, f) => sum + (f.durationInMinutes || 0), 0) / 60
                                                )}h  {Object.values(flight?.route || {}).reduce((sum, f) => sum + (f.durationInMinutes || 0), 0) % 60}m, {flight?.route && Object.keys(flight.route).length === 1
                                                    ? "Non Stops"
                                                    : Object.keys(flight.route).length - 1} stops ) </b> | Flight number: <b> {flight?.flightarray?.flight_no[0]} </b></p>

                                            </div>
                                            <div className='pop_dess1'>
                                                <p className="num_de">{destAirport} ({destCode})</p>
                                                <p className='num_de num_de1'>{flight?.cityTo}, {flight?.countryTo?.code}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pass_detail_price p-0 mt-4">
                                    <div className="pass_de_cont mb-2 p-0">
                                        <h4 className='price_s'>Price Summary</h4>
                                    </div>
                                    <div className="pass_de_cont">
                                        <p>Passengers</p>
                                        <p> USD</p>
                                    </div>
                                    <div className="pass_de_cont">
                                        <ul>
                                            <li>
                                                <p>Adult x {adt}</p>
                                                <p>{currency} {convertPrice(flight?.EquivFare?.adults * adt , currency)}</p>
                                            </li>
                                            <li>
                                                <p>Child x {chd}</p>
                                                <p>{currency}  {convertPrice(flight?.EquivFare?.children * chd, currency)}</p>
                                            </li>
                                            <li>
                                                <p>Infant x {ift}</p>
                                                <p>{currency} {convertPrice(flight?.EquivFare?.infants * ift, currency)}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr className="pass_hrr" />
                                    <div className="pass_de_cont">
                                        <p>Taxes and fees</p>
                                        <p>{flight?.price_dropdown?.fees}</p>
                                    </div>
                                    <div className="pass_de_cont">
                                        <ul>
                                            <li>
                                                <p>Platform fees</p>
                                                <p>{flight?.price_dropdown?.platform_fees}</p>
                                            </li>
                                            <li>
                                                <p>Service fee</p>
                                                <p>{flight?.price_dropdown?.fees}</p>
                                            </li>

                                        </ul>
                                    </div>
                                    <hr className="pass_hrr" />
                                    <div className="pass_de_cont">
                                        <p>Additional services</p>
                                        <p>0.00 USD</p>
                                    </div>
                                    <div className="pass_de_cont">
                                        <ul>
                                            <li>
                                                <p>Additional services</p>
                                                <p>0.00 USD</p>
                                            </li>


                                        </ul>
                                    </div>

                                    <div className="pass_de_cont grand_totat mt-2">
                                        <p>Grand Total</p>
                                        <p>{currency}  {flight?.price_dropdown?.totalamount
                                        }</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </form>
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
            </Layout>

        </>
    )
}

export default Booking