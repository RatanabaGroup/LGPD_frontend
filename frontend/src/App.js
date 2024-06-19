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
        <h2>Loading...</h2> 
      : 
        <>{ user ? <MaisInformacoes /> : <Auth />}</> }
    </div>
  );
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Cadastrar />} />
    //     <Route path="/verPerfil/:userId" element={<VerPerfil />} />
    //     <Route path="/maisInformacoes/:userId" element={<MaisInformacoes />} />
    //   </Routes>
    // </Router>
}

export default App;
