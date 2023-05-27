import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [input, setInput] = useState({cardTitle: '', imageUrl: ''});

    const onInputChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({name: input.cardTitle, link: input.imageUrl});
    };

    useEffect(() => {
      setInput({cardTitle: '', imageUrl: ''});
    }, [isOpen]);

    return (
        <PopupWithForm onSubmit={handleSubmit} name='add-card' title='Новое место' buttonText='Создать' isOpen={isOpen} onClose={onClose}>
            <label className="popup__label">
              <input value={input.cardTitle} onChange={onInputChange} type="text" placeholder="Название" required className="popup__input popup__input_data_card-title" id="cardName-input" name="cardTitle" minLength="2" maxLength="30"/>
                <span className="popup__input-error cardName-input-error"></span>
            </label>
            <label className="popup__label">
              <input value={input.imageUrl} onChange={onInputChange} placeholder="Ссылка на картинку" required className="popup__input popup__input_data_image" id="cardUrl-input" name="imageUrl" type="url" pattern="https?://.+"/>
                <span className="popup__input-error cardUrl-input-error"></span>
            </label>
          </PopupWithForm>
        );
};
export default AddPlacePopup;