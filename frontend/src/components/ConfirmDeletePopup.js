import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, onSubmit, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm
      namePopup="popup-confirm"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}

      onSubmit={handleSubmit}
      
      isLoading={isLoading}
      loadingTextBtn="Удаление..."
    />
  );
}

export default ConfirmDeletePopup;
