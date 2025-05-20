import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import exit from '../assets/svg-sprite/exit.svg';

export const RegistrationPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue
    } = useForm();
    const navigate = useNavigate();
    const [showEmailProviders, setShowEmailProviders] = useState(false);
    const [emailPrefix, setEmailPrefix] = useState('');

    const emailProviders = [
        { name: 'Gmail', domain: '@gmail.com' },
        { name: 'Rambler', domain: '@rambler.ru' },
        { name: 'Yandex', domain: '@yandex.ru' },
        { name: 'Mail.ru', domain: '@mail.ru' },
        { name: 'Другая почта', domain: '' }
    ];

    const handleEmailPrefixChange = (e) => {
        const value = e.target.value;
        setEmailPrefix(value);
        if (value.includes('@')) {
            setShowEmailProviders(false);
        } else {
            setShowEmailProviders(true);
        }
    };

    const selectProvider = (domain) => {
        setValue('email', emailPrefix + domain);
        setShowEmailProviders(false);
    };

    const onSubmit = (data) => {
        if (!data.email.includes('@')) {
            setError('email', {
                type: 'manual',
                message: 'Пожалуйста, выберите почтовый сервис'
            });
            return;
        }

        localStorage.setItem('userEmail', data.email);
        console.log('Email сохранен:', data.email);
        navigate('/login');
    };

    return (
        <div className="registration">
            <div className="registration__body">
                <div className="registration__container">
                    <form onSubmit={handleSubmit(onSubmit)} className="registration__form">
                        <Link to="/">
                            <img src={exit} alt="Крестик" className="registration__container-btn" />
                        </Link>
                        <h1>Введите e-mail для создания аккаунта</h1>

                        <div className="registration__form-group">
                            <div className="email-input-wrapper">
                                <input
                                    type="text"
                                    {...register("email", {
                                        required: "Email обязателен",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Некорректный email"
                                        }
                                    })}
                                    placeholder="e-mail"
                                    onChange={handleEmailPrefixChange}
                                    autoComplete="email"
                                />
                                {showEmailProviders && (
                                    <div className="email-providers-dropdown">
                                        {emailProviders.map((provider, index) => (
                                            <div
                                                key={index}
                                                className="provider-option"
                                                onClick={() => selectProvider(provider.domain)}
                                            >
                                                {provider.name} {provider.domain && `(${provider.domain})`}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.email && (
                                <p className="registration__form-error">
                                    {errors.email.message}
                                </p>
                            )}

                            <button type="submit" className="registration__form__join-btn">
                                Далее <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1166_5278)" fill="none">
                                    <path d="M15.997 8.57534C15.9773 8.33903 15.8195 8.14211 15.6027 8.06334L5.17449 4.44001C4.95765 4.36124 4.72109 4.42032 4.56339 4.57786C4.40568 4.73539 4.34654 4.9717 4.4254 5.18831L8.05261 15.6054C8.13146 15.822 8.32859 15.9795 8.56515 15.9992C8.58486 15.9992 8.60457 15.9992 8.60457 15.9992C8.82142 15.9992 9.01855 15.8811 9.11712 15.6842L10.6153 12.8682L12.5669 14.8374C12.6852 14.9556 12.8232 15.0146 12.9809 15.0146C13.1386 15.0146 13.2963 14.9556 13.3948 14.8374L14.8142 13.4196C14.9325 13.3014 14.9916 13.1636 14.9916 13.006C14.9916 12.8485 14.9325 12.691 14.8142 12.5925L12.8429 10.643L15.6816 9.14641C15.8984 9.02825 16.0167 8.81164 15.997 8.57534Z" fill="#010101" />
                                    <path d="M2.021 1.21141C1.78444 0.975104 1.40989 0.975104 1.19305 1.21141C0.956485 1.44772 0.956485 1.82187 1.19305 2.03848L2.43497 3.27908C2.55325 3.39723 2.71096 3.4563 2.84895 3.4563C2.98694 3.4563 3.14464 3.39723 3.26292 3.27908C3.49948 3.04277 3.49948 2.66862 3.26292 2.45201L2.021 1.21141Z" fill="#010101" />
                                    <path d="M5.48957 2.60907C5.54871 2.88476 5.78527 3.08168 6.06125 3.08168C6.10068 3.08168 6.1401 3.08168 6.17953 3.06199C6.49494 3.00291 6.71178 2.68784 6.65264 2.37277L6.29781 0.482333C6.23867 0.167261 5.92326 -0.0493516 5.60785 0.00972444C5.29244 0.0688005 5.0756 0.383873 5.13473 0.698945L5.48957 2.60907Z" fill="#010101" />
                                    <path d="M2.59215 5.50383L0.699693 5.14937C0.384284 5.0903 0.0688742 5.30691 0.00973485 5.62198C-0.0494044 5.93705 0.16744 6.25213 0.482849 6.3112L2.37531 6.66566C2.41473 6.66566 2.45416 6.68535 2.49359 6.68535C2.76957 6.68535 3.02584 6.48843 3.06527 6.21274C3.1244 5.85829 2.90756 5.56291 2.59215 5.50383Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1166_5278">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            </button>

                            <div className="registration__form__join-link">
                                Уже есть аккаунт? <Link to="/login">Войти</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};