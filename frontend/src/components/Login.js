import { useContext, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import Header from "./Header";
import Unloggined from "./Unloggined";

function Login({onLogin}) {

    const context = useContext(LoginContext);
    const [input, setInput] = useState({email: '', password: ''});

    const onInputChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(input);
        setInput({email: '', password: ''});
    };

    return (
        <>
            <Header loggedIn={context.loggedIn} link={{text: 'Регистрация', url: '/sign-up'}} />
            <Unloggined handleSubmit={handleSubmit} title="Вход" btnText="Войти">
                    <input required minLength="3" maxLength="40" value={input.email} onChange={onInputChange} placeholder="Email" className="unloggined__input" name="email" />
                    <input type="password" required minLength="3" maxLength="40" value={input.password} onChange={onInputChange} placeholder="Пароль" className="unloggined__input" name="password" />
            </Unloggined>
        </>
    );
}

export default Login;