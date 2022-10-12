import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ handleRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(evt) {
    if (evt.target.name === "email") {
      setEmail(evt.target.value);
    } else if (evt.target.name === "password") {
      setPassword(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister({ email, password });
  }

  return (
    <>
      <AuthForm
        title="Регистрация"
        submitName="Зарегистрироваться"
        submit={handleSubmit}
        onChange={handleChange}
        email={email}
        password={password}
        nameForm="register"
      />
      <div className="login__details">
        <Link to="/sign-in" className="login__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
