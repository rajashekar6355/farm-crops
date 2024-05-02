import React from 'react'
import "./Footer.css"
import { fassets } from "../../assets/frontend_assets/fassets";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='footer' id='footer'>
                <div className="footer-content">
                    <div className="footer-content-right">
                        <img src={fassets.logo} alt="" />
                        <p>Farm crops, a vibrant platform connecting farmers with consumers, offers fresh, locally grown produce straight from the fields to your table, fostering community and supporting sustainable agriculture.</p>
                        <div className="footer-social-media">
                            <img src={fassets.facebook_icon} alt="" />
                            <img src={fassets.twitter_icon} alt="" />
                            <a target='_blank' href="https://www.instagram.com/mr._.rajashaker._.29"><img src={fassets.linkedin_icon} alt="" /></a>
                        </div>
                    </div>
                    <div className="footer-content-center">
                        <h2>COMPANY</h2>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li onClick={() => navigate('/about-us')}>About Us</li>
                            <li onClick={() => navigate('/myorders')}>Orders</li>
                            <li onClick={() => navigate('/privacypolicy')}>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className="footer-content-left">
                        <h2>GET IN TOUCH</h2>
                        <ul>
                            <li>+91 7780304317</li>
                            <a href="tel:+917780304317"><li>Call me</li></a>
                            <a href="mailto:mudholker.rajashaker@gmail.com"><li>mudholker.rajashaker@gmail.com</li></a>

                        </ul>
                    </div>

                </div>
                <hr />
                <p className="footer-copyrights">CopyRights 2024 © FarmCrops.com -All Rights Reserved</p>
            </div>
            <hr />
        </>
    )
}

export default Footer