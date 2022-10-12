import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormWithValidation } from "./useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();  

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }
  
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [isOpen, currentUser, resetForm]);

  return (
    <PopupWithForm
      namePopup="popup-edit"
      nameForm="profile"
      id="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingTextBtn="Сохранение..."
      isDisabled={!isValid}
    >
      <input
        name="name"
        type="text"
        className="popup__input popup__field-name"
        id="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={values.name || ""}
        onChange={handleChange}
      />

      <span
        className={`${
          errors.name
            ? "popup__input-error popup__input-error_active name-error"
            : "popup__input-error"
        }`}
      >
        {errors.name}
      </span>

      <input
        name="about"
        type="text"
        className="popup__input popup__field-about-name"
        id="aboutname"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={values.about || ""}
        onChange={handleChange}
      />

      <span
        className={`${
          errors.about
            ? "popup__input-error popup__input-error_active aboutname-error"
            : "popup__input-error"
        }`}
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
