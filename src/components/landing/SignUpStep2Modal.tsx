import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useDispatch} from "react-redux";
import {registerUser} from "../../store/actions/authActions";
import axios from 'axios';
import Notification from "../../components/notification";
import CustomSelect from "../Select";

interface SignUpStep2ModalProps {
    isOpen: boolean,
    onClose: () => void,
    onShowSignIn: () => void,
    userType: 'contractor' | 'client',
    countries: { value: string; label: string }[],
    states: { value: string; label: string }[],
    onCountryChange: (countryCode: string) => void,
    isLoadingCountries: boolean,
    isLoadingStates: boolean,
    selectedCountry?: string | null
}

const normalizePhoneInput = (value: string, previousValue: string = ''): string => {
    if (!value) return value;

    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
        if (cvLength < 4) return currentValue;
        if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }

    return value;
};

const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const SignUpStep2Modal: React.FC<SignUpStep2ModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               onShowSignIn,
                                                               userType,
                                                               countries,
                                                               states,
                                                               onCountryChange,
                                                               isLoadingCountries,
                                                               isLoadingStates,
                                                               selectedCountry
                                                           }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        phone: '',
        address: '',
        address2: '',
        company: '',
        city: null as { value: string; label: string } | null,
        state: null as { value: string; label: string } | null,
        country: null as { value: string; label: string } | null,
        zipcode: '',
        password: '',
        confirmPassword: '',
        website: '',
        referredPersonName: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isInvite, setIsInvite] = useState(false);
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [companyName, setCompanyName] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [emailError, setEmailError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const dispatch = useDispatch();

    const fieldContainerRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
    const modalBodyRef = useRef<HTMLDivElement>(null);

    const scrollToField = useCallback((fieldName: string) => {
        setTimeout(() => {
            const element = fieldContainerRefs.current[fieldName];
            if (element && modalBodyRef.current) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }, 50);
    }, []);

    const setFieldContainerRef = useCallback((name: string) => (el: HTMLDivElement | null) => {
        if (el) {
            fieldContainerRefs.current[name] = el;
        }
    }, []);

    const handleFieldClick = useCallback((fieldName: string, nextField?: string) => {
        return () => {
            scrollToField(fieldName);
        };
    }, [scrollToField]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const inviteId = queryParams.get('SID');
        const randId = queryParams.get('id');

        if (inviteId && randId) {
            setIsInvite(true);
            axios
                .post('/api/auth/fetch_invited_client_users', {
                    rand_id: randId,
                })
                .then((res) => {
                    const fetchInvite = res.data.ClientUsers;
                    setFormData(prev => ({
                        ...prev,
                        firstName: fetchInvite.firstname || '',
                        lastName: fetchInvite.lastname || '',
                        email: fetchInvite.email || '',
                        phone: fetchInvite.phone || '',
                    }));
                    setCompanyName(fetchInvite.company?.name || '');
                    setCompanyId(fetchInvite.companyId || null);
                })
                .catch((error) => {
                    console.error('error: ', error);
                    Notification('error', {
                        message: error.response?.data?.message || error.message,
                    });
                });
        }
    }, []);

    useEffect(() => {
        if (!formData.country && countries.length > 0) {
            const firstCountry = countries[0];
            setFormData(prev => ({
                ...prev,
                country: firstCountry,
                state: null,
            }));

            if (firstCountry?.value) {
                onCountryChange(firstCountry.value);
            }
        }
    }, [countries, onCountryChange]);

    const validateField = useCallback((name: string, value: any): string => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) return 'This field is required';
                if (value.length < 2) return 'Must be at least 2 characters';
                return '';

            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!validateEmail(value)) return 'Please enter a valid email address';
                return '';

            case 'confirmEmail':
                if (!value) return 'Please confirm your email';
                if (name === 'confirmEmail') {
                    setFieldErrors(prev => ({
                        ...prev,
                        confirmEmail: value !== formData.email ? 'Emails do not match' : '',
                    }));
                }
                return '';

            case 'phone':
                if (!value.trim()) return 'Phone number is required';
                if (value.replace(/\D/g, '').length < 10) return 'Please enter a valid phone number';
                return '';

            case 'confirmPassword':
                if (!value) return 'Please confirm your password';
                if (value !== formData.password) return 'Passwords do not match';
                return '';

            case 'address':
                if (userType === 'contractor' && !value.trim()) return 'Address is required for contractors';
                return '';

            case 'country':
                if (userType === 'contractor' && !value?.value) return 'Required';
                return '';

                case 'state':
                if (userType === 'contractor' && !value?.value) return 'Required';
                return '';

            case 'zipcode':
                if (userType === 'contractor' && !value.trim()) return 'Required';
                return '';


            default:
                return '';
        }
    }, [formData.password, userType]);

    useEffect(() => {
        const errors: Record<string, string> = {};
        const requiredFields = ['firstName', 'lastName', 'email', 'confirmEmail', 'phone', 'password', 'confirmPassword'];

        if (userType === 'contractor' && !isInvite) {
            requiredFields.push('address', 'city', 'state', 'zipcode');
        }

        requiredFields.forEach(field => {
            const error = validateField(field, formData[field as keyof typeof formData]);
            if (error) {
                errors[field] = error;
            }
        });

        setFieldErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0 && agreedToTerms);
    }, [formData, agreedToTerms, validateField, userType, isInvite]);



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFieldErrors(prev => ({...prev, [name]: ''}));
        if (name === 'email') {
            setEmailError('');
        }

        if (name === 'phone') {
            const normalizedPhone = normalizePhoneInput(value, formData.phone);
            setFormData(prev => ({...prev, [name]: normalizedPhone}));
        } else {
            setFormData(prev => ({...prev, [name]: value}));
        }

        setErrorMessage('');
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setFormData(prev => ({...prev, email: value}));

        if (value && !validateEmail(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
        setErrorMessage('');
    };

    const handleCountryChange = (selected: { value: string; label: string } | null) => {
        setFormData(prev => ({
            ...prev,
            country: selected,
            state: null,
        }));

        if (selected?.value) {
            onCountryChange(selected.value);
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'];
        if (userType === 'contractor' && !isInvite) {
            requiredFields.push('address', 'city', 'state', 'zipcode');
        }

        requiredFields.forEach(field => {
            const error = validateField(field, formData[field as keyof typeof formData]);
            if (error) {
                errors[field] = error;
            }
        });

        if (formData.email && !validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (formData.confirmEmail && formData.confirmEmail !== formData.email) {
            errors.confirmEmail = 'Emails do not match';
        }


        if (formData.password && formData.password.length < 12) {
            errors.password = 'Password must be at least 12+ characters';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        if (!agreedToTerms) {
            setErrorMessage('Please agree to the Terms of Service and Privacy Policy');
            setIsLoading(false);
            return;
        }

        if (!validateForm()) {
            setIsLoading(false);

            const firstErrorField = Object.keys(fieldErrors)[0];
            if (firstErrorField) {
                scrollToField(firstErrorField);
            }
            return;
        }

        try {
            const queryParams = new URLSearchParams(window.location.search);
            const randId = queryParams.get('id');

            let userData: any = {
                userType: isInvite ? 'client' : userType,
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.replace(/\D/g, ''),
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            };

            if (isInvite && randId) {
                userData = {
                    ...userData,
                    rand_id: randId,
                    userType: 'client',
                    website: '',
                    companyId: companyId,
                };
            } else {
                userData = {
                    ...userData,
                    company: userType === 'client' ? formData.company : undefined,
                    website: userType === 'client' ? formData.website : undefined,
                    address: userType === 'contractor' ? formData.address : undefined,
                    address2: userType === 'contractor' ? formData.address2 : undefined,
                    country: formData.country,
                    state: formData.state,
                    city: formData.city,
                    zipcode: formData.zipcode,
                    referredPersonName: formData.referredPersonName || undefined,
                };
            }

            if (userType === 'contractor' && !isInvite && !formData.state?.label) {
                setErrorMessage('State is required for contractors');
                setIsLoading(false);
                return;
            }

            const result = await dispatch<any>(registerUser(userData));

            if (result.success && result.data) {
                onClose();
                onShowSignIn();

                if (result.data.message === 'Registration Success. Please check your email to activate your account.') {
                    Notification('success', {
                        message: result.data.message,
                    });
                }
            } else {
                setErrorMessage(result.message || 'Registration failed');
            }
        } catch (error: any) {
            console.error(error);
            const errorMsg = error.response?.data?.message || 'An error occurred during registration';
            setErrorMessage(errorMsg);
            Notification('error', {
                message: errorMsg,
            });
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        console.log("Selected country value:", formData.country?.value);
    }, [formData.country]);


    const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const resendLinkForVerify = (email: string) => {
        if (!email) {
            Notification('warning', {
                message: 'Type your email first!',
            });
        } else {
            console.log('Resend verification email to:', email);
            Notification('info', {
                message: 'Verification email sent!',
            });
        }
    };
    const isCanada = formData.country?.value === "Canada"


    if (!isOpen) return null;

    return (
        <div className="modal_block landing_modals showed">
            <div className="modal_container">
                <div className="modal_head">
                    <button
                        className="close_btn icon_close"
                        aria-label="close"
                        onClick={onClose}
                    ></button>
                </div>
                <div className="modal_body" ref={modalBodyRef}>
                    <div className="modal_title">
                        {isInvite ? 'Complete Your Registration' : 'Create Your Free Account'}
                    </div>
                    <div className="modal_description">
                        {isInvite ? `You have been invited by "${companyName}"` : 'Welcome!'}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="fields_group">
                            <div className="field_col" ref={setFieldContainerRef('firstName')}>
                                <label className="hidden_label" htmlFor="FirstName">First Name</label>
                                <div className="field_block">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="FirstName"
                                        maxLength={50}
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        onClick={handleFieldClick('firstName')}
                                        disabled={isInvite}
                                        required
                                    />
                                </div>
                                {fieldErrors.firstName && (
                                    <div className="field_error">{fieldErrors.firstName}</div>
                                )}
                            </div>

                            <div className="field_col" ref={setFieldContainerRef('lastName')}>
                                <label className="hidden_label" htmlFor="LastName">Last Name</label>
                                <div className="field_block">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="LastName"
                                        maxLength={50}
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        onClick={handleFieldClick('lastName')}
                                        disabled={isInvite}
                                        required
                                    />
                                </div>
                                {fieldErrors.lastName && (
                                    <div className="field_error">{fieldErrors.lastName}</div>
                                )}
                            </div>

                            <div className="field_col" ref={setFieldContainerRef('email')}>
                                <label className="hidden_label" htmlFor="Email">Email</label>
                                <div className="field_block">
                                    <input
                                        type="email"
                                        name="email"
                                        id="Email"
                                        maxLength={50}
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleEmailChange}
                                        onClick={handleFieldClick('email')}
                                        disabled={isInvite}
                                        required
                                    />
                                </div>
                                {(fieldErrors.email || emailError) && (
                                    <div className="field_error">{fieldErrors.email || emailError}</div>
                                )}
                            </div>

                            <div className="field_col" ref={setFieldContainerRef('confirmEmail')}>
                                <label className="hidden_label" htmlFor="ConfirmEmail">Confirm Email</label>
                                <div className="field_block">
                                    <input
                                        type="email"
                                        name="confirmEmail"
                                        id="ConfirmEmail"
                                        maxLength={50}
                                        placeholder="Confirm Email"
                                        value={formData.confirmEmail}
                                        onChange={handleInputChange}
                                        onClick={handleFieldClick('confirmEmail')}
                                        required
                                    />
                                </div>
                                {fieldErrors.confirmEmail && (
                                    <div className="field_error">{fieldErrors.confirmEmail}</div>
                                )}
                            </div>


                            <div className="field_col" ref={setFieldContainerRef('phone')}>
                                {userType === "contractor" ? (
                                    <label className="hidden_label" htmlFor="Phone">Company Phone</label>
                                ) : (
                                    <label className="hidden_label" htmlFor="Phone">Contact Phone</label>
                                )}
                                <div className="field_block">
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="Phone"
                                        maxLength={20}
                                        placeholder={userType === "contractor" ? "Mobile Phone" : "Contact Phone"}
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        onClick={handleFieldClick('phone')}
                                        disabled={isInvite}
                                        required
                                    />
                                </div>
                                {fieldErrors.phone && (
                                    <div className="field_error">{fieldErrors.phone}</div>
                                )}
                            </div>

                            {userType === 'contractor' && !isInvite && (
                                <>
                                    <div className="field_col" ref={setFieldContainerRef('address')}>
                                        <label className="hidden_label" htmlFor="Address">Street</label>
                                        <div className="field_block">
                                            <input
                                                type="text"
                                                name="address"
                                                id="Address"
                                                maxLength={150}
                                                placeholder="Street"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                onClick={handleFieldClick('address')}
                                                required
                                            />
                                        </div>
                                        {fieldErrors.address && (
                                            <div className="field_error">{fieldErrors.address}</div>
                                        )}
                                    </div>

                                    <div className="field_col" ref={setFieldContainerRef('address2')}>
                                        <label className="hidden_label" htmlFor="Address2">Suite, Apt, Etc.</label>
                                        <div className="field_block">
                                            <input
                                                type="text"
                                                name="address2"
                                                id="Address2"
                                                maxLength={150}
                                                placeholder="Suite, Apt, Etc."
                                                value={formData.address2}
                                                onChange={handleInputChange}
                                                onClick={handleFieldClick('address2')}
                                            />
                                        </div>
                                    </div>

                                    <div className="field_col" ref={setFieldContainerRef('city')}>
                                        <label className="hidden_label" htmlFor="City">City</label>
                                        <div className="field_block">
                                            <input
                                                type="text"
                                                name="city"
                                                id="City"
                                                maxLength={50}
                                                placeholder="City"
                                                value={formData.city?.value || ""}
                                                onChange={(e) =>
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        city: {value: e.target.value, label: e.target.value},
                                                    }))
                                                }
                                                onClick={handleFieldClick('city')}
                                                required
                                            />
                                        </div>
                                        {fieldErrors.city && (
                                            <div className="field_error">{fieldErrors.city}</div>
                                        )}
                                    </div>

                                    <div className="field_col" ref={setFieldContainerRef('country')}>
                                        <label className="hidden_label" htmlFor="Country">Country</label>
                                        <div className="field_block">
                                            <CustomSelect
                                                id="Country"
                                                name="country"
                                                options={countries}
                                                value={formData.country}
                                                onChange={handleCountryChange}
                                                placeholder={isLoadingCountries ? "Loading countries..." : "Select Country"}
                                                isClearable
                                                isDisabled={isLoadingCountries}
                                                isLoading={isLoadingCountries}
                                                onMenuOpen={() => scrollToField('country')}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="field_col" ref={setFieldContainerRef('state')}>
                                        <label className="hidden_label" htmlFor="State">State</label>
                                        <div className="field_block">
                                            <CustomSelect
                                                id="State"
                                                name="state"
                                                options={states}
                                                value={formData.state}
                                                onChange={(selected: any) =>
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        state: selected,
                                                    }))
                                                }
                                                placeholder={
                                                    isLoadingStates
                                                        ? "Loading..."
                                                        : isCanada
                                                            ? "Select Province"
                                                            : "Select State"
                                                }
                                                isClearable
                                                isDisabled={isLoadingStates || !formData.country}
                                                isLoading={isLoadingStates}
                                                onMenuOpen={() => scrollToField('state')}
                                                required
                                            />
                                        </div>
                                        {fieldErrors.state && (
                                            <div className="field_error">{fieldErrors.state}</div>
                                        )}
                                    </div>

                                    <div className="field_col" ref={setFieldContainerRef('zipcode')}>
                                        <label className="hidden_label" htmlFor="ZipCode">Zip</label>
                                        <div className="field_block">
                                            <input
                                                type="text"
                                                name="zipcode"
                                                id="ZipCode"
                                                maxLength={10}
                                                placeholder={isCanada ? "Postal Code" : "Zip"}
                                                value={formData.zipcode}
                                                onChange={handleInputChange}
                                                onClick={handleFieldClick('zipcode')}
                                                required
                                            />
                                        </div>
                                        {fieldErrors.zipcode && (
                                            <div className="field_error">{fieldErrors.zipcode}</div>
                                        )}
                                        {errorMessage && (
                                            <div className="error_hint" style={{maxHeight: '60px', marginBottom: '20px'}}>
                                                {errorMessage}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {userType === "client" && !isInvite && (
                                <>
                                    <div className="field_col" ref={setFieldContainerRef('company')}>
                                        <label className="hidden_label" htmlFor="Company">Company</label>
                                        <div className="field_block">
                                            <input
                                                type="text"
                                                name="company"
                                                id="Company"
                                                placeholder="Company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                onClick={handleFieldClick('company')}
                                            />
                                        </div>
                                    </div>

                                    <div className="field_col" ref={setFieldContainerRef('website')}>
                                        <label className="hidden_label" htmlFor="Website">Website</label>
                                        <div className="field_block">
                                            <input
                                                type="text"
                                                name="website"
                                                id="Website"
                                                placeholder="Website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                onClick={handleFieldClick('website')}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {userType === "client" && (
                                <div className="field_col" ref={setFieldContainerRef('referredPersonName')}>
                                    <label className="hidden_label" htmlFor="ReferredPerson">Referred Person</label>
                                    <div className="field_block">
                                        <input
                                            type="text"
                                            name="referredPersonName"
                                            id="ReferredPerson"
                                            placeholder="Referred Person"
                                            value={formData.referredPersonName}
                                            onChange={handleInputChange}
                                            onClick={handleFieldClick('referredPersonName')}
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="field_col" ref={setFieldContainerRef('password')}>
                                <label className="hidden_label" htmlFor="Password">Password</label>
                                <div className="field_block">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="Password"
                                        maxLength={50}
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        onClick={handleFieldClick('password')}
                                        required
                                    />
                                    <button
                                        type="button"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className={showPassword ? "icon_hide" : "icon_show"}
                                        onClick={() => togglePasswordVisibility('password')}
                                    ></button>
                                </div>

                                {/* Правила пароля прямо под инпутом */}
                                <div className="password_rules">
                                    {[
                                        { char: 'a', desc: 'lower', test: /[a-z]/ },
                                        { char: 'A', desc: 'upper', test: /[A-Z]/ },
                                        { char: '1', desc: 'number', test: /[0-9]/ },
                                        { char: '#&?', desc: 'symbol', test: /[!@#$%^&*(),.?":{}|<>]/ },
                                        { char: '12+', desc: 'chars', test: /.{12,}/ },
                                    ].map((rule, idx) => {
                                        const passed = rule.test.test(formData.password);
                                        return (
                                            <div key={idx} className="rule">
                                                <div className="rule_char" style={{color: passed ? 'green' : 'white'}}>{rule.char}</div>
                                                <div className="rule_desc" style={{color: passed ? 'green' : 'white'}}>
                                                    {rule.desc}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {fieldErrors.password && (
                                    <div className="field_error">{fieldErrors.password}</div>
                                )}
                            </div>

                            <div className="field_col" ref={setFieldContainerRef('confirmPassword')}>
                                <label className="hidden_label" htmlFor="ConfirmPassword">Confirm Password</label>
                                <div className="field_block">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        id="ConfirmPassword"
                                        maxLength={50}
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        onClick={handleFieldClick('confirmPassword')}
                                        required
                                    />
                                    <button
                                        type="button"
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        className={showConfirmPassword ? "icon_hide" : "icon_show"}
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                    ></button>
                                </div>
                                {fieldErrors.confirmPassword && (
                                    <div className="field_error">{fieldErrors.confirmPassword}</div>
                                )}
                            </div>
                        </div>
                        <div className="field_col">



                            <label className="check_block">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                />
                                <span className="check_btn">I have read and agreed to the </span>
                                <a
                                    href="https://www.sourcew9.com/209G_Terms_Updated.2025.01.01.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{textDecorationLine: 'underline', color: '#e87b68'}}
                                >
                                    Terms of Service
                                </a>
                                {', '}
                                <a
                                    href="https://www.sourcew9.com/Privacy_Policy.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{textDecorationLine: 'underline', color: '#e87b68'}}
                                >
                                    Customer Privacy Policy
                                </a>
                            </label>
                        </div>

                        {errorMessage === 'Registration Success. Please check your email to activate your account.' && (
                            <div style={{textAlign: 'center', marginBottom: '15px'}}>
                                <p
                                    style={{
                                        cursor: 'pointer',
                                        color: 'rgb(38, 52, 113)',
                                        textDecorationLine: 'underline',
                                        fontSize: '12px',
                                    }}
                                    onClick={() => resendLinkForVerify(formData.email)}
                                >
                                    Resend Email
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`valid_btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading || !isFormValid || !agreedToTerms}
                        >
                            {isLoading ? 'Creating Account...' : 'Agree & Sign up'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpStep2Modal;