function Card({onCardLike, onCardDelete, onCardClick, card, isOwn, isLiked}) {
    function handleClick() {
        onCardClick(card);
    } 
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    } 

    return (
        <article className="card">
            <img src={card.link} onClick={handleClick} alt={card.name} className="card__image"/>
            <h2 className="card__title">{card.name}</h2>
            <div className="card__action">
                <button type="button" onClick={handleLikeClick} className={`card__like ${isLiked && 'card__like_active'}`} aria-label="лайк" />
                <span className="card__like-count">{card.likes.length}</span>
            </div>
            {isOwn && <button type="button" onClick={handleDeleteClick} className="card__trash" />}
        </article>
    );
}

export default Card;