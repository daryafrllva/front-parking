import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import VhodModal from '../components/authorization/VhodModal';


function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [userData, setUserData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        telegramId: '',
        office: '',
    });
    const [reservationSuccess, setReservationSuccess] = useState(false);

    // Получаем данные из location.state или localStorage
    useEffect(() => {
        const justLoggedIn = localStorage.getItem('just_logged_in');
        const savedUserData = localStorage.getItem('userData');

        if (location.state) {
            const { userData: stateUserData, reservationSuccess: stateReservationSuccess } = location.state;
            if (stateUserData) {
                setUserData(stateUserData);
                localStorage.setItem('userData', JSON.stringify(stateUserData));
            }
            if (stateReservationSuccess) {
                setReservationSuccess(true);
            }
        } else if (savedUserData) {
            setUserData(JSON.parse(savedUserData));
        }

        if (justLoggedIn) {
            setShowWelcomeModal(true);
            localStorage.removeItem('just_logged_in');

            const timer = setTimeout(() => {
                setShowWelcomeModal(false);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate('/');
    };

    const officeNames = {
        main: 'ул. Советская, 78, Томск',
        branch1: 'ул. Николаева, 11, Новосибирск',
        branch2: 'ул. Гагарина, 14 (этаж 5), Омск'
    };

    return (
        <div className="profile-page">
            {showWelcomeModal && <VhodModal onClose={() => setShowWelcomeModal(false)} />}

            <div className="profile-container">
                <h1 className="profile-title">Профиль пользователя</h1>

                {reservationSuccess && (
                    <div className="success-message">
                        Ваша заявка на парковочное место успешно отправлена!
                    </div>
                )}

                <div className="profile-info">
                    <div className="profile-info-item">
                        <span className="info-label">ФИО:</span>
                        <span className="info-value">
                            {userData.lastName} {userData.firstName} {userData.middleName}
                        </span>
                    </div>

                    <div className="profile-info-item">
                        <span className="info-label">Telegram ID:</span>
                        <span className="info-value">{userData.telegramId || 'Не указан'}</span>
                    </div>

                    <div className="profile-info-item">
                        <span className="info-label">Офис:</span>
                        <span className="info-value">
                            {officeNames[userData.office] || 'Не выбран'}
                        </span>
                    </div>
                </div>

                <div className="profile-actions">
                    <button
                        className="edit-profile-btn"
                        onClick={() => navigate('/parking-reservations')}
                    >
                        Редактировать данные
                    </button>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;