import React from 'react';
import { Link } from 'react-router-dom';
import ModelViewer from './test';

function HomePage() {
    return (
        <>
        <div className="home__container">
        <ModelViewer />
            <div className="home__btn-container">
                <button className="home__btn" onClick={() => alert('Парковки нет пока!')}>Забронировать парковочное место</button>
            </div>
        </div></>
    );
}

export default HomePage;