import Main from './Main.js';
import Login from './Login.js';
import Register from './Register.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { useState, useEffect } from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import api from '../utils/Api.js';
import authApi from '../utils/AuthApi.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardsContext } from '../contexts/CardsContext.js';
import { LoginContext } from '../contexts/LoginContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({email: ''});
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({ about: '', avatar: '', name: '', _id: '', cohort: ''});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [registrationPopup, setRegistrationPopup] = useState({isOpen: false, success: false, text: ''});
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      const userPromise = api.getUserData();
      const cardPromise = api.getInitialCards();

      Promise.all([userPromise, cardPromise])
        .then(([userPromise, cardPromise]) => {
          setCurrentUser({
            about: userPromise.about,
            avatar: userPromise.avatar,
            name: userPromise.name,
            _id: userPromise._id,
            cohort: userPromise.cohort
          });
          setCards(cardPromise);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);


  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((prevState) => prevState.map((prevCard) => prevCard._id === card._id ? newCard : prevCard));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then((newCard) => {
        setCards((prevState) => prevState.filter((prevCard) => prevCard._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateUser = ({ name, about }) => {
    api.setUserData({ name, about })
      .then((updatedUser) => {
        setCurrentUser({
          ...currentUser,
          about: updatedUser.about,
          name: updatedUser.name
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api.setUserAvatar({ avatar })
      .then((updatedAvatar) => {
        setCurrentUser({
          ...currentUser,
          avatar: updatedAvatar.avatar
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api.setCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setRegistrationPopup({...registrationPopup, isOpen: false});
  }

  const userLoggined = () => {
    setLoggedIn(true);
  }
  const signOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt){
      authApi.validateUserData(jwt)
      .then(res => {
        setLoggedIn(true);
        navigate('/', {replace: true});
        setUser({email: res.data.email});
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
    }
  }

  const handleRegister = (input) => {
    const {email, password} = input;
    authApi.registration(password, email)
    .then(res => {
        console.log(res);
        setRegistrationPopup({isOpen: true, success: true, text: 'Вы успешно зарегистрировались!'});
        navigate('/login-in', {replace: true});
    })
    .catch(err => {
        console.log(err);
        setRegistrationPopup({isOpen: true, success: false, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
    });
  };

  const handleLogin = (input) => {
    const {email, password} = input;
    authApi.signIn(password, email)
    .then(res => {
        console.log(res);
        userLoggined();
        localStorage.setItem('jwt', res.token);
        setRegistrationPopup({isOpen: true, success: true, text: 'Вход успешно произведен!'});
        navigate('/', {replace: true});
    })
    .catch(err => {
        console.log(err);
        setRegistrationPopup({isOpen: true, success: false, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
    });
  };

  return (
    <LoginContext.Provider value={{loggedIn, authApi, userLoggined, user}}>
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <div className="container">
            <Routes>
              <Route path='/sign-in' element={<Login onLogin={handleLogin} />}/>
              <Route path='/sign-up' element={<Register onRegister={handleRegister} />}/>
              <Route path='/' element={<ProtectedRoute element={Main} signOut={signOut} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onCardLike={handleCardLike} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />} />
              <Route path='*' element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
            </Routes>

            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

            <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

            <PopupWithForm name='delete-card' title='Вы уверены?' buttonText='Да' isOpen={false} />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <InfoTooltip onClose={closeAllPopups} success={registrationPopup.success} isOpen={registrationPopup.isOpen} text={registrationPopup.text}/>
          </div>
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
