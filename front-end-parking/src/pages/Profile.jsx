import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import VhodModal from '../components/authorization/VhodModal';
import exitIcon from '../assets/svg-sprite/exitAuth.svg';

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

    const officeNames = {
        main: 'ул. Советская, 78, Томск',
        branch1: 'ул. Николаева, 11, Новосибирск',
        branch2: 'ул. Гагарина, 14 (этаж 5), Омск'
    };

    // Загрузка данных при монтировании
    useEffect(() => {
        const justLoggedIn = localStorage.getItem('just_logged_in');
        const savedUserData = localStorage.getItem('userData');

        if (location.state?.userData) {
            const userDataFromState = location.state.userData;
            setUserData(userDataFromState);
            localStorage.setItem('userData', JSON.stringify(userDataFromState));
        } else if (savedUserData) {
            setUserData(JSON.parse(savedUserData));
        }

        if (location.state?.reservationSuccess) {
            setReservationSuccess(true);
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

    const handleNavigateToParking = () => {
        navigate('/parking');
    };

    return (
        <div className="profile-page-bg">
            {showWelcomeModal && <VhodModal onClose={() => setShowWelcomeModal(false)} />}

            <div className="profile-page__container">
                <button className="profile-exit-btn" onClick={handleLogout}>
                    <img src={exitIcon} alt="Выйти" />
                </button>

                <div className="profile-header">
                    <p className="container-text">Профиль пользователя</p>
                </div>

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
                        className="profile-action-btn profile-action-btn--primary"
                        onClick={handleNavigateToParking}
                    >
                        Выбрать парковочное место
                    </button>

                    <button
                        className="profile-action-btn profile-action-btn--secondary"
                        onClick={() => navigate('/edit-profile')}
                    >
                        Редактировать данные
                    </button>
                </div>

                <a
                    href="mailto:support@tbank.ru"
                    className="profile-support-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Техподдержка
                </a>
            </div>
        </div>
    );
}

export default Profile;