import { useRef } from "react";
import { useUserContext } from "../../context/userContext";
import logo2 from "../../assets/logocompleta.png";
import "./index.css";
import { toast } from "react-toastify";

export default function Signin() {
  const emailRef = useRef();
  const psdRef = useRef();
  const { signInUser, forgotPassword } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = psdRef.current.value;
    if (email && password) signInUser(email, password);
  }

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email)
      forgotPassword(email).then(() => {
        emailRef.current.value = "";
      });
  }

  return (
    <div className="container-center">
      <div className="sign">
        <img src={logo2} alt="Logo Ratanaba" />

        <form onSubmit={onSubmit}>
          <h1>Login</h1>
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Senha" ref={psdRef} />
          <button className='sign_button' type="submit">Entrar</button>

          <a onClick={forgotPasswordHandler}>Esqueci minha senha</a>
        </form>
      </div>
    </div>
  )
}