import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import exit from '../../assets/svg-sprite/exit.svg';


export const CreatePasswordPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const password = watch("password", "");
    const getPasswordStrength = () => {
        if (password.length === 0) return '';
        if (password.length < 6) return "weak";
        if (password.length < 10) return "medium";
        return "strong";
    };

    const onSubmit = (data) => {
        localStorage.setItem('newPassword', data.password);
        localStorage.setItem('access_token', 'simulated_token_for_' + email);
        navigate('/parking-reservations');
    };

    return (
        <div className="login">
            <div className="login__body">
                <div className="login__container">
                    <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                        <Link to="/">
                            <img
                                src={exit}
                                alt="Крестик"
                                className="login__container-btn"
                            />
                        </Link>
                        <h1>Придумайте пароль</h1>

                        <div className="login__form-group">
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Пароль обязателен",
                                    minLength: {
                                        value: 6,
                                        message: "Пароль должен быть не менее 6 символов"
                                    }
                                })}
                                placeholder="Новый пароль"
                            />
                            {errors.password && (
                                <p className="login__form-error">{errors.password.message}</p>
                            )}

                            {/* Индикатор сложности пароля */}
                            <div className="password-strength-indicator">
                                <div
                                    className={`strength-bar ${
                                        password.length > 0 ? `strength-bar--${getPasswordStrength()}` : ''
                                    }`}
                                />
                            </div>

                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Подтвердите пароль",
                                    validate: value =>
                                        value === password || "Пароли не совпадают"
                                })}
                                placeholder="Подтвердите пароль"
                            />
                            {errors.confirmPassword && (
                                <p className="login__form-error">{errors.confirmPassword.message}</p>
                            )}

                            <button className="login__form__join-btn" type="submit">
                                Далее
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};