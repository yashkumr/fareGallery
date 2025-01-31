import React from 'react'

const Footer = () => {
  return (
    <>
    <hr className="hr_h" />
    <footer className="mt-3 container-fluid">
        <div className="container-fluid container-xl">
            <div className="row align-items-center justify-content-center common_padding">

                <div className="col-12 col-md-6 text-center text-md-start">
                    <h4 className="fw-700">Stay Updated With Flight Discounts And Deals</h4>
                    <p className="font_14 mt-2">Sign up for our email newsletter and be the first to get the best deals and discounts. Receive updates and enjoy your trip with ease. </p>
                </div>
                <div className="col-12 col-md-5 ps-0 ps-md-4 mt-3 mt-md-0">
                    <div className="form_in flex_props">
                        <input type="text" placeholder="Enter Your Email" className="form-control" />
                        <button>Subscribe</button>
                    </div>
                </div>

            </div>
            <hr className="hr_h" />
            <div className="row common_padding">
                <div className="col-6 col-sm-4 col-md-2">
                    <p className="footer_title">Quick Links</p>
                    <ul className="footer_ul">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Popular Destination</a></li>
                        <li><a href="#">Latest Flight</a></li>
                    </ul>
                </div>
                <div className="col-6 col-sm-4 col-md-2">
                    <p className="footer_title">Popular Destination</p>
                    <ul className="footer_ul">
                        <li><a href="https://faresgallery.com/book/cheap-flights-tickets-aberdeen">Travel to Aberdeen</a></li>
                        <li><a href="https://faresgallery.com/book/cheap-flights-tickets-bath">Travel to Bath</a></li>
                        <li><a href="https://faresgallery.com/book/cheap-flights-tickets-birmingham">Travel to Birmingham</a></li>
                        <li><a href="https://faresgallery.com/book/cheap-flights-tickets-bournemouth">Travel to Bournemouth</a></li>
                        <li><a href="https://faresgallery.com/book/cheap-flights-tickets-bristol">Travel to Bristol</a></li>
                    </ul>
                </div>
                <div className="col-6 col-sm-4 col-md-2 mt-3 mt-sm-0">
                    <p className="footer_title">Top Airlines</p>
                    <ul className="footer_ul">
                        <li><a href="https://faresgallery.com/book-flights-tickets/virgin-atlantic-airlines">Virgin Atlantic Airlines </a></li>
                        <li><a href="https://faresgallery.com/book-flights-tickets/swiss-airlines">Swiss Airlines</a></li>
                        <li><a href="https://faresgallery.com/book-flights-tickets/scandinavian-airlines">Scandinavian Airlines</a></li>
                        <li><a href="https://faresgallery.com/book-flights-tickets/etihad-airways">Etihad-airways</a></li>
                        <li><a href="https://faresgallery.com/book-flights-tickets/lufthansa-airlines">Lufthansa Airlines</a></li>
                    </ul>
                </div>
                <div className="col-6 col-sm-4 col-md-2 mt-3 mt-md-0">
                    <p className="footer_title">Deals of the Year</p>
                    <ul className="footer_ul">
                        <li><a href="https://www.faresgallery.com/travel-by-occasion/halloween-deals">Halloween Deals</a></li>
                        <li><a href="https://www.faresgallery.com/travel-by-occasion/thanksgiving-deals">Thanksgiving Deals</a></li>
                        <li><a href="https://www.faresgallery.com/travel-by-occasion/new-year-deals">New Year Deals</a></li>
                        <li><a href="https://www.faresgallery.com/travel-by-occasion/witch-festival-deals">Witch Festival Deals</a></li>
                        <li><a href="https://www.faresgallery.com/travel-by-occasion/christmas-deals">Christmas Deals</a></li>
                    </ul>
                </div>
                <div className="col-6 col-sm-4 col-md-2 mt-3 mt-md-0">
                    <p className="footer_title">Help Links</p>
                    <ul className="footer_ul">
                        <li><a href="https://faresgallery.com/privacy-policy">Privacy Policy</a></li>
                        <li><a href="https://faresgallery.com/terms-conditions">Terms & Conditions</a></li>
                        <li><a href="https://faresgallery.com/price-match-policy">Price Match Policy</a></li>
                        <li><a href="https://faresgallery.com/refund-policy">Refund Policy</a></li>
                        <li><a href="https://faresgallery.com/cancellation-policy">Cancellation Policy</a></li>
                    </ul>
                </div>
                <div className="col-6 col-sm-4 col-md-2 mt-3 mt-md-0">
                    <p className="footer_title">More Airlines</p>
                    <ul className="footer_ul">
                        <li><a href="https://faresgallery.com/book-flights-tickets/easyjet-airline">Easyjet Airline</a></li>
                        <li><a href="https://faresgallery.com/book-flights-tickets/ryanair-airlines">Ryanair Airlines</a></li>
                        <li><a href="https://faresgallery.com/book-flights-tickets/eastern-airways">Eastern Airways</a></li>
                        <li><a href="https://faresgallery.com/book-flights-tickets/british-airways">British Airways</a></li>
                        <li><a href="https://faresgallery.com/book-flights-tickets/aer-lingus">Aer Lingus</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer_bg white mt-2">
            <div className="container-fluid container-xl">
                <div className="row common_padding">
                    <div className="col-12 col-sm-6 col-lg-3 text-center">
                        <h5 className="fw-700 tit_ff">
                            <img src="/imgs/loc-i.png" />
                            Find Our Location At
                        </h5>
                        <p className="mt-2">14 Brookfields Avenue, Mitcham, England, CR4 4BN</p>
                    </div>
                    <div className="col-6 col-lg-3 text-center mt-3 mt-sm-0">
                        <h5 className="fw-700 tit_ff"><img src="/imgs/mail-us.png" /> Email Us At</h5>
                        <p className="mt-2">contact@faresgallery.com</p>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center mt-3 mt-lg-0 d-none d-sm-block">
                        <h5 className="fw-700 tit_ff"><img src="/imgs/telephone-call.png" /> Call Us At</h5>
                        <p className="mt-2">+44 800 520 0069</p>
                    </div>

                    <div className="col-6 col-sm-6 col-lg-3 text-center mt-3 mt-lg-0">
                        <h5 className="fw-700 tit_ff"><img src="/imgs/more.png" /> Social Media Links...</h5>
                        <ul className="soc_l flex_props gap-3 justify-content-center mt-2">
                            <li><a href="#"><i className="fa-brands fa-square-facebook"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-square-twitter"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-square-youtube"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-square-pinterest"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="copy_right">
            <div className="container-fluid container-xl">
                <div className="row common_padding">
                    <div className="col-12 text-center flex_props justify-content-center gap-2 flex_ff">
                        <p className="font_15">©2025, Faresgallery, All rights reserved.</p>
                        <span>|</span>
                        <ul className="pri_aall flex_props">
                            <li>
                                <a href="/privacy-policy">Privacy Policy</a>
                            </li>
                            <span>|</span>
                            <li><a href="/terms-conditions">Terms & Conditions</a></li>
                            <span>|</span>
                            <li><a href="/disclaimer">Disclaimer</a></li>
                            <span>|</span>
                            <li><a href="/cancellation-policy">Cancellation Policy</a></li>
                            <span>|</span>
                            <li><a href="/refund-policy">Refund Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer