function PopupWithForm({isOpen, onClose, buttonText, name, title, children, onSubmit}) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
            <div className={`popup__container popup__container_${name}`}>
                <h2 className="popup__title">{title}</h2>
                <form onSubmit={onSubmit} className={`popup__form popup__form_${name}`} name={`${name}-form`}>
                    {children}
                    <button type="submit" className="popup__button popup__submit-button" aria-label="сохранение изменений">{buttonText}</button>
                </form>
                <button type="button" onClick={onClose} className={`popup__close-button popup__close-button_${name}`} aria-label="закрытие попапа" />
            </div>
        </div>
    );
}

export default PopupWithForm;