import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную для кнопки удаления
  const cardDeleteButtonClassName = `elements__icon-delete ${
    isOwn ? "" : "elements__icon-delete_status_hidden"
  }`;

// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = `elements__icon-like ${isLiked && 'elements__icon-like_mod_active'}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__card">      
      <img
        src={card.link}
        className="elements__img"
        alt={card.name}       
        onClick={handleCardClick}
        title="Открыть фото"
      />
   
      <div className="elements__inner-container">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>    
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        title="Удалить фото"
      ></button>
    </li>
  );
}

export default Card;
