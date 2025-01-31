import React from 'react'

function Steps() {
    return (
        <>
            <section className="container-fluid container-xl mt-4">
                <div className="row justify-content-center align-items-center common_padding">
                   
                    <div className="col-12">
                        <div className="proo_grid">
                            <div className="proo_container">
                                <div className="proo_img">
                                    <img src="/imgs/deals-i.png" />
                                </div>
                                <div>
                                    <p className="proo_t">Exclusive Deals &amp; Packages</p>
                                    <p className="mt-2 proo_tt">Connect to our customer service for dedicated 24/7 support. </p>


                                </div>
                                <div className="num_prr">01</div>
                            </div>
                            <div className="proo_container">
                                <div className="proo_img">
                                    <img src="/imgs/package-i.png" />
                                </div>
                                <div>
                                    <p className="proo_t">Tailor-made travel packages</p>
                                    <p className="mt-2 proo_tt">Book your tickets today and enjoy your journey with tailor.</p>

                                </div>
                                <div className="num_prr">02</div>
                            </div>
                            <div className="proo_container">
                                <div className="proo_img">
                                    <img src="/imgs/instant-icon.png" />
                                </div>
                                <div>
                                    <p className="proo_t">Instant booking confirmations</p>
                                    <p className="mt-2 proo_tt">We are known for our instant and effective booking options. </p>

                                </div>
                                <div className="num_prr">03</div>
                            </div>
                            <div className="proo_container">
                                <div className="proo_img">
                                    <img src="/imgs/secure-i.png" />
                                </div>
                                <div>
                                    <p className="proo_t">Flexible &amp; secure payment options</p>
                                    <p className="mt-2 proo_tt">Travelers can enjoy seamless, flexible and secure payment.</p>
 
                                </div>
                                <div className="num_prr">04</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Steps