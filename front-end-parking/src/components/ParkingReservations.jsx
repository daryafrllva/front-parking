import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/blocks/ParkingReservations.less';
import axios from 'axios';

const ParkingReservations = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        telegramId: '',
        office: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Требуется авторизация');
                setIsSubmitting(false);
                return;
            }

            const response = await axios.post(
                'http://your-django-backend/api/reservations/',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 201) {
                // Перенаправляем на страницу профиля с сохранением данных
                navigate("/profile", {
                    state: {
                        userData: formData,
                        reservationSuccess: true
                    }
                });
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            setError('Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="parking-reservations">
            <div className="parking-reservations__container">
                <form className="parking-reservations__form" onSubmit={handleSubmit}>
                    <h1 className="parking-reservations__title">Заполнение аккаунта</h1>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="parking-reservations__form-group">
                        <div className="input-group">
                            <label>Фамилия</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Иванов"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Имя</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Иван"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Отчество</label>
                            <input
                                type="text"
                                name="middleName"
                                placeholder="Иванович"
                                value={formData.middleName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Telegram-ID</label>
                            <input
                                type="text"
                                name="telegramId"
                                placeholder="@username"
                                value={formData.telegramId}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Офис</label>
                            <select
                                name="office"
                                value={formData.office}
                                onChange={handleChange}
                                className="input-select"
                                required
                            >
                                <option value="" disabled>Выберите офис</option>
                                <option value="main">ул. Советская, 78, Томск</option>
                                <option value="branch1">ул. Николаева, 11, Новосибирск</option>
                                <option value="branch2">ул. Гагарина, 14 (этаж 5), Омск</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Отправка...' : 'Отправить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ParkingReservations;