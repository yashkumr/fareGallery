import React from 'react'


export const ThankYou = () => {
    return (
        <>
        

       
            <section className='thankyou_bg'>
                <div className="container">
                    <div className="row">
                        <div className="col-11 col-lg-8 thank_bgg m-auto">
                            <div className="text-center">
                                <div className="thankyou_img">
                                    <img src = "/imgs/thankyou-img.png" />
                                </div>
                                <h4 className='mt-3 control_h44'><b>Haris</b> Thank you for booking your upcoming flight with FaresGallery.</h4>
                                <p className="mt-2 font_12">We are extremely excited to have you onboard and appreciate your trust in us for all your travel needs. </p>
                                <p className="book_title_thank mt-4">Your Booking Id Is : <b>324543</b></p>
                                <div className="mt-2">
                                    <a href='tel:+44 01902 500214' className='fell_free_thankyou'>Feel free to reach out to us at  <b>+44 01902 500214</b> for any query.</a>
                                </div>
                                <ul className="mt-4 social_thankyo flex_props justify-content-center">
                                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-pinterest-p"></i></a></li>
                                </ul>
                                <a href="/" className='backhome'>Go Back to Home Page <i className="fa-solid fa-angles-left"></i></a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
           
        </>
    )
}
