/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../routes';

export default function Footer() {
    return (
        <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md">
                        <div className="footer-logo-wrapper">
                            <Link to={routes.INDEX}><img className="footer-logo" src="/public/images/hager-logo-redwhite.png" alt="Hager Companies" /></Link>
                        </div>
                    </div>
                    <div className="col-12 col-md">
                        <div className="row">
                            <div className="col-12 col-md footer-links-wrapper float-right">
                                <ul className="footer-links list-inline text-right">
                                    <li className="list-inline-item"><Link to="#">FAQ</Link></li>
                                    <li className="list-inline-item"><Link to="#">Site Map</Link></li>
                                    <li className="list-inline-item"><Link to="#">Careers</Link></li>
                                    <li className="list-inline-item"><Link to="#">Privacy Policy</Link></li>
                                    <li className="list-inline-item"><Link to="#">Contact</Link></li>
                                </ul>
                                <ul className="footer-links list-inline text-right">
                                    <li className="list-inline-item footer-social-icon"><Link to="https://www.facebook.com/HagerCompanies/"><img className="footer-social-icon" src="/public/images/icon-foot-facebook.svg" alt="Facebook" /><span className="sr-only">Facebook</span></Link></li>
                                    <li className="list-inline-item footer-social-icon"><Link to="http://instagram.com/hagercompanies"><img className="footer-social-icon" src="/public/images/icon-foot-instagram.svg" alt="Instagram" /><span className="sr-only">Instagram</span></Link></li>
                                    <li className="list-inline-item footer-social-icon"><Link to="https://www.linkedin.com/company/hager-companies"><img className="footer-social-icon" src="/public/images/icon-foot-linkedin.svg" alt="LinkedIn" /><span className="sr-only">LinkdIn</span></Link></li>
                                    <li className="list-inline-item footer-social-icon"><Link to="http://www.pinterest.com/hagerco/"><img className="footer-social-icon" src="/public/images/icon-foot-pintrest.svg" alt="Pintrest" /><span className="sr-only">Pintrest</span></Link></li>
                                    <li className="list-inline-item footer-social-icon"><Link to="https://twitter.com/HagerCo"><img className="footer-social-icon" src="/public/images/icon-foot-twitter.svg" alt="Twitter" /><span className="sr-only">Twitter</span></Link></li>
                                    <li className="list-inline-item footer-social-icon"><Link to="https://www.youtube.com/channel/UCIPMKY9wVZEVTSEzFI0LL9A/videos"><img className="footer-social-icon" src="/public/images/icon-foot-youtube.svg" alt="YouTube" /><span className="sr-only">YouTube</span></Link></li>
                                </ul>
                            </div>
                            <div className="col-12 col-md">
                                <address className="footer-address float-right">
                                    <strong>Hager Companies</strong><br />
                                139 Victor Street<br />
                                Saint Louis, MO 63104<br />
                                800-325-9995
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
