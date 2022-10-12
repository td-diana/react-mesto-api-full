import React from "react";
import Popup from "./Popup";

function ImagePopup({ isOpen, onClose, card, isImagePopup }) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      isImagePopup={isImagePopup}
      namePopup="popup-image"
    >
      <div className="popup__img-box">
        <img src={card.link} className="popup__images" alt={card.name} />
        <p className="popup__title-img">{card.name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
