import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../types';

interface SignUpStep2ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShowSignIn: () => void;
    userType: 'contractor' | 'client';
    onRegistrationSuccess?: (user: User) => void;
}

const SignUpStep2Modal: React.FC<SignUpStep2ModalProps> = ({ 
    isOpen, 
    onClose, 
    onShowSignIn, 
    userType,
    onRegistrationSuccess 
}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobilePhone: '',
        streetAddress: '',
        suite: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const { register } = useAuth();

    useEffect(() => {
        if (isOpen) {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                mobilePhone: '',
                streetAddress: '',
                suite: '',
                city: '',
                state: '',
                country: '',
                zip: '',
                password: '',
                confirmPassword: ''
            });
            setShowPassword(false);
            setShowConfirmPassword(false);
            setErrorMessage('');
            setAgreedToTerms(false);
        }
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        // Валидация
        if (!agreedToTerms) {
            setErrorMessage('Please agree to the Terms of Service and Privacy Policy');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        try {
            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                mobilePhone: formData.mobilePhone,
                streetAddress: formData.streetAddress,
                suite: formData.suite,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                zip: formData.zip,
                userType: userType,
                password: formData.password
            };

            const result = await register(userData);
            
            if (result.success && result.user) {
                onRegistrationSuccess?.(result.user);
                onClose();
            } else {
                setErrorMessage(result.message || 'Registration failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

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
                <div className="modal_body">
                    <div className="modal_title">Create Your Free Account</div>
                    <div className="modal_description">Welcome!</div>
                    
                    {errorMessage && (
                        <div className="error_hint" style={{ maxHeight: '60px', marginBottom: '20px' }}>
                            {errorMessage}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="fields_group">
                            <div className="field_col">
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
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field_col">
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
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field_col">
                                <label className="hidden_label" htmlFor="Email">Email</label>
                                <div className="field_block">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="Email" 
                                        maxLength={50} 
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field_col">
                                <label className="hidden_label" htmlFor="MobilePhone">Mobile Phone</label>
                                <div className="field_block">
                                    <input 
                                        type="tel" 
                                        name="mobilePhone" 
                                        id="MobilePhone" 
                                        maxLength={20} 
                                        placeholder="Mobile Phone"
                                        value={formData.mobilePhone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field_col">
                                <label className="hidden_label" htmlFor="StreetAddress">Street Address</label>
                                <div className="field_block">
                                    <input 
                                        type="text" 
                                        name="streetAddress" 
                                        id="StreetAddress" 
                                        maxLength={150} 
                                        placeholder="Street Address"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field_col">
                                <label className="hidden_label" htmlFor="Suite">Suite, Apt, Etc.</label>
                                <div className="field_block">
                                    <input 
                                        type="text" 
                                        name="suite" 
                                        id="Suite" 
                                        maxLength={150} 
                                        placeholder="Suite, Apt, Etc."
                                        value={formData.suite}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="field_col">
                                <label className="hidden_label" htmlFor="City">City</label>
                                <div className="field_block">
                                    <input 
                                        type="text" 
                                        name="city" 
                                        id="City" 
                                        maxLength={50} 
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field_col">
                                <label className="hidden_label" htmlFor="State">State</label>
                                <div className="field_block">
                                    <select 
                                        name="state" 
                                        id="State"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select State</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field_col">
                                <label className="hidden_label" htmlFor="country">Country</label>
                                <div className="field_block">
                                    <select 
                                        name="country" 
                                        id="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="RU">Russia</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field_col">
                                <label className="hidden_label" htmlFor="Zip">Zip</label>
                                <div className="field_block">
                                    <input 
                                        type="text" 
                                        name="zip" 
                                        id="Zip" 
                                        maxLength={10} 
                                        placeholder="Zip"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field_col">
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
                                        required
                                    />
                                    <button 
                                        type="button"
                                        aria-label={showPassword ? "Hide password" : "Show password"} 
                                        className={showPassword ? "icon_hide" : "icon_show"}
                                        onClick={() => togglePasswordVisibility('password')}
                                    ></button>
                                </div>
                            </div>
                            <div className="field_col">
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
                                        required
                                    />
                                    <button 
                                        type="button"
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"} 
                                        className={showConfirmPassword ? "icon_hide" : "icon_show"}
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                    ></button>
                                </div>
                            </div>
                        </div>
                        <div className="field_col">
                            <label className="check_block">
                                <input 
                                    type="checkbox" 
                                    name="agreedToTerms"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                />
                                <span className="check_btn">I have read and agreed to the </span>
                                <a href="#" target="_blank" rel="noopener noreferrer">Term of Service, Customer Privacy Policy</a>
                            </label>
                        </div>
                        <button 
                            type="submit" 
                            className={`valid_btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
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