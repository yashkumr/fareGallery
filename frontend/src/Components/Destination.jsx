import React from 'react'

function Destination() {
  return (
    <section className="container-fluid container-xl mt-3">
        <div className="row common_padding">
            <div className="col-12 flex_props">
                <span className="line_ss"></span>
                <div className="common_title1 relative">
                    <p className="common_title1_prr">Recommender Place's to Visit</p>
                </div>
            </div>
            <div className="col-12 mt-4">

                <div className="des_grdd">
                    <div className="destination_containerr">
                        <div className="relative">
                            <p className="des_ww flex_props gap-2">
                                <span className="line_des"></span>
                                Travel To Stonehenge
                            </p>
                            <p className="mt-2 font_13">Britain’s great archaeological mystery, Stonehenge, is the most iconic monument to date...
                            </p>

                            <a href="https://faresgallery.com/book/cheap-flights-tickets-stonehenge" className="read_mm mt-3">Read More <img src="/imgs/r-arr.png" /> </a>
                            <div className="num_t">
                                <p>01.</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="img_aa relative">
                                <img src="/imgs/stonehenge-1.png" />
                                <p className="tie_des">Stonehenge</p>
                            </div>
                        </div>
                    </div>
                    <div className="destination_containerr">
                        <div className="des_orrr relative">
                            <p className="des_ww flex_props gap-2">
                                <span className="line_des"></span>
                                Travel To Stornoway
                            </p>
                            <p className="mt-2 font_13">From exploring rugged Island landscapes to ancient history there are a number of things to do in Stornoway...
                            </p>

                            <a href="https://faresgallery.com/book/cheap-flights-tickets-stornoway" className="read_mm mt-3">Read More <img src="/imgs/r-arr.png" /> </a>
                            <div className="num_t">
                                <p>02.</p>
                            </div>
                        </div>
                        <div className="des_orrr2">
                            <div className="img_aa relative">
                                <img src="/imgs/stornoway-1.png" />
                                <p className="tie_des">Stornoway</p>
                            </div>
                        </div>
                    </div>
                    <div className="destination_containerr">
                        <div className="relative">
                            <p className="des_ww flex_props gap-2">
                                <span className="line_des"></span>
                                Travel To New York
                            </p>
                            <p className="mt-2 font_13">As one of the most populous cities in the USA, New York is a stellar city which can keep you awe-stuck at every step...
                            </p>

                            <a href="https://faresgallery.com/book/cheap-flights-tickets-new-york" className="read_mm mt-3">Read More <img src="/imgs/r-arr.png" /> </a>
                            <div className="num_t">
                                <p>03.</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="img_aa relative">
                                <img src="/imgs/aust-ii.png" />
                                <p className="tie_des">New York</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>
  )
}

export default Destination