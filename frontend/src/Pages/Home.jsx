import React from 'react'
import Layout from '../Components/Layout.jsx'
import Hero from '../Components/Hero.jsx'
import Steps from '../Components/Steps.jsx'
import About from '../Components/About.jsx'
import Destination from '../Components/Destination.jsx'
import Why from '../Components/Why.jsx'

const Home = () => {
    return (

        <>
            <Layout title="Faresgallery" description="welcome to Faresgallery">
                <style>
                    {`
             .hed-c {
        border: none;
        position: absolute;
        width: 100%;
        z-index: 9;
        background-color: transparent;
        z-index: 9;
    }
        `}
                </style>
                <Hero />
                <Steps />
                <About />
                <Destination />
                <Why />
            </Layout>
        </>
    )
}

export default Home