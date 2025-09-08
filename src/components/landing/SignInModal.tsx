import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShowForgotPassword: () => void;
    onLoginSuccess?: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onShowForgotPassword, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const success = await login(formData.email, formData.password);
            if (success) {
                if (onLoginSuccess) onLoginSuccess();
                onClose();
            }
        } catch (err: any) {
            setErrorMessage(err.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                    <div className="modal_title">Sign in</div>
                    <div className="modal_description">Welcome Back!</div>
                    
                    {errorMessage && (
                        <div className="error_hint" style={{ maxHeight: '60px', marginBottom: '20px' }}>
                            {errorMessage}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="fields_group">
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
                                        onClick={togglePasswordVisibility}
                                    ></button>
                                </div>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className={`valid_btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
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