import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {registerUser} from "../../store/actions/authActions";
import Select from "react-select";

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

    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        setErrorMessage('');
    };

    const handleCountryChange = (selected: { value: string; label: string } | null) => {
        setFormData(prev => ({
            ...prev,
            country: selected,
            state: null,
        }));

        if (selected?.value) {
            onCountryChange(selected?.value);
        }
    };

    useEffect(() => {
        if (!formData.country && countries.length > 0) {
            const firstCountry = countries[1];
            setFormData(prev => ({
                ...prev,
                country: firstCountry,
                state: null,
            }));


            onCountryChange(firstCountry.value);
        }
    }, [countries]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

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
                userType,
                firstName: formData.firstName || '',
                lastName: formData.lastName || '',
                email: formData.email || '',
                phone: formData.phone || '',
                address: formData.address || '',
                address2: formData.address2 || '',
                company: formData.company || '',
                city: formData.city || null,
                state: formData.state || null,
                country: formData.country || null,
                zipcode: formData.zipcode || '',
                password: formData.password || '',
                confirmPassword: formData.confirmPassword || '',
                website: formData.website || '',
                referredPersonName: formData.referredPersonName || '',
            };

            const result = await dispatch<any>(registerUser(userData));

            if (result.success && result.data) {
                onClose();
                onShowSignIn();
            } else {
                setErrorMessage('Registration failed');
            }
        } catch (error) {
            console.error(error);
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
                        <div className="error_hint" style={{maxHeight: '60px', marginBottom: '20px'}}>
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
                                {userType === "contractor" ? (
                                    <label className="hidden_label" htmlFor="Phone">Company Phone</label>
                                ) : (
                                    <label className="hidden_label" htmlFor="Phone">Contact Phone</label>
                                )}

                                {userType === "contractor" ? (
                                    <div className="field_block">
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="Phone"
                                            maxLength={20}
                                            placeholder="Mobile Phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                ) : (
                                    <div className="field_block">
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="Phone"
                                            maxLength={20}
                                            placeholder="Contact Phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                )}

                            </div>

                            {userType === 'contractor' && (
                                <div className="field_col">
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
                                            required={userType === 'contractor'}
                                        />
                                    </div>
                                </div>
                            )}

                            {userType === 'contractor' && (
                                <div className="field_col">
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
                                        />
                                    </div>
                                </div>
                            )}

                            {userType === 'contractor' && (
                                <div className="field_col">
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
                                            required={userType === "contractor"}
                                        />
                                    </div>
                                </div>
                            )}

                            {userType === 'contractor' && (
                                <div className="field_col">
                                    <label className="hidden_label" htmlFor="Country">Country</label>
                                    <div className="field_block">
                                        <Select
                                            id="Country"
                                            name="country"
                                            options={countries}
                                            value={formData.country}
                                            onChange={handleCountryChange}
                                            placeholder={isLoadingCountries ? "Loading countries..." : "Select Country"}
                                            isClearable
                                            isDisabled={isLoadingCountries}
                                            isLoading={isLoadingCountries}
                                            required={userType === "contractor"}
                                        />
                                    </div>
                                </div>
                            )}

                            {userType === 'contractor' && (
                                <div className="field_col">
                                    <label className="hidden_label" htmlFor="State">State</label>
                                    <div className="field_block">
                                        <Select
                                            id="State"
                                            name="state"
                                            options={states}
                                            value={formData.state}
                                            onChange={(selected) =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    state: selected,
                                                }))
                                            }
                                            placeholder={isLoadingStates ? "Loading states..." : "Select State"}
                                            isClearable
                                            isDisabled={isLoadingStates || !formData.country}
                                            isLoading={isLoadingStates}
                                            required={userType === "contractor"}
                                        />
                                    </div>
                                </div>
                            )}

                            {userType === 'contractor' && (
                                <div className="field_col">
                                    <label className="hidden_label" htmlFor="ZipCode">Zip</label>
                                    <div className="field_block">
                                        <input
                                            type="text"
                                            name="zipcode"
                                            id="ZipCode"
                                            maxLength={10}
                                            placeholder="Zip"
                                            value={formData.zipcode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {userType === "client" && (
                                <div className="field_col">
                                    <label className="hidden_label" htmlFor="Company">Company</label>
                                    <div className="field_block">
                                        <input
                                            type="text"
                                            name="company"
                                            id="Company"
                                            placeholder="Company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            )}

                            {userType === "client" && (
                                <div className="field_col">
                                    <label className="hidden_label" htmlFor="Website">Website</label>
                                    <div className="field_block">
                                        <input
                                            type="text"
                                            name="website"
                                            id="Website"
                                            placeholder="Website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            )}

                            {userType === "client" && (
                                <div className="field_col">
                                    <label className="hidden_label" htmlFor="ReferredPerson">Referred Person</label>
                                    <div className="field_block">
                                        <input
                                            type="text"
                                            name="referredPersonName"
                                            id="ReferredPerson"
                                            placeholder="Referred Person"
                                            value={formData.referredPersonName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            )}

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
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                />
                                <span className="check_btn">I have read and agreed to the </span>
                                <a href="#" target="_blank" rel="noopener noreferrer">Term of Service, Customer Privacy
                                    Policy</a>
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