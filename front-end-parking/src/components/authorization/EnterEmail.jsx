import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const EnterEmail = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Отправленные данные:", data);
        // Передаем email в состояние навигации
        navigate('/code-email', { state: { email: data.email } });
    }

    return (
        <div className="login">
            <div className="login__body">
                <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                    <h1>Введите e-mail адрес <br/> вашего аккаунта</h1>
                    <input
                        {...register('email', {
                            required: 'Email обязателен',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Некорректный email'
                            }
                        })}
                        type="email"
                        placeholder="e-mail"
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}

                    <button className="login__form__join-btn" type="submit">
                        Далее
                    </button>
                </form>
            </div>
        </div>
    );
};