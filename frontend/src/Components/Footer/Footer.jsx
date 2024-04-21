import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'


const Footer = () => {
  return (
    <div className="footer">
        <hr />
        <div className="footer-logo">
            <img className='footer-logo' src={footer_logo}alt="" />
        </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contract</li>
            </ul>
            <div className="footer-social-icon">
            <div className="footer-icons-container">
            <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={pintester_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="" />
        </div>
            </div>
            <div className="footer-copyright">
            <hr />
            <p>© All Rights Reserved 2024</p>
        </div>
        </div>
    

    )
}

export default Footer