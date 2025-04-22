import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import { Link } from "react-router-dom";

export const EnterEmail = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log("данные отправленные", data); // данные на бэк
    }

    return (


        <div className="enter-container" style={{paddingTop: '147px'}}>
            <h1>Введите e-mail адрес <br/> вашего аккаунта</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('email', {
                        required: 'Email обязателен',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Некорректный email'
                        }
                    })}
                    type="email"
                    placeholder="e-mail" />
                {errors.email && <p className="error">{errors.email.message}</p>}

                <button type="submit">Войти</button>
            </form>
        </div>
    )
}