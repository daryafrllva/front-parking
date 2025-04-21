import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/svg-sprite/logo.svg';
import LoginBtn from '../assets/png/login.png';

function Header() {
    return (
      <header className="page-header">
          <div className="page-header__container">
              <Link to="/">
              <img 
                src ={Logo}
                alt = "Логотип"
                className='page-header__logo'
                />
              </Link>
              <Link to="/login" className="page-header__join-btn">
                  <span className="page-header__join-btn-text">Войти</span>
              </Link>
          </div>
      </header>
    );
}

export default Header;