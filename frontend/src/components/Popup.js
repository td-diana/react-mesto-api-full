import React from "react";

function Popup({ isOpen, namePopup, onClose, children, isImagePopup }) {
  React.useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscClose);

    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${namePopup} ${
        isOpen ? "popup_opened" : ""
      }`}
      onClick={handleOverlay}
    >
      <div
        className={`${
          isImagePopup ? "popup__container-img" : "popup__container"
        }`}
      >
        {children}
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Popup;
