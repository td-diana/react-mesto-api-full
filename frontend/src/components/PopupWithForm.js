import React from "react";
import Popup from "./Popup";

function PopupWithForm({  
  nameForm,
  namePopup,
  isOpen,
  onClose,
  children,
  buttonText,
  onSubmit,
  title,
  isLoading,
  loadingTextBtn,
  id,
  isDisabled,
}) {
  return (
    <Popup isOpen={isOpen} namePopup={namePopup} onClose={onClose} id={id}>
      <form className="popup__form" name={nameForm} noValidate onSubmit={onSubmit}>
        <h2 className="popup__title">{title}</h2>
        {children}
        <fieldset className="popup__field">
          <button
            type="submit"
            className={`popup__button ${
              isDisabled && "popup__button_disabled"
            }`}
            disabled={isDisabled}
          >
            {isLoading ? loadingTextBtn : buttonText}
          </button>
        </fieldset>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
