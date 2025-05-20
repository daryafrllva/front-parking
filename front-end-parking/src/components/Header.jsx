import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/svg-sprite/logo.svg';
import LoginBtn from '../assets/png/login.png';
import AuthPopup from './AuthPopup';

function Header() {

    const [showAuthPopup, setShowAuthPopup] = useState(false);

    return (
        <>
      <header className="page-header">
          <div className="page-header__container">
              <Link to="/">
              <img 
                src ={Logo}
                alt = "Логотип"
                className='page-header__logo'
                />
              </Link>
              <Link  className="page-header__join-btn"
                     onClick={() => setShowAuthPopup(true)}>
                  <span className="page-header__join-btn-text">Войти</span>
              </Link>
          </div>
      </header>
            {showAuthPopup && (
                <AuthPopup onClose={() => setShowAuthPopup(false)} />
            )}
</>
    );
}

export default Header;