import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {fetchCountries, fetchStatesOfCountry} from "../store/actions/workOrdersActions";
import {ForgotPasswordModal, SignInModal, SignUpStep1Modal, SignUpStep2Modal} from "../components/landing";


const LocateWorks: React.FC = () => {
    const [currentModal, setCurrentModal] = useState<string | null>(null);
    const [selectedUserType, setSelectedUserType] = useState<'contractor' | 'client' | null>(null);
    const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);
    const [states, setStates] = useState<{ value: string; label: string }[]>([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(false);
    const [isLoadingStates, setIsLoadingStates] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadCountries = async () => {
        if (countries.length > 0) return;

        setIsLoadingCountries(true);
        try {
            const result = await dispatch<any>(fetchCountries());
            if (Array.isArray(result)) {
                setCountries(
                    result.map((c: any) => ({
                        value: c.code || c.id || c.name,
                        label: c.name,
                    }))
                );
            }
        } catch (error) {
            console.error('Failed to load countries:', error);
        } finally {
            setIsLoadingCountries(false);
        }
    };

    const loadStates = async (countryCode: string) => {
        setIsLoadingStates(true);
        try {
            const result = await dispatch<any>(fetchStatesOfCountry(countryCode));
            if (Array.isArray(result)) {
                setStates(
                    result.map((s: any) => ({
                        value: s.value,
                        label: s.label,
                    }))
                );
            }
        } catch (error) {
            console.error('Failed to load states:', error);
        } finally {
            setIsLoadingStates(false);
        }
    };

    useEffect(() => {
        if (currentModal === 'signUpStep1') {
            loadCountries();
        }
    }, [currentModal]);

    useEffect(() => {
        if (selectedCountry) {
            loadStates(selectedCountry);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (countries.length > 0 && !selectedCountry) {
            setSelectedCountry(countries[1].value);
        }
    }, [countries]);

    const handleCountryChange = (countryCode: string) => {
        setSelectedCountry(countryCode);
    };
    useEffect(() => {
        const markNode = (el: Element) => {
            (el as HTMLElement).setAttribute('data-landing-style', '1');
        };
        const enableNode = (el: Element) => {
            if (el.tagName === 'LINK') {
                (el as HTMLLinkElement).media = 'all';
            } else if (el.tagName === 'STYLE') {
                (el as HTMLStyleElement).media = '';
            }
        };
        const disableNode = (el: Element) => {
            if (el.tagName === 'LINK') {
                (el as HTMLLinkElement).media = 'not all';
            } else if (el.tagName === 'STYLE') {
                (el as HTMLStyleElement).media = 'not all';
            }
        };

        let nodes = Array.from(document.head.querySelectorAll('[data-landing-style="1"]')) as Element[];
        if (nodes.length) {
            nodes.forEach(el => {
                enableNode(el);
                document.head.appendChild(el);
            });
            return () => nodes.forEach(disableNode);
        }

        const collected = new Set<Element>();
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const el = node as Element;
                        if (
                            el.tagName === 'STYLE' ||
                            (el.tagName === 'LINK' && (el as HTMLLinkElement).rel === 'stylesheet')
                        ) {
                            markNode(el);
                            collected.add(el);
                        }
                    }
                });
            });
        });
        observer.observe(document.head, { childList: true });

        Promise.all([
            import('../sass/landing/landing.scss'),
            import('../sass/landing/landing-l.scss'),
            import('../sass/landing/landing-m.scss'),
        ]).finally(() => {
            observer.disconnect();
            nodes = Array.from(collected);
        });

        return () => {
            observer.disconnect();
            Array.from(collected).forEach(disableNode);
        };
    }, []);

    const showModal = (modalType: string) => {
        setCurrentModal(modalType);
    };

    const hideModal = () => {
        setCurrentModal(null);
        setSelectedUserType(null);
    };

    const showSignUpStep1 = () => {
        setCurrentModal('signUpStep1');
    };

    const showSignUpStep2 = (userType: 'contractor' | 'client') => {
        setSelectedUserType(userType);
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

    const handleLoginSuccess = () => {
        navigate('/dashboard');
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
                                <li><a href="/home">Home</a></li>
                                {/*<li><a href="#contact_section" onClick={this.handleContactClick}>Contact</a></li>*/}
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/locate_techs">Locate Techs</a></li>
                                <li className="active"><a href="/locate_works">Locate Works</a></li>
                                <li><a href="/solution">Solution</a></li>
                                <li><a href="#faq">FAQ</a></li>
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
                            Your Partner in Field Service Success.
                        </div>

                        <div className="main_description">
                            Keep 100% of your earnings. Grow your career. Vaylant is built for you. Join Our Network
                        </div>

                        <div className="app_section">
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
                    </div>

                    <div className="main_section">
                        <div className="main_btn2">
                            <div className="text_block">
                                <h1><strong>Stop Paying to Work.</strong></h1>
                                <ul className="ul_main">
                                    <li>
                                        <b>Keep Your Pay:</b> You keep 100% of what you earn. No hidden fees, no surprises.
                                    </li>
                                    <li>
                                        <b>Quality Jobs:</b>Access a consistent pipeline of high-value work from clients who truly value your expertise.
                                    </li>
                                    <li>
                                        <b>Administrative Ease:</b> Focus on your work, not paperwork. We handle payments and simplified tax reporting.                                    </li>
                                    <li>
                                        <b>Intuitive Tools:</b> Our mobile-first platform makes finding, managing, and completing jobs effortless.
                                    </li>
                                    <li>
                                        <b>Dedicated Support:</b> Get 24/7 support when you need it, and tools to showcase your skills and grow your business.
                                    </li>
                                    <li style={{listStyle:'none'}}>
                                        <ul style={{listStyle:'none'}}>
                                            <li>
                                                <strong>Technician Testimonials Section: Feature glowing reviews from technicians who have experienced the Vaylant difference.</strong>
                                            </li>
                                            <li>
                                                <strong>Join a Community That Values You.</strong>
                                                <p>Ready to take control of your earnings and your career? Vaylant is the fair, transparent, and supportive partner you've been looking for."</p>
                                                <div className="main_btn">
                                                    <a href="#" onClick={(e) => { e.preventDefault(); handleSignUpClick(); }} className="btn_item">
                                                        <img src="/css/images/signup.png" alt="logo" style={{maxHeight: '500px'}} />
                                                    </a>

                                                </div>
                                            </li>
                                        </ul>
                                    </li>

                                </ul>

                            </div>

                            <div className="image_block">
                                <img className="block_img" src="/css/images/1.png" alt="icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer">
                <div className="page_container">
                    <div className="footer_logo">
                        <img
                            src="/css/images/footer_logo.svg"
                            alt="footer logo"
                            width={295}
                            height={189}
                        />
                    </div>

                    <div className="footer_socials">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebookF} size="lg" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                        </a>
                    </div>

                    <div className="footer_links">
                        <a href="/about">About Us</a>
                        <a href="/contact">Contact</a>
                        <a href="/technicians">For Technicians</a>
                    </div>

                    <div className="copyrights">
                        Copyright © 2025 The Vaylant Group. All Rights Reserved.
                    </div>
                </div>
            </div>


            <SignInModal
                isOpen={currentModal === 'signIn'}
                onClose={hideModal}
                onShowForgotPassword={showForgotPassword}
                onLoginSuccess={handleLoginSuccess}
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
                userType={selectedUserType!}
                countries={countries}
                states={states}
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
                isLoadingCountries={isLoadingCountries}
                isLoadingStates={isLoadingStates}
            />
        </div>

    );
};

export default LocateWorks;