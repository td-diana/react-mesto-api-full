import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import headerLogo from "../images/logo.svg";

function Header({ userEmail, onLogOut }) {
  return (
    <header className="header">
      {/* <div className="header__logo"></div> */}
      <a href="/">
        <img
          className="header__logo"
          src={headerLogo}
          alt="логотип проект Место"
        />
      </a>
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__login-container">
              <p className="header__email">{userEmail}</p>
              <Link
                className="header__link-exit"
                to="/sign-in"
                onClick={onLogOut}
              >
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__title-auth" to="/sign-in">
              Вход
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__title-auth" to="/sign-up">
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
