import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/userContext";
import logo2 from "../../assets/logocompleta.png";
import { toast } from "react-toastify";

const Cadastrar = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [termo, setTermo] = useState(false);
    const { registerUser } = useUserContext();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!termo) {
            setErrorMessage("Você precisa aceitar o termo.");
            return;
        }
        try {
            if (email && senha && nome) registerUser(email, senha, nome);
            const response = await axios.post('http://localhost:3000/usuario/cadastro', {
                nome: nome,
                email: email,
                termo: termo
            });

            if (response.status === 200) {
                setSuccessMessage("Cadastro realizado com sucesso!");
                setErrorMessage("");
                setNome("");
                setEmail("");
                setSenha("");
                setTermo(false);
                navigate(`/maisInformacoes`); 
            }
        } catch (error) {
            console.log(error)
            setErrorMessage("Erro ao realizar o cadastro. Tente novamente.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="container-center">
            <div className="content">
                <img src={logo2} alt="Logo Ratanaba" />
                <form className="register-form" onSubmit={handleSubmit}>
                    <h1>Cadastrar</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <input
                        placeholder="Nome"
                        type="text"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        placeholder="Senha"
                        type="password"
                        name="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    <label className='termo'>
                        <input
                           className='checkbox'
                            type="checkbox"
                            name="termsAccepted"
                            checked={termo}
                            onChange={(e) => setTermo(e.target.checked)}

                        />
                        <p>Aceito os termos e condições</p>
                    </label>
                    
                    <button className='content_button save' type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
};

export default Cadastrar;
