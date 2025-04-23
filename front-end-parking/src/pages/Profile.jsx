import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import VhodModal from '../components/authorization/VhodModal'

function Profile() {
    //добавить в app.jsx изменение шапки в случае входа. Добавить шапку после авторизации

    const navigate = useNavigate();
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    useEffect(() => {

        const justLoggedIn = localStorage.getItem('just_logged_in');

        if (justLoggedIn) {
            setShowWelcomeModal(true);
            localStorage.removeItem('just_logged_in');

            const timer = setTimeout(() => {
                setShowWelcomeModal(false);
            }, 10000); // 10 секунд

            return () => clearTimeout(timer);
        }
    }, []);


    return (

        <div>
            {showWelcomeModal && <VhodModal onClose={() => setShowWelcomeModal(false)} />}
            <h1>Профиль</h1>
            <p>Добро пожаловать в ваш профиль!</p>
        </div>
    );
}

export default Profile;