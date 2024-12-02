import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import './home.css'
import Features1 from '../components/features1'
import CTA from '../components/cta'
import CTA1 from '../components/cta1';
const Home = () => {
  return (
    <div className="home-container">
      <Helmet>
        <title>DocTalk</title>
      </Helmet>
      <Navbar
        logoAlt="DocTalk Logo"
        logoSrc="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original"
        link1="Home"
        link2="About"
        
        link5="Contact"
      />
      <Hero></Hero>
      <Features1></Features1>
      <CTA></CTA>
      <CTA1></CTA1>
     
    </div>
  );
};

export default Home;