import React from 'react';
import { Link } from 'react-router-dom';

export const VhodModal = ({ onClose }) => {
    return (
        <div className="modal">
            <div className="modal__content">
                <div className="modal__body">
                <h3>Вы успешно вошли в аккаунт</h3>

                <div className="modal__footer">

                    <button onClick={onClose}>Закрыть</button>
                    <Link to="/support">Техподдержка</Link>
                </div>
                </div>
            </div>
        </div>
    );
};
export default VhodModal;