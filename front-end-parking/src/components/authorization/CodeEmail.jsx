import React, {useState} from 'react';
import {useForm} from "react-hook-form";


export const CodeEmail = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log("данные отправленные", data); // данные на бэк
    }

    return (
        <div className="login">

            <div className="login__body" >
                <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                    <h1>Введите код из письма,  <br/> отправленного на ваш e-mail</h1>
                    <input
                        {...register('email', {
                            required: 'Emai',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Некорректный email'
                            }
                        })}
                        type="code"
                        placeholder="xxx-xxx" />
                    {errors.email && <p className="error">{errors.email.message}</p>}

                    <button className="login__form__join-btn" type="submit">
                        Войти
                    </button>
                </form>
            </div>
        </div>

    )
}