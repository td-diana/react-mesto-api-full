import React from "react";

function AuthForm({
  title,
  submit,
  email,
  password,
  submitName,
  onChange,
  nameForm,
}) {
  return (
    <div className="login">
      <h2 className="login__title">{title}</h2>
      <form className="login__form" onSubmit={submit} name={nameForm}>
        <input
          className="login__input"
          placeholder="Email"
          value={email}          
          type="email"
          name="email"
          required
          onChange={onChange}
        />
        <input
          className="login__input"
          placeholder="Пароль"
          value={password}
          type="password"
          name="password"
          autoComplete="off"
          minLength="5"
          required
          onChange={onChange}
        />
        <button type="submit" className="login__button">
          {submitName}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
