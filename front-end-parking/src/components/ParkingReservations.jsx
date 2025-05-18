import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/blocks/ParkingReservations.less';

const ParkingReservations = () => {
    const navigate = useNavigate();
    const [parkingSpots, setParkingSpots] = useState(1);

    const handleIncrement = () => {
        setParkingSpots(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (parkingSpots > 1) {
            setParkingSpots(prev => prev - 1);
        }
    };
    const handleButtonClick = () => {
        navigate("/parking-status");
    };

    return (
        <div className="parking-reservations">
            <div className="parking-reservations__container">
                <h1 className="parking-reservations__title">Бронирование парковки</h1>

                <div className="parking-reservations__form">
                    <div className="parking-reservations__form-group">
                        <div className="input-group">
                            <label>Имя</label>
                            <input
                                type="text"
                                placeholder="Ваше имя"
                            />
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Ваш email"
                            />
                        </div>

                        <div className="input-group">
                            <label>Телефон</label>
                            <input
                                type="tel"
                                placeholder="+7(999)999-9999"
                            />
                        </div>

                        <div className="input-group spots-input">
                            <label>Кол-во парковочных мест</label>
                            <div className="spots-counter">
                                <button onClick={handleDecrement}>-</button>
                                <input
                                    type="number"
                                    value={parkingSpots}
                                    min="1"
                                    readOnly
                                />
                                <button onClick={handleIncrement}>+</button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Дата заезда</label>
                            <input
                                type="date"
                            />
                        </div>

                        <div className="input-group">
                            <label>Дата выезда</label>
                            <input
                                type="date"
                            />
                        </div>

                        <button className="submit-btn" onClick={handleButtonClick}>Забронировать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParkingReservations;