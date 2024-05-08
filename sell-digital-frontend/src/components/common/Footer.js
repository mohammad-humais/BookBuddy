import React from 'react';
import { Link } from 'react-router-dom';
import {footSocial } from '../../data/footerData';


const Footer = () => {

    return (
        <footer id="footer">
        

            <div className="sub_footer light-color">
                <div className="container">
                    <div className="sub_footer_wrapper">
                        <div className="foot_copyright">
                            <p>
                                2024 | BookBuddy. All Rights Reserved.
                              
                            </p>
                        </div>
                        <div className="foot_social">
                            {
                                footSocial.map((item) => {
                                    const { id, icon, path } = item;
                                    return (
                                        <Link to={path} key={id}>{icon}</Link>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;