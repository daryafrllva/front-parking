import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";


export const CodeEmail = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const location = useLocation();
    const navigate = useNavigate();
    const { email, isRegistration } = location.state || {};
    const [isLoading, setIsLoading] = useState(false);

    const handleResendCode = () => {
        console.log("Запрос на повторную отправку кода для:", email);
        // Здесь будет логика повторной отправки кода
    };

    const onSubmit = (data) => {
        setIsLoading(true);

        setTimeout(() => {
            console.log("Код подтверждения:", data.code);
            console.log("Email:", email);

            if (isRegistration) {
                navigate('/create-password', { state: { email } });
            } else {
                navigate('/reset-password', { state: { email } });
            }

            setIsLoading(false);
        }, 1000);
    }

    return (
        <div className="code-email-page">
            <div className="code-email-container">
                <form onSubmit={handleSubmit(onSubmit)} className="code-email-form">
                    <h1 className="code-email-title">Введите код из письма, <br/> отправленного на {email}</h1>
                    <div className="code-input-wrapper">
                        <input
                            {...register('code', {
                                required: 'Код обязателен',
                                pattern: {
                                    value: /^\d{3}-\d{3}$/,
                                    message: 'Формат кода: xxx-xxx'
                                }
                            })}
                            type="text"
                            placeholder="xxx-xxx"
                            className="code-input"
                        />
                        {errors.code && <p className="code-error">{errors.code.message}</p>}
                    </div>

                    <button
                        className="submit-button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Проверка...' : 'Продолжить'}
                    </button>

                    <div className="resend-code-section">
                        <span>Не получили код?</span>
                        <button
                            type="button"
                            className="resend-button"
                            onClick={handleResendCode}
                        >
                            Отправить повторно
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};