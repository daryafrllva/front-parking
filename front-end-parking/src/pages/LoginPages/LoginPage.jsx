
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; //Возможно не понадобится
import { Link, useNavigate } from "react-router-dom";
import VhodModal from '../../components/authorization/VhodModal';
import exit from '../../assets/svg-sprite/exit.svg';


export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const onSubmit = async (data) => {
        console.log("Данные формы:", data);
        localStorage.setItem('access_token', 'simulated_token');
        localStorage.setItem('just_logged_in', 'true');
        setShowSuccessModal(true);
        setTimeout(() => {
            navigate('/Profile');
        }, 100);
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
    };
    //Обработка отправки формы

        return (
            <div className="login">

                {showSuccessModal && <VhodModal onClose={handleModalClose} />}
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
                            <h1>Введите логин и пароль</h1>

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

                                <button className="login__form__join-btn" type="submit">
                                    Войти
                                </button>

                                <div className="login__form__join-link">
                                    <Link to="/enter-email">Забыли пароль?</Link>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        );
    };