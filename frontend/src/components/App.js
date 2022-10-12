import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { register, login, checkToken } from "../utils/ApiAuth";

function App() {
  // открытие попапа редактирования профиля
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);  
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
    // открытие попапа удаления карточки
 const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);
   // данные карточки на полный экран
  const [selectedCard, setSelectedCard] = useState({});
   // данные для удалённой карточки
   const [cardDelete, setCardDelete] = useState({});
  // карточки
  const [cards, setCards] = useState([]);
  // данные пользователя
  const [currentUser, setCurrentUser] = useState({});

  const [isLoadingAvatarPopup, setLoadingAvatarPopup] = useState(false);
  const [isLoadingEditPopup, setLoadingEditPopup] = useState(false);
  const [isLoadingAddPopup, setLoadingAddPopup] = useState(false);
  const [isLoadingDeletePopup, setLoadingDeletePopup] = useState(false);
  const [isRegistrationSuccess, setRegistrationSuccess] = useState(false);

// стейты для входа
  const [loggedIn, setLoggedIn] = useState(false);  
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((data) => {
          if (data) {
            setUserEmail(data.email);
            setLoggedIn(true);            
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  // eslint-disable-next-line
  }, []);  

  // если залогинены - получаем карточки и информацию о пользователе
    useEffect(() => {
      if (loggedIn) {        
        api.getAllNeededData()
          .then(([dataUserInfo, dataCards]) => {
            setCurrentUser(dataUserInfo);
            setCards(dataCards);
          })
          .catch((err) => console.log(err))          
      }
    }, [loggedIn])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function onCardClick(data) {
    setSelectedCard(data);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false);
  }

   // функция постановки и снятия лайка
   function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    if (!isLiked) {
      api.setLike(card)
        .then(newCard => {
          setCards(state => state.map(c => c._id === card._id ? newCard : c))
        })
        .catch(err => console.log(err))
      } else {
        api.deleteLike(card)
        .then(newCard => {
          setCards(state => state.map(c => c._id === card._id ? newCard : c))
        })
        .catch(err => console.log(err))
      }
  }
 
  function handleClickCardDelete(data) {
    setCardDelete(data);
    setConfirmDeletePopupOpen(true);
  }

  function handleCardDelete() {
    setLoadingDeletePopup(true);
    api.deleteCard(cardDelete)
      .then(() => {        
        setCards(state => state.filter(item => item._id !== cardDelete._id))
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setLoadingDeletePopup(false))
  }

  function onUpdateUser(userData) {
    setLoadingEditPopup(true);
    api
      .setUserInfoApi(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingEditPopup(false);
      });
  }

  function onUpdateAvatar(userData) {
    setLoadingAvatarPopup(true);
    api
      .handleUserAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingAvatarPopup(false);
      });
  }

  // отправка новой карточки и обновление стейта
  function handleAddPlaceSubmit(data) {
    setLoadingAddPopup(true);
    api
      .addUserCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingAddPopup(false);
      });
  }

  function handleRegister({ email, password} ) {
    register(email, password)
      .then(data => {
        if (data) {
        setInfoTooltipOpen(true);
        // setLoggedIn(true);
        // setUserEmail(email);
        setRegistrationSuccess(true);
        // setInfoTooltipOpen(true);
        navigate("/sign-in");
        }
      })
      .catch(err => {
        setInfoTooltipOpen(true);
        setRegistrationSuccess(false);
        console.log(err);
      });
  } 

  function handleLogin({ email, password }) {
    login(email, password)
      .then((jwt) => {
        if (jwt.token) {
          setUserEmail(email);
          setLoggedIn(true);
          localStorage.setItem("jwt", jwt.token);          
          navigate("/");
        }
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setRegistrationSuccess(false);
        console.log(err);
      });
  } 

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setUserEmail({
      email: "",
    });
    setLoggedIn(false);
  }

   return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} onLogOut={handleLogOut} />
        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}/>
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />}/>
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} />}/>          
          <Route          
            path="/"
            element={              
              <ProtectedRoute loggedIn={loggedIn}>
                <Main           
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardDelete={handleClickCardDelete}
                  onCardClick={onCardClick}
                  handleCardLike={handleCardLike}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />         
        </Routes>
       
        <Footer />        
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
          isLoading={isLoadingAvatarPopup}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={onUpdateUser}
          isLoading={isLoadingEditPopup}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoadingAddPopup}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isLoadingDeletePopup}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          isImagePopup={selectedCard}
        />
        <InfoTooltip
          namePopup="infoTool"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isRegistrationSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
