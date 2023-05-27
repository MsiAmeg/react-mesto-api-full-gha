function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_large-image ${card.link? 'popup_opened' : ''}`}>
            <figure className="popup__container popup__container_figure">
                <img src={card.link} alt={card.name} className="popup__image"/>
                <figcaption className="popup__caption">{card.name}</figcaption>
                <button type="button" onClick={onClose} className="popup__close-button popup__close-button_large-image" aria-label="закрытие увеличенного изображения"></button>
            </figure>
        </div>
    );
}
export default ImagePopup;