import React, { useState } from 'react';

interface SignUpStep1ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNext: (userType: 'client' | 'contractor') => void;
    onShowSignIn: () => void;
}

const SignUpStep1Modal: React.FC<SignUpStep1ModalProps> = ({ isOpen, onClose, onNext, onShowSignIn }) => {
    const [userType, setUserType] = useState<'client' | 'contractor' | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUserTypeChange = (type: 'client' | 'contractor') => {
        setUserType(type);
        setErrorMessage('');
    };

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();

        if (!userType) {
            setErrorMessage('Please select your user type');
            return;
        }

        onNext(userType);
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

                    <form onSubmit={handleContinue}>
                        <div className="fields_group">
                            <div className="field_col">
                                <span className="inner_title">I want to</span>
                            </div>
                            <div className="field_col">
                                <label className="radio_block">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="contractor"
                                        checked={userType === 'contractor'}
                                        onChange={() => handleUserTypeChange('contractor')}
                                    />
                                    <span className="radio_btn">Find Work</span>
                                </label>
                            </div>
                            <div className="field_col">
                                <label className="radio_block">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="client"
                                        checked={userType === 'client'}
                                        onChange={() => handleUserTypeChange('client')}
                                    />
                                    <span className="radio_btn">Hire a Contractor</span>
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="valid_btn">Continue</button>
                    </form>
                </div>
                <div className="modal_footer">
                    <a href="#" className="btn_modal" onClick={(e) => { e.preventDefault(); onShowSignIn(); }}>Sign in</a>
                </div>
            </div>
        </div>
    );
};

export default SignUpStep1Modal;