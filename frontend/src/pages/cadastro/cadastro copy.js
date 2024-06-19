import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Cadastrar = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [termo, setTermo] = useState(false);
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
            
            const response = await axios.post('http://localhost:3000/usuario/cadastro', {
                nome: nome,
                email: email,
                senha: senha,
                termo: termo
            });

            if (response.status === 200) {
                setSuccessMessage("Cadastro realizado com sucesso!");
                setErrorMessage("");
                setNome("");
                setEmail("");
                setSenha("");
                setTermo(false);
                navigate(`/maisInformacoes/${userId}`); //id do usuario logado
            }
        } catch (error) {
            setErrorMessage("Erro ao realizar o cadastro. Tente novamente.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Cadastro</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <label>
                    Nome:
                    <input 
                        type="text" 
                        name="nome" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Senha:
                    <input 
                        type="password" 
                        name="senha" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        name="termsAccepted" 
                        checked={termo} 
                        onChange={(e) => setTermo(e.target.checked)} 
                        
                    />
                    Aceito os termos e condições
                </label>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default Cadastrar;
