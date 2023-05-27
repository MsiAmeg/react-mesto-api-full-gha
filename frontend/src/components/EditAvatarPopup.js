import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const inputRef = useRef();

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdateAvatar({avatar: inputRef.current.value});
    };

    useEffect(() => {
      inputRef.current.value = "";
    }, [isOpen]);


    return (
        <PopupWithForm onSubmit={handleSubmit} name='edit-avatar' title='Обновить аватар' buttonText='Сохранить' isOpen={isOpen} onClose={onClose}>
            <label className="popup__label">
              <input ref={inputRef} placeholder="ссылка на аватар" required className="popup__input popup__input_data_avatar" id="avatar-input" name="avatar" type="url" pattern="https?://.+"/>
              <span className="popup__input-error avatar-input-error"></span>
            </label>
          </PopupWithForm>
    );
}

export default EditAvatarPopup;