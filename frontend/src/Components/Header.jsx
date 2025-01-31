import React, { useState } from 'react'
import CurrencySelector from './CurrencySelector'

const Header = () => {

    const [menu, setMenu] = useState(false)

  return (
    <>
    <header className="hed-c">
        <nav className="nav-cuss">
            <div className="container-fluid container-xl d-flex justify-content-between align-items-center common_padding">
                <div className="nav-logo">
                    <img src="/imgs/logo-2.png" />
                </div>
                <div className={menu ? "nav-links-custt flex_props gap-3 nav-links-custt_active" : "nav-links-custt flex_props gap-3"} >
                    <ul>
                        <li><a href="#">Home <img src="/imgs/next.png" /> </a></li>
                        <li><a href="#">About Us <img src="/imgs/next.png" /></a></li>
                        <li><a href="#">Travel By Theme <img src="i/mgs/next.png" /></a></li>
                        <li><a href="#">How To Book <img src="/imgs/next.png" /></a></li>
                        <li><a href="#">Popular Destinations <img src="imgs/next.png" /></a></li>
                        <li><a href="#">Contact Us <img src="/imgs/next.png" /> </a></li>
                        {/* <li><a href="#"> <CurrencySelector/> <img src="/imgs/next.png" /> </a></li> */}
                    </ul>
                    <a href="tel:+44 800 520 0069" className="ph_p">
                        <img src="/imgs/ph-i.png" />
                        <div>
                            <p>+44 800 520 0069</p>
                            <p className="font_9">Book cheap flights</p>

                        </div>
                    </a>
                    <button className="close_btt" onClick={() => {
                        setMenu(!menu)
                    }}><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="nav_links_hh">
                    <button className="menu_linnkk" onClick={() => {
                        setMenu(!menu)
                    }}>
                        <img src="/imgs/menu-i.png" />
                    </button>
                </div>
            </div>
        </nav>
    </header>
    
    </>
  )
}

export default Header