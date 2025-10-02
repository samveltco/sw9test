import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignInModal from "./SignInModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import SignUpStep1Modal from "./SignUpStep1Modal";
import SignUpStep2Modal from "./SignUpStep2Modal";
import { fetchCountries, fetchStatesOfCountry } from "../../store/actions/workOrdersActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";


const LandingPage: React.FC = () => {
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
            import('../../sass/landing/landing.scss'),
            import('../../sass/landing/landing-l.scss'),
            import('../../sass/landing/landing-m.scss'),
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
                                <li className="active"><a href="/home">Home</a></li>
                                {/*<li><a href="#contact_section" onClick={this.handleContactClick}>Contact</a></li>*/}
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/locate_techs">Locate Techs</a></li>
                                <li><a href="/locate_works">Locate Works</a></li>
                                <li><a href="/solution">Solution</a></li>
                                <li><a href="/faq">FAQ</a></li>
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
                            The Field Service <span>Platform</span> That Puts People First
                        </div>

                        <div className="main_description">
                            Driving quality and efficiency for your business through empowered technicians.
                        </div>

                        <div className="main_btn">
                            <a href="mailto:hello@vaylent.com" className="btn_item">
                                <img src="/css/images/4.png" alt="logo" />
                                <div className="btn_text">Get a demo</div>
                            </a>

                            <div className="btn_item">
                                <img src="/css/images/5.png" alt="logo" />
                                <div className="btn_text">For technicians</div>
                            </div>
                        </div>
                    </div>

                    <div className="main_section">
                        <div className="main_btn2">
                            <div className="text_block">
                                <h1>The Hidden Costs of Undervalued Talent</h1>
                                You’re investing in a field service platform—but if it taxes the people
                                doing the work, the bill shows up elsewhere. Models that take a cut of
                                technician pay create hidden costs and operational drag that your
                                customers eventually feel.
                                <ul className="ul_main">
                                    <li>
                                        <i>Eroded morale & loyalty</i> → Inconsistent quality, spotty coverage,
                                        slipping standards.
                                    </li>
                                    <li>
                                        <i>Turnover tax</i> → Constant recruiting and retraining, lost context,
                                        burned management hours.
                                    </li>
                                    <li>
                                        <i>Race-to-the-bottom pricing</i> → Lower first-time-fix rates, more
                                        revisits, higher downstream costs.
                                    </li>
                                    <li>
                                        <i>Administrative drag</i> → Volatile scheduling, escalations, and time
                                        spent managing disengaged crews.
                                    </li>
                                    <li>
                                        <b>Bottom line:</b> Undervaluing talent looks cheap on paper but
                                        expensive in practice.
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
                                <h1>A Win-Win Model: Superior Service Through Empowered Technicians</h1>
                                Empower the people who do the work and results follow.
                                Vaylant’s managed services platform runs on a simple principle:
                                you pay a clear, cost-effective platform fee—and technicians keep 100% of their earnings.
                                That alignment delivers measurable gains for your business.
                                <ul className={'ul_main'}>
                                    <li><i>Attract the best talent</i>—Our 0% take makes Vaylant a magnet for top-tier, motivated technicians.</li>
                                    <li><i>Better outcomes</i>—Valued pros are more invested, driving higher first-time-fix rates and fewer revisits.</li>
                                    <li><i>Transparent, predictable pricing</i>—No hidden charges or maze-like tiers—just straightforward costs you can plan around.</li>
                                    <li><b>Bottom line:</b> When technicians win, you win—through quality, reliability, and trust.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="main_section">
                        <div className="main_btn2">
                            <div className="text_block">
                                <h1>
                                    Beyond a Better Model: The Vaylant Advantage
                                </h1>
                                Fairness is the start, not the finish.
                                Vaylant pairs people-first economics with a platform built for
                                the realities of retail—delivering operational excellence and peace of mind.
                                <ul className="ul_main">
                                    <li><b>Mobile-First UX:</b> An intuitive, modern platform built for a mobile world, empowering technicians with real-time access to information and tools.</li>
                                    <li><b>Proactive & Predictive:</b> Leverage advanced diagnostics and smart scheduling to prevent problems before they impact your business.</li>
                                    <li><b>Unwavering Reliability:</b> A trusted partner to ensure your infrastructure runs smoothly.</li>
                                </ul>
                            </div>

                            <div className="image_block">
                                <img className="block_img" src="/css/images/3.png" alt="icon" />
                            </div>
                        </div>
                    </div>

                    <div className="work_section">
                        <div className="section_title">Testimonials</div>
                        <div className="section_description">
                            Text about clients
                        </div>
                        <ul className="work_list work_2">
                            <li>
                                <div className="image_work">
                                    <img src="/css/images/6.png" alt="img1" width={330} height={260} />
                                    <div className={'work2_text'}>
                                        <h3>VOICES THAT SPEAK SUCCESS</h3>
                                        <p>Hear directly clients and technicians about the real impact of our platform</p>
                                    </div>
                                </div>

                            </li>
                            <li>
                                <div className="image_work">
                                    <img src="/css/images/7.png" alt="img1" width={330} height={260}  />
                                    <div className={'work2_text'}>
                                        <h3>DUAL PERSPECTIVES, ONE ADVANTAGE</h3>
                                        <p>Discover how Vaylant empowers technicians and delights customers alike</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="image_work">
                                    <img src="/css/images/8.png" alt="img1" width={330} height={260} />
                                    <div className={'work2_text'}>
                                        <h3>STORIES OF ALIGNMENT AND EXCELLENCE</h3>
                                        <p>Testimonials from those who experience fairness, efficiency, and results every day</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="contact_section" id="contact_section">
                        <div className="contact_row">
                            <div className="left_col">
                                <div className="section_title">Contact Us</div>
                                <div className="section_description">
                                    <b>Hi there,</b> and Welcome to The Vaylant Group! Whether you're a contractor looking for work, or a company looking to hire contractors, we're here to help!
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
                                    <a href="https://play.google.com/store/apps/details?id=com.example.your.package" className="download_btn icon_arrow2">Download our app</a>
                                </div>
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

export default LandingPage;