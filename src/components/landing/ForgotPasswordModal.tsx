import React from 'react';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShowSignIn: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onShowSignIn }) => {
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
                    <div className="modal_title">Forgot Password?</div>
                    <div className="modal_description">Welcome Back!</div>
                    <div className="fields_group">
                        <div className="field_col">
                            <label className="hidden_label" htmlFor="Email">Email</label>
                            <div className="field_block">
                                <input 
                                    type="text" 
                                    name="company_wo_id" 
                                    id="Email" 
                                    maxLength={50} 
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="field_col">
                            <label className="radio_block">
                                <input type="radio" name="radio" />
                                <span className="radio_btn">Use phone number for verification</span>
                            </label>
                        </div>
                        <div className="field_col">
                            <label className="radio_block">
                                <input type="radio" name="radio" />
                                <span className="radio_btn">Use email address for verification</span>
                            </label>
                        </div>
                    </div>
                    <a href="#" className="valid_btn">Submit</a>
                </div>
                <div className="modal_footer">
                    <a href="#" className="btn_modal" onClick={(e) => { e.preventDefault(); onShowSignIn(); }}>Sign in</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal; 