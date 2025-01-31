import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import MainSearch from './Search/MainSearch';
const airlineLogo = [
    {
        id: "0",
        airlogo: "/imgs/united.png"
    },
    {
        id: "1",
        airlogo: "/imgs/lufth-air.webp"
    },
    {
        id: "2",
        airlogo: "/imgs/eth-img.png"
    },
    {
        id: "3",
        airlogo: "/imgs/jetblue-img.png"
    },
    {
        id: "4",
        airlogo: "/imgs/west-jet.png"
    },
    {
        id: "5",
        airlogo: "/imgs/qr-logo.webp"
    },
    {
        id: "6",
        airlogo: "/imgs/delta-air.webp"
    },
    {
        id: "7",
        airlogo: "/imgs/swa_logo_dark.webp"
    },
    {
        id: "8",
        airlogo: "/imgs/swa_logo_dark.webp"
    }
]
function Hero() {
    return (
        <>
            <section className="hero_hh_mobl">
                <video muted="" loop="" autoPlay="">
                    <source src="/imgs/vid-1.mp4" />
                </video>
            </section>
            <section className="hero_h relative">
                <div className="container-fluid container-xl">
                    <div className="row common_padding">
                        <div className="col-12 white text-center">
                            <p className="font_14 text-uppercase mb-0 mb-sm-3">Why Book With Faresgallery</p>
                            <h5 className="banner_ttt mt-2">The World is Waiting - Start Exploring Now!</h5>

                        </div>

                        <MainSearch />
                        <div className="col-12 col-lg-11 m-auto mb-2">

                            <Swiper
                                spaceBetween={20}
                                slidesPerView= {3}
                                modules={[Pagination]}

                                breakpoints={{
                                    768: {
                                        slidesPerView: 5,
                                        spaceBetweenSlides: 30
                                    },
                                    992: {
                                        slidesPerView: 5,
                                        spaceBetweenSlides: 30
                                    },
                                    1025: {
                                        slidesPerView: 8,
                                        spaceBetween: 30,
                                    }
                                }}
                                className="air_slider"
                            >
                                {
                                    airlineLogo.map(({ airlogo, id }) => {
                                        return (
                                            <SwiperSlide key = {id}>
                                                <div className="air_logo">
                                                    <img src={airlogo} />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }

                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="vide_bg">
                    <video muted loop autoPlay>
                        <source src="/imgs/vid-1.mp4" type="video/mp4" />
                    </video>
                </div>
            </section>

        </>
    )
}

export default Hero