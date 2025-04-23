import React, { useEffect } from 'react';
import done from '../../assets/svg-sprite/done.svg'

const VhodModal = ({ onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 10000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="modal">
            <div className="modal__content">
                <div className="modal__body">
                    <h3>Вы успешно вошли в аккаунт <img
                        src={done}
                        alt="готово"
                        className="modal__body-img"
                    /></h3>

                </div>
            </div>
        </div>
    );
};

export default VhodModal;