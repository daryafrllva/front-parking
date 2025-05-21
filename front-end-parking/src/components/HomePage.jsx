import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Car from '../assets/png/car.png';

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            // Показываем контент с анимацией после исчезновения лоадера
            const showTimer = setTimeout(() => setShowContent(true), 100);
            return () => clearTimeout(showTimer);
        }
    }, [isLoading]);

    const handleButtonClick = () => {
        navigate('/parking-reservations');
    };

    return (
        <>
        {isLoading && (
            <div className="home__loading-overlay">
                <div className="home__loading-text">Добро пожаловать на Т-Паркинг</div>
            </div>
        )}
        <div className={`home__container ${isLoading ? 'blured' : ''}`}>
            <div className={`home__text-container${showContent ? ' home__text-container--visible' : ''}`}>
                <h1 className='home__title'>С Т-Паркинг парковка — одно удовольствие!</h1>
                <p className='home__subtitle'>Бронируй парковочное место заранее и забудь о поиске стоянки по утрам. С Т-Паркинг твоё место всегда ждёт тебя у офиса — быстро, удобно и без лишних хлопот</p>
            </div>
            <div className={`home__image_container${showContent ? ' home__image_container--visible' : ''}`} style={{ background: 'none', boxShadow: 'none', borderRadius: 0, padding: 0 }}>
                <img 
                    src={Car}
                    alt="Машина"
                    className='home__image'
                    style={{
                        height: 'auto',
                        maxWidth: '95vw',
                        maxHeight: '65vh',
                        boxShadow: 'none',
                        borderRadius: 0,
                        objectFit: 'contain',
                        background: 'none'
                    }}
                />
            </div>
            <div className={`home__btn-container${showContent ? ' home__btn-container--visible' : ''}`}>
                <button className="home__btn" onClick={handleButtonClick}>Забронировать парковочное место</button>
            </div>
        </div>
        </>
    );
}

export default HomePage;