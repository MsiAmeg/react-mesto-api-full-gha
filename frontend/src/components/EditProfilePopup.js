import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    
    const currentUser = useContext(CurrentUserContext);
    const [input, setInput] = useState({fullName: '', description: ''});

    const onInputChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }; 

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdateUser({name: input.fullName, about: input.description});
    };

    useEffect(() => {
        setInput({fullName: currentUser.name, description: currentUser.about});
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm onSubmit={handleSubmit} name='edit-profile' title='Редактировать профиль' buttonText='Сохранить' isOpen={isOpen} onClose={onClose}>
            <label className="popup__label">
              <input value={input.fullName} onChange={onInputChange} type="text" placeholder="Имя" required className="popup__input popup__input_data_name" id="name-input" name="fullName" minLength="2" maxLength="40"/>
              <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__label">
              <input value={input.description} onChange={onInputChange} type="text" placeholder="О себе" required className="popup__input popup__input_data_description" id="description-input" name="description" minLength="2" maxLength="200"/>
              <span className="popup__input-error description-input-error"></span>
            </label>
          </PopupWithForm>
    );
}

export default EditProfilePopup;