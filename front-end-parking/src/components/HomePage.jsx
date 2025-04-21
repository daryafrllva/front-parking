import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="home__container">
            <div class="home__btn-container">
                <button class="home__btn" onClick={() => alert('Парковки нет пока!')}>Забронировать парковочное место</button>
            </div>
        </div>
    );
}

export default HomePage;