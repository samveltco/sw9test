import React from 'react';

interface SignUpStep2ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShowSignIn: () => void;
}

const SignUpStep2Modal: React.FC<SignUpStep2ModalProps> = ({ isOpen, onClose, onShowSignIn }) => {
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
                    <div className="fields_group">
                        <div className="field_col">
                            <label className="hidden_label" htmlFor="FirstName">First Name</label>
                            <div className="field_block">
                                <input 
                                    type="text" 
                                    name="FirstName" 
                                    id="FirstName" 
                                    maxLength={50} 
                                    placeholder="First Name"
                                />
                            </div>
                        </div>

                        <div className="field_col">
                            <label className="hidden_label" htmlFor="LastName">Last Name</label>
                            <div className="field_block">
                                <input 
                                    type="text" 
                                    name="LastName" 
                                    id="LastName" 
                                    maxLength={50} 
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>

                        <div className="field_col">
                            <label className="hidden_label" htmlFor="Email">Email</label>
                            <div className="field_block">
                                <input 
                                    type="text" 
                                    name="Email" 
                                    id="Email" 
                                    maxLength={50} 
                                    placeholder="Email"
                                />
                            </div>
                        </div>

                        <div className="field_col">
                            <label className="hidden_label" htmlFor="MobilePhone">Mobile Phone</label>
                            <div className="field_block">
                                <input 
                                    type="text" 
                                    name="MobilePhone" 
                                    id="MobilePhone" 
                                    maxLength={20} 
                                    placeholder="Mobile Phone"
                                />
                            </div>
                        </div>

                        <div className="field_col">
                            <label className="hidden_label" htmlFor="StreetAddress">Street Address</label>
                            <div className="field_block">
                                <input 
                                    type="text" 
                                    name="StreetAddress" 
                                    id="StreetAddress" 
                                    maxLength={150} 
                                    placeholder="Street Address"
                                />
                            </div>
                        </div>
                        <div className="field_col">
                            <label className="hidden_label" htmlFor="Suite">Suite, Apt, Etc.</label>
                            <div className="field_block">
                                <input 
                                    type="text" 
                                    name="Suite" 
                                    id="Suite" 
                                    maxLength={150} 
                                    placeholder="Suite, Apt, Etc."
                                />
                            </div>
                        </div>
                        <div className="field_col">
                            <label className="hidden_label" htmlFor="City">City</label>
                            <div className="field_block">
                                <input 
                                    type="text" 
                                    name="City" 
                                    id="City" 
                                    maxLength={50} 
                                    placeholder="City"
                                />
                            </div>
                        </div>
                        <div className="field_col">
                            <label className="hidden_label" htmlFor="State">State</label>
                            <div className="field_block">
                                <select name="country" id="State">
                                    <option>Country</option>
                                    <option value="1">Value 1</option>
                                    <option value="2">Value 2</option>
                                    <option value="3">Value 3</option>
                                    <option value="4">Value 4</option>
                                </select>
                            </div>
                        </div>
                        <div className="field_col">
                            <label className="hidden_label" htmlFor="country">Country</label>
                            <div className="field_block">
                                <select name="country" id="country">
                                    <option>Country</option>
                                    <option value="1">Value 1</option>
                                    <option value="2">Value 2</option>
                                    <option value="3">Value 3</option>
                                    <option value="4">Value 4</option>
                                </select>
                            </div>
                        </div>
                        <div className="field_col">
                            <label className="hidden_label" htmlFor="Zip">Zip</label>
                            <div className="field_block">
                                <input 
                                    type="text" 
                                    name="City" 
                                    id="Zip" 
                                    maxLength={50} 
                                    placeholder="Zip"
                                />
                            </div>
                        </div>
                        <div className="field_col">
                            <label className="hidden_label" htmlFor="Password">Password</label>
                            <div className="field_block">
                                <input 
                                    type="password" 
                                    name="Password" 
                                    id="Password" 
                                    maxLength={50} 
                                    placeholder="Password"
                                />
                                <button aria-label="Show password" className="icon_show"></button>
                            </div>
                        </div>
                        <div className="field_col">
                            <label className="hidden_label" htmlFor="ConfirmPassword">Confirm Password</label>
                            <div className="field_block">
                                <input 
                                    type="password" 
                                    name="ConfirmPassword" 
                                    id="ConfirmPassword" 
                                    maxLength={50} 
                                    placeholder="Confirm Password"
                                />
                                <button aria-label="Show password" className="icon_show"></button>
                            </div>
                        </div>
                    </div>
                    <div className="field_col">
                        <label className="check_block">
                            <input type="checkbox" name="checkbox[]" />
                            <span className="check_btn">I have read and agreed to the </span>
                            <a href="#" target="_blank" rel="noopener noreferrer">Term of Service, Customer Privacy Policy</a>
                        </label>
                    </div>
                    <a href="#" className="valid_btn">Agree & Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default SignUpStep2Modal; 