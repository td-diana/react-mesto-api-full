import React from 'react'
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "./useForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose, isLoading }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      namePopup="add"
      nameForm="add"
      id="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingTextBtn="Создание..."
      isDisabled={!isValid}
    >
      <input
        name="name"
        id="title"
        type="text"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span
        className={`${
          errors.name
            ? "popup__input-error popup__input-error_active"
            : "popup__input-error"
        }`}
      >
        {errors.name}
      </span>

      <input
        name="link"
        id="url"
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span
        className={`${
          errors.link
            ? "popup__input-error popup__input-error_active"
            : "popup__input-error"
        }`}
      >
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
