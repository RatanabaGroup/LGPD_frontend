import  React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { useUserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';

const MaisInformacoes = () => {
    const [userId, setUserId] = useState("")
    const [dataNascimento, setDataNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [complemento, setComplemento] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { user, logoutUser } = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/usuario/atualizar`, {
                email: user.email,
                dataNascimento: dataNascimento,
                telefone: telefone,
                endereco: {
                    cep: cep,
                    logradouro: logradouro,
                    numero: numero,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                    complemento: complemento
                }
            });
            setUserId(response.data.data)
            if (response.status === 200) {
                setSuccessMessage("Informações atualizadas com sucesso!");
                setErrorMessage("");
                setDataNascimento("");
                setTelefone("");
                setCep("");
                setLogradouro("");
                setNumero("");
                setBairro("");
                setCidade("");
                setEstado("");
                setComplemento("");
                navigate(`/`); 
            }
        } catch (error) {
            setErrorMessage("Erro ao atualizar informações. Tente novamente.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="update-profile-container">
            <form className="update-profile-form" onSubmit={handleSubmit}>
                <h2>Cadastre mais alguns dados para completar seu perfil</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <label>
                    Data de Nascimento
                </label>
                    <input 
                        type="date" 
                        value={dataNascimento} 
                        onChange={(e) => setDataNascimento(e.target.value)} 
                        required 
                    />
                    <input 
                        placeholder="Telefone"
                        type="tel" 
                        value={telefone} 
                        onChange={(e) => setTelefone(e.target.value)} 
                        required 
                    />
                    <input 
                        placeholder="CEP"
                        type="text" 
                        value={cep} 
                        onChange={(e) => setCep(e.target.value)} 
                        required 
                    />
                    <input 
                        placeholder="Logradouro"
                        type="text" 
                        value={logradouro} 
                        onChange={(e) => setLogradouro(e.target.value)} 
                        required 
                    />
                    <input 
                        placeholder="Número"
                        type="text" 
                        value={numero} 
                        onChange={(e) => setNumero(e.target.value)} 
                        required 
                    />
                    <input 
                        placeholder="Bairro"
                        type="text" 
                        value={bairro} 
                        onChange={(e) => setBairro(e.target.value)} 
                        required 
                    />
                    <input 
                        placeholder="Cidade"
                        type="text" 
                        value={cidade} 
                        onChange={(e) => setCidade(e.target.value)} 
                        required 
                    />
                    <input 
                        placeholder="Estado"
                        type="text" 
                        value={estado} 
                        onChange={(e) => setEstado(e.target.value)} 
                        required 
                    />
                    <input 
                        placeholder="Complemento (opcional)"
                        type="text" 
                        value={complemento} 
                        onChange={(e) => setComplemento(e.target.value)} 
                    />
                <button className='content_button save' type="submit" >Atualizar Informações</button>
            </form>
        </div>
    );
};

export default MaisInformacoes;
