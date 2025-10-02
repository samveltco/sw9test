import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {fetchCountries, fetchStatesOfCountry} from "../store/actions/workOrdersActions";
import {ForgotPasswordModal, SignInModal, SignUpStep1Modal, SignUpStep2Modal} from "../components/landing";


const Solution: React.FC = () => {
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
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/locate_techs">Locate Techs</a></li>
                                <li><a href="/locate_works">Locate Works</a></li>
                                <li className="active"><a href="/solution">Solution</a></li>
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
                            The Vaylant Advantage: Technology Built for Partnership
                        </div>

                        <div className="main_description">
                            At Vaylant, our technology isn't just a marketplace; it's a comprehensive platform designed to empower people and
                            optimize operations. We built our solution from the ground up to solve
                            the most pressing problems in field service, giving you
                            the tools for superior quality and unprecedented clarity.
                        </div>

                    </div>

                    <div className="main_section">
                        <div className="main_btn2">
                            <div className="text_block">
                                <h1>Solutions for Clients: Performance, Predictability, Partnership</h1>
                                Your business demands efficiency and reliability. Vaylant's platform provides the complete visibility and control you need
                                to ensure every project is completed on time and to the highest standard.
                                <ul className="ul_main">
                                    <li>
                                        <i>Proactive & Predictive Capabilities:</i> Stop reacting to problems and start anticipating them. Our platform uses advanced diagnostics
                                        and intelligent scheduling algorithms to help you identify potential issues before they cause downtime.
                                            This shifts your business from a reactive repair model to a proactive maintenance strategy, saving you time and money.
                                    </li>
                                    <li>
                                        <i>Real-Time Visibility:</i> Know what's happening, everywhere, all the time. Our mobile-first platform
                                        gives you real-time access to job status, technician locations, and comprehensive service histories. This unparalleled transparency
                                        reduces the need for manual check-ins and allows
                                        for proactive problem-solving, improving your team's efficiency and your customer's experience.
                                    </li>
                                    <li>
                                        <i>Comprehensive Managed Services:</i> We handle the administrative complexities so you can focus on your core
                                        business. From automated dispatching to streamlined work order management and simplified
                                        invoicing, our platform automates critical workflows. This reduces your administrative burden and ensures that
                                        every detail is captured accurately, from the moment a ticket is
                                        opened to the second it's closed.

                                    </li>
                                </ul>
                            </div>

                            <div className="image_block">
                                <img className="block_img" src="/css/images/1.png" alt="icon" />
                            </div>
                        </div>
                    </div>

                    <div className="main_section">
                        <div className="main_btn2">
                            <div className="image_block">
                                <img className="block_img" src="/css/images/2.png" alt="icon" />
                            </div>
                            <div className={'text_block'}>
                                <h1>Solutions for Technicians: Tools for Success</h1>
                                Your expertise is your business, and Vaylant is your partner. Our technology is designed to make your day easier, your work more efficient, and your earning potential unlimited.
                                <ul className={'ul_main'}>
                                    <li><i>Intuitive Mobile-First Experience:</i> Your office is in your pocket. Our platform's intuitive mobile UX puts everything you
                                        need at your fingertips. Access job details, customer histories, and on-site documentation, and even process payments right from your device.
                                        This eliminates paperwork and lets you focus on the technical work you do best.</li>
                                    <li><i>Transparent & Simple Workflows:</i> Say goodbye to administrative headaches. Vaylant's platform simplifies every step of the process.
                                        From accepting a job to submitting your final report, our system is built for clarity and speed. We ensure you have all the
                                        information you need, so you can deliver excellent service without any friction.</li>
                                    <li><i>Administrative Freedom:</i> We handle the paperwork; you get the pay. Our platform automatically generates invoices on your behalf
                                        and ensures transparent, reliable payments so you never have to chase down a check. This administrative relief, combined with our
                                        no-fee model, means you keep 100% of your earnings with zero hassle.</li>
                                </ul>
                                <h1>A Platform Built on a Virtuous Cycle</h1>
                                The Vaylant platform is the engine that drives our people-first mission. By providing clients with a new level of operational
                                control and equipping technicians with best-in-class tools, we create a powerful virtuous cycle of excellence.
                                The result is a more efficient, reliable, and profitable field service ecosystem for everyone involved.
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

export default Solution;