import { useContext } from 'react';
import Card from './Card.js';
import Header from "./Header";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {CardsContext} from '../contexts/CardsContext.js';
import Footer from './Footer.js';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    const cards = useContext(CardsContext);

    return (
        <>
            <Header link={{text: 'Выйти', url: '/sign-in', handleLinkClick: props.signOut}}/>
            <main className="main">
                <section className="profile">
                    <div className="profile__avatar" onClick={props.onEditAvatar}>
                        <img src={currentUser.avatar} alt="фотография профиля" className="profile__picture" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <p className="profile__description">{currentUser.about}</p>
                        <button onClick={props.onEditProfile} type="button" className="profile__edit-button" aria-label="редактирование профиля"></button>
                    </div>
                    <button onClick={props.onAddPlace} type="button" className="profile__add-button" aria-label="добавление записи"></button>
                </section>
                <section className="cards-grid">
                    {cards.map((card) => {
                        return <Card isLiked={card.likes.some(i => i._id === currentUser._id)} isOwn={card.owner._id === currentUser._id} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} card={card} key={card._id}/>;
                    })}
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Main;