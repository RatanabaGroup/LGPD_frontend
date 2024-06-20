import React, { useEffect, useState } from 'react';
import { useUserContext } from "../context/userContext";
import axios from 'axios';

const VerPerfil = () => {
    const { user, logoutUser } = useUserContext();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [datanascimento, setDatanascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [complemento, setComplemento] = useState("");

    useEffect(() => {
        console.log(user)
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/usuario/selecionar/${user.email}`);
                setNome(response.data.nome)
                setEmail(response.data.email)
                setTelefone(response.data.telefone)
                setDatanascimento(response.data.dataNascimento)
                setCep(response.data.endereco.cep)
                setLogradouro(response.data.endereco.logradouro)
                setNumero(response.data.endereco.numero)
                setBairro(response.data.endereco.bairro)
                setCidade(response.data.endereco.cidade)
                setEstado(response.data.endereco.estado)
                setComplemento(response.data.endereco.complemento)
            } catch (error) {
                console.error('Erro ao buscar dados do perfil:', error);
            }
        };

        fetchData();
    }, [user.email]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/usuario/atualizar/completo`, {
                userId: user.uid,
                nome: nome,
                email: user.email,
                emailNovo: email,
                telefone: telefone,
                dataNascimento: datanascimento,
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
            console.log('Dados atualizados com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar dados do perfil:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/usuario/${user.email}`)
            console.log('Dados atualizados com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar dados do perfil:', error);
        }
    };
    return (
        <div className="container-center">
            <div className='content'>
                <h1>Perfil</h1>

                <div className='profile'>
                    <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Data de Nascimento" value={datanascimento} onChange={(e) => setDatanascimento(e.target.value)} />
                    <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
                    <input type="text" placeholder="Logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
                    <input type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
                    <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                    <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    <input type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                    <input type="text" placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                </div>

                <button onClick={handleUpdate} className='content_button save'>Salvar Alterações</button>
                <button onClick={handleDelete} className='content_button delete'>Excluir Perfil</button>
                <button onClick={logoutUser} className='content_button logout'>Deslogar</button>
            </div>
        </div>
    );
};

export default VerPerfil;
