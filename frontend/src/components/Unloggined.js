import React from "react";
import { Link, useLocation } from "react-router-dom";

function Unloggined({handleSubmit, title, children, btnText}) {

    const location = useLocation();

    return (
        <main className="unloggined">
            <h2 className="unloggined__title">{title}</h2>
            <form onSubmit={handleSubmit} className={`unloggined__form`}>
                {children}
                <button type="submit" className="unloggined__button" aria-label="сохранение изменений">{btnText}</button>
            </form>
            {location.pathname === '/sign-up' && <Link to='/login-in' className="unloggined__link">Уже зарегистрированы? Войти</Link>}
        </main>
    );
}

export default Unloggined;