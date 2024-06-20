import { useState } from "react";
import { useUserContext } from "../context/userContext";
import Signin from "../pages/cadastro";
import { useNavigate } from 'react-router-dom';
import Cadastrar from "../pages/cadastro/cadastro";
import "../index.css";

export default function Auth() {
  const [index, setIndex] = useState(false);
  const navigate = useNavigate();
  const toggleIndex = () => {
    setIndex((prevState) => !prevState);
  };

  const { signInWithGoogle, signInWithGithub } = useUserContext();

  const signWithGoogle = () => {
    signInWithGoogle()
    navigate('/maisInformacoes')
  };
  const signWithGithub = () => {
    signInWithGithub()
    navigate('/maisInformacoes')
  };

  return (
    <div className="container">
      {!index ? <Signin /> : <Cadastrar />}

      <button className="terceiros" onClick={signWithGoogle}>
        Continuar com Google
      </button>
      <button className="terceiros" onClick={signWithGithub}>
        Continuar com GitHub
      </button>

      <a onClick={toggleIndex}>
        {!index ? "Criar uma conta " : "Já possui uma conta? Entrar"}
      </a>
    </div>
  )
}