import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import { LoginPage } from './pages/LoginPages/LoginPage';
import { EnterEmail } from './components/authorization/EnterEmail';
import Profile from './pages/Profile';
import {CodeEmail} from './components/authorization/CodeEmail';
import {RegistrationPage} from './pages/RegistrationPage';
import ParkingReservations from './components/ParkingReservations';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
            <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/Enter-email" element={<EnterEmail />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/code-email" element={<CodeEmail />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/parking-reservations" element={
                    //потом сделать защищённым, чтобы был доступен только после регестрации
                        <ParkingReservations />

                } />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;