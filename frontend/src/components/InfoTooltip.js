import React from "react";
import successImg from '../images/success-registration.svg';
import failureImg from '../images/error-registration.svg';

function InfoTooltip({onClose, success, isOpen, text}) {
    return (
        <div className={`popup popup_registration ${isOpen ? 'popup_opened' : ''}`}>
            <figure className="popup__container">
                <img src={success ? successImg : failureImg} alt="изображение успеха или неудачи регистрации" className="popup__image_registration"/>
                <h1 className="popup__title_registration">{text}</h1>
                <button type="button" onClick={onClose} className="popup__close-button popup__close-button_registration" aria-label="закрытие уведомления о регистрации"></button>
            </figure>
        </div>
    );
}

export default InfoTooltip;