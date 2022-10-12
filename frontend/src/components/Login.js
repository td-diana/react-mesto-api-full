import { useState } from "react";
import AuthForm from "./AuthForm";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(evt) {
    if (evt.target.name === "email") {
      setEmail(evt.target.value);
    } else if (evt.target.name === "password") {
      setPassword(evt.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <AuthForm
      title="Вход"
      submit={handleSubmit}
      onChange={handleChange}
      submitName="Войти"
      email={email}
      password={password}
      nameForm="login"
    />
  );
}

export default Login;
