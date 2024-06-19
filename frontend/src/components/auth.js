import { useState } from "react";
import { useUserContext } from "../context/userContext";
import Signin from "../pages/cadastro";
import Cadastrar from "../pages/cadastro/cadastro";
import "../index.css";

export default function Auth() {
  const [index, setIndex] = useState(false);
  const toggleIndex = () => {
    setIndex((prevState) => !prevState);
  };

  const { signInWithGoogle, signInWithGithub } = useUserContext();

  return (
    <div className="container">
      {!index ? <Signin /> : <Cadastrar />}

      <button className="terceiros" onClick={signInWithGoogle}>
        Continuar com Google
      </button>
      <button className="terceiros" onClick={signInWithGithub}>
        Continuar com GitHub
      </button>

      <a onClick={toggleIndex}>
        {!index ? "Criar uma conta " : "Já possui uma conta? Entrar"}
      </a>
    </div>
  )
}