import React from 'react'

function About() {
  return (
    <section className="container-fluid container-xl py-3 mt-3 mt-sm-5">
        <div className="row common_padding">
            <div className="col-12 col-md-3 pe-0 pe-md-3 d-none d-md-block">
                <div className="abb_b h-100 relative">
                    <p className="nav_tt">Navigate the Friendly Skies</p>
                    <div className="pl_ii">
                        <img src="/imgs/send.png" />
                    </div>
                    <div className="num_abb">
                        <h3 className="fw-600">150+</h3>
                        <p className="font_14 mt-1">Airlines in we Deal</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-9 ab_main_m ps-0 ps-md-3 relative mt-0 mt-md-0">
                <div className="row">
                    <div className="col-9 col-md-8">
                        <div className="abb_coo ps-2">
                            <h5 className="fw-700 control_me who_tt">Easy and Affordable Flight Bookings for You</h5>
                            <p className="font_13 mt_2 d-none d-sm-block">At Faresgallery, we offer exceptional services and affordable tickets to make your journey more convenient. We understand that every traveler is different, and so are their traveling needs. Therefore, we have come up with curated package deals to offer you a seamless and hassle-free journey. As an online travel agency, we try to provide you with a comfortable journey by combining convenience and affordability.  </p>
                            <p className="d-none d-sm-block font_13 mt_2">As a reliable source of travel, our team works relentlessly to get you a perfect deal and ensure you reach your dream destination effortlessly. </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 pe-0 pe-md-4">
                        <div className="ab_imgss">
                            <img src="/imgs/quto-img.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About