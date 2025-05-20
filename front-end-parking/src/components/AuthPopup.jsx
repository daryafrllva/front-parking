import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPopup = ({ onClose }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        onClose();
        navigate(path);
    };

    return (
        <div className="auth-popup-overlay">
            <div className="auth-popup">
                <h2>У вас уже есть аккаунт?</h2>
                <div className="auth-popup-buttons">
                    <button
                        className="auth-popup-btn"
                        onClick={() => handleNavigation('/login')}
                    >
                        Войти
                    </button>
                    <button
                        className="auth-popup-btn"
                        onClick={() => handleNavigation('/registration')}
                    >
                        Зарегистрироваться
                    </button>
                </div>
                <button className="auth-popup-close" onClick={onClose}>

                </button>
            </div>
        </div>
    );
};

export default AuthPopup;