import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { LoginContext } from "../contexts/LoginContext";
import { useContext } from 'react';

function Header({link}) {

    const context = useContext(LoginContext);
    
    return (
    <header className="header">
        <img src={logo} alt="логотип" className="header__logo"/>
        <div className='header__user'>
            {context.loggedIn && <p className='header__text'>{context.user.email}</p>}
            <Link onClick={link.handleLinkClick} className='header__link' to={link.url}>{link.text}</Link>
        </div>
    </header>
    );
}

export default Header;