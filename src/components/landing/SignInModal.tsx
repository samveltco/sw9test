import React from 'react';

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShowForgotPassword: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onShowForgotPassword }) => {
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
                    <div className="modal_title">Sign in</div>
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
                            <label className="hidden_label" htmlFor="Password">Password</label>
                            <div className="field_block">
                                <input 
                                    type="password" 
                                    name="Password" 
                                    id="Password" 
                                    maxLength={50} 
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                    </div>
                    <a href="#" className="valid_btn">Sign in</a>
                </div>
                <div className="modal_footer">
                    <a href="#" className="btn_modal" onClick={(e) => { e.preventDefault(); onShowForgotPassword(); }}>Forgot password ?</a>
                    <a href="#" className="btn_modal">Resend link for verify?</a>
                </div>
            </div>
        </div>
    );
};

export default SignInModal; 