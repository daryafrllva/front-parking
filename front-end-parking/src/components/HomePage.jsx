import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModelViewer from './test';
import { Link } from 'react-router-dom';
import Car from '../assets/png/car.png';

function HomePage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [style, setStyle] = React.useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timer);
    })

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        const shadowX = (centerX - x) / 10;
        const shadowY = (centerY - y) / 10;

        setStyle({
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            boxShadow: `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.3)`,
            transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'rotateX(0deg) rotateY(0deg)',
            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
        });
    };

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
        {/* <ModelViewer /> */}
            <div className="home__image_container">
            <img 
                src={Car}
                alt="Машина"
                className='home__image'
                style={style}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                />
            </div>

            <div className="home__btn-container">
                <button className="home__btn" onClick={handleButtonClick}>Забронировать парковочное место</button>
            </div>
        </div></>
    );
}

export default HomePage;