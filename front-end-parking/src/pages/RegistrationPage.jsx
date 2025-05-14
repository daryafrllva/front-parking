

//!!
import React from 'react';
import { useForm } from 'react-hook-form';
import {Link} from "react-router-dom";


 export const RegistrationPage = () => {
     const {
         register,
         handleSubmit,
         formState: { errors }
     } = useForm();

     const onSubmit = (data) => {
         console.log(data);
     }


     return (
         <div className="registration">
             <div className="registration__body">
                 <div className="registration__container">
                     <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="registration__form">
                             <h1>Введите e-mail и Telegram ID <br/> для создания аккаунта</h1>
                             <input
                                 type="email"
                                 {...register("email", {
                                     required: "Email обязателен",
                                     pattern: {
                                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                         message: "Invalid email address"
                                     }
                                 })}
                                 placeholder="Email"
                             />
                             {errors.email && <p className="error">{errors.email.message}</p>}
                             <input
                                 type="password"
                                 {...register("password", {
                                     required: "password is required",
                                     minLength: {
                                         value: 7,
                                         message: "пароль должен содержать 6 символов и через - "
                                     },

                                 })}
                                 placeholder="Password"
                             />
                             {errors.telegramId && <p className="error">{errors.telegramId.message}</p>}

                             <button type="submit" className="registration__form__join-btn">Отправить</button>

                         </div>
                     </form>
                 </div>
             </div>
         </div>
     )
}