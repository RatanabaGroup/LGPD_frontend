import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastrar from './pages/cadastro/cadastro';
import VerPerfil from './pages/verPerfil';
import MaisInformacoes from './pages/informacoes';
import Auth from "./components/auth";
import { useUserContext } from "./context/userContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, loading } = useUserContext();

  return (
    <div className="App">
      { loading ? 
        <h2 className='carregando'>Carregando...</h2> 
      : 
        <>{ user ? <Router>
            <Routes>
             <Route path="/" element={<VerPerfil />} />
              <Route path="/maisInformacoes" element={<MaisInformacoes />} />
             </Routes>
          </Router> : <Router>  <Routes>
            <Route path="/" element={<Auth />} /></Routes>
            </Router>}</> }
    </div>
  ); 
}

export default App;
