import React from 'react'
import Helmet from "react-helmet"
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Toaster } from 'react-hot-toast'

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
       
            <Header/>
            <Toaster />

        <main style={{ minHeight: "50vh" }} > {children} </main>
       
        
        <Footer/>
      </div>
    </>
  )
}

Layout.defaultProps = {
  title: "Faresgallery",
  description: "welcome to Faresgallery",
  keywords: "search for the best results"
}

export default Layout