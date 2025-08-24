import React, { useState } from "react";
import SignInModal from "./SignInModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import SignUpStep1Modal from "./SignUpStep1Modal";
import SignUpStep2Modal from "./SignUpStep2Modal";

const LandingPage: React.FC = () => {
    const [currentModal, setCurrentModal] = useState<string | null>(null);

    const showModal = (modalType: string) => {
        setCurrentModal(modalType);
    };

    const hideModal = () => {
        setCurrentModal(null);
    };

    const showSignUpStep1 = () => {
        setCurrentModal('signUpStep1');
    };

    const showSignUpStep2 = () => {
        setCurrentModal('signUpStep2');
    };

    const handleSignUpClick = () => {
        showSignUpStep1();
    };

    const showForgotPassword = () => {
        setCurrentModal('forgotPassword');
    };

    const showSignIn = () => {
        setCurrentModal('signIn');
    };

    return (
        <div className="root">
            <div className="header">
                <div className="page_container">
                    <div className="header_inner">
                        <div className="main_logo">
                            <img src="/css/images/main_logo.svg" alt="logo" width={129} height={44} />
                        </div>
                        <div className="menu_block">
                            <ul className="main_menu">
                                <li className="active"><a href="#">Home</a></li>
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); showModal('signIn'); }}>Sign in</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); handleSignUpClick(); }}>Sign up</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="page_container">
                    <div className="main_section">
                        <div className="main_title">
                            Looking for contract <span>work?</span> Looking for <b>contractors?</b>
                        </div>
                        <div className="main_description">
                            Vaylant G is the next generation FMS platform for connecting contractors and clients.
                        </div>
                        <div className="main_btn">
                            <a href="#" className="btn_signIn" onClick={(e) => { e.preventDefault(); showModal('signIn'); }}>Sign in</a>
                            <a href="#" className="btn_signUp" onClick={(e) => { e.preventDefault(); handleSignUpClick(); }}>Sign up</a>
                        </div>
                    </div>

                    <div className="app_section">
                        <div className="section_title">download our app</div>
                        <div className="section_description">download so we can be closer</div>
                        <div className="app_version">
                            <a href="#"><img src="/css/images/android.png" alt="android" width={146} height={40} /> image name</a>
                            <a href="#"><img src="/css/images/ios.png" alt="ios" width={146} height={40} /> image name</a>
                        </div>
                        <div className="phone_img">
                            <picture>
                                <source media="(min-width:575px)" srcSet="/css/images/iphone.png" />
                                <img src="/css/images/mobile_ophone.png" width={506} height={234} alt="phone" />
                            </picture>
                        </div>
                    </div>

                    <div className="contractor_section">
                        <div className="contractor_info">
                            <img src="/css/images/arrow.svg" alt="arrow" width={230} height={59} />
                            Professionalism, friendliness, great communication and a platform that works well!
                        </div>
                        <ul className="contractor_list">
                            <li>
                                <div className="inner_title">The Vaylant Group Contractor:</div>
                                <div className="inner_description">
                                    Man do I love your platform! Been beating on it now going into my 4th month and just could not be happier!
                                </div>
                            </li>
                            <li>
                                <div className="inner_title">The Vaylant Group Contractor:</div>
                                <div className="inner_description">
                                    The Vaylant Group system was fast and effective and we received our payments in a timely manner.
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="work_section">
                        <div className="section_title">How The Vaylant Group Works</div>
                        <div className="section_description">
                            Vaylant G has a transparent fee structure for clients needing work order and pay processing, contractor vetting and onboarding, or full project deployment management support.
                        </div>
                        <ul className="work_list">
                            <li>
                                <div className="work_block">
                                    <div className="top_block">
                                        <div className="number_block">01.</div>
                                        <div className="img_block"><img src="/css/images/img1.png" alt="img1" width={112} height={116} /></div>
                                    </div>
                                    <div className="work_title">DESCRIBE YOUR WORK</div>
                                    <div className="work_description">
                                        This helps contractors determine if they're a match for your work order.
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="work_block">
                                    <div className="top_block">
                                        <div className="number_block">02.</div>
                                        <div className="img_block"><img src="/css/images/img2.png" alt="img2" width={112} height={116} /></div>
                                    </div>
                                    <div className="work_title">REVIEW & ASSIGN CONTRACTOR</div>
                                    <div className="work_description">
                                        Review the applicants profile and assign the the one that best fits your work.
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="work_block special">
                                    <div className="top_block">
                                        <div className="number_block">03.</div>
                                        <div className="img_block"><img src="/css/images/img3.png" alt="img3" width={112} height={116} /></div>
                                    </div>
                                    <div className="work_title">RELAX</div>
                                    <div className="work_description">
                                        Kick back and relax knowing you have a quality contractor doing your work.
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="contact_section">
                        <div className="contact_row">
                            <div className="left_col">
                                <div className="section_title">Contact Us</div>
                                <div className="section_description">
                                    <b>Hi there,</b> and Welcome to The Vaylant Group! Whether you`re a contractor looking for work, or a company looking to hire contractors, we`re here to help!
                                </div>
                            </div>
                            <div className="right_col">
                                <div className="block_contact">
                                    <div className="title_contact">Stay in touch</div>
                                    <div className="phone_block">phone number</div>
                                    <div className="email_block">email</div>
                                    <div className="social_list">
                                        <div className="social_title">Our team </div>
                                        <ul className="social_link">
                                            <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">@instagram</a></li>
                                            <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">@linkedin</a></li>
                                            <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">@facebook</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <a href="https://play.google.com/store/apps/details?id=com.example.your.package" className="download_btn icon_arrow2">Download our app</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer">
                <div className="page_container">
                    <div className="footer_logo">
                        <img src="/css/images/footer_logo.svg" alt="footer logo" width={295} height={189} />
                    </div>
                    <div className="copyrights">Copyright © 2025 The Vaylant Group. All Rights Reserved.</div>
                </div>
            </div>

            {/* Модальные окна */}
            <SignInModal 
                isOpen={currentModal === 'signIn'} 
                onClose={hideModal}
                onShowForgotPassword={showForgotPassword}
            />
            
            <ForgotPasswordModal 
                isOpen={currentModal === 'forgotPassword'} 
                onClose={hideModal}
                onShowSignIn={showSignIn}
            />
            
            <SignUpStep1Modal 
                isOpen={currentModal === 'signUpStep1'} 
                onClose={hideModal}
                onNext={showSignUpStep2}
                onShowSignIn={showSignIn}
            />
            
            <SignUpStep2Modal 
                isOpen={currentModal === 'signUpStep2'} 
                onClose={hideModal}
                onShowSignIn={showSignIn}
            />
        </div>
    );
};

export default LandingPage;
