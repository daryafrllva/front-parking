
import React from 'react';
import { useForm } from 'react-hook-form'; //Возможно не понадобится
import { Link } from "react-router-dom";


export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();



    const onSubmit = async (data) => {
        console.log("Данные формы:", data);
    }; //Обработка отправки формы

        return (
            <div className="login">
                <div className="login__body">


                    <div className="login__container">
                        <h1>Введите логин и пароль</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="login__form">


                            <div className="login__form-group">

                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email обязателен",
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: "Некорректный email"
                                        }
                                    })}
                                    placeholder="e-mail"


                                />
                                {errors.email && (
                                    <p className="login__form-error">{errors.email.message}</p>
                                )}

                                <br />
                                <input

                                    type="password"
                                    {...register("password", {
                                        required: "Пароль обязателен",
                                        minLength: {
                                            value: 6,
                                            message: "Пароль должен быть не менее 6 символов"
                                        }
                                    })}
                                    placeholder="password"


                                />
                                {errors.password && (
                                    <p className="login__form-error">{errors.password.message}</p>
                                )}

                                {errors.root && (
                                    <p className="login__form-error">{errors.root.message}</p>
                                )}

                                <button className="login__join-btn" type="submit">
                                    Войти
                                </button>

                                <div className="login__join-btn">
                                    <Link to="/enter-email">Забыли пароль?</Link>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        );
    };