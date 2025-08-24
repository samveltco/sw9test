import React from 'react';

interface SignUpStep1ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onShowSignIn: () => void;
}

const SignUpStep1Modal: React.FC<SignUpStep1ModalProps> = ({ isOpen, onClose, onNext, onShowSignIn }) => {
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
                            <span className="inner_title">I want to</span>
                        </div>
                        <div className="field_col">
                            <label className="radio_block">
                                <input type="radio" name="radio" />
                                <span className="radio_btn">Find Work</span>
                            </label>
                        </div>
                        <div className="field_col">
                            <label className="radio_block">
                                <input type="radio" name="radio" />
                                <span className="radio_btn">Hire a Contractor</span>
                            </label>
                        </div>
                    </div>
                    <a href="#" className="valid_btn" onClick={(e) => { e.preventDefault(); onNext(); }}>Continue</a>
                </div>
                <div className="modal_footer">
                    <a href="#" className="btn_modal" onClick={(e) => { e.preventDefault(); onShowSignIn(); }}>Sign in</a>
                </div>
            </div>
        </div>
    );
};

export default SignUpStep1Modal; 