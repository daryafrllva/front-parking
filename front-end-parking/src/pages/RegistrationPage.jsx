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
        navigate('/code-email', { state: { email: data.email, isRegistration: true } });
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
                                Далее
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