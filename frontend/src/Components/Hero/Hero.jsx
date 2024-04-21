import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/wellcome_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero-img.png'


const Hero = () => {
  function goTonewCollection(){
    window.scrollBy({
      top: 2024, // Scroll down by 100 pixels
      left: 0,   // Do not scroll horizontally
      behavior: 'smooth' // Scroll smoothly
    });
  }
  return (
    <div className='hero'>
        <div className="hero-left">
            {/* <h2>New Arrivals Only</h2> */}
            <div className="hand-hand-icon">
                    <img src={hand_icon} alt="" />
                    <p>to Poshak</p>
                </div>
                <p>Crafted with passion and dedication to quality</p>
                {/* <p>for everyone</p> */}
                <div className="hero-latest-btn">
            <div onClick={goTonewCollection}>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
        </div>
        <div className="hero-right">
            <img className='hero-image' src={hero_image} alt="" />
                
        </div>
        
    </div>
  )
}

export default Hero