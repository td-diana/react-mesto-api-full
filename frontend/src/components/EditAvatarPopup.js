import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "./useForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();

  const avatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      namePopup="popup-avatar"
      nameForm="avatar"
      id="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingTextBtn="Сохранение..."
      isDisabled={!isValid}
    >
      <input
        name="avatar"
        id="form-input-avatar-link"
        type="url"
        className="popup__input popup__input_avatar-link"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
        value={values.avatar || ""}
        onChange={handleChange}
      />
      <span
        className={`${
          errors.avatar
            ? "popup__input-error popup__input-error_active form-input-avatar-link-error"
            : "popup__input-error"
        }`}
      >
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
