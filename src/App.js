import './App.css';
import Home from "./views/home/Home";
import {Segment} from "semantic-ui-react";
import FormCliente from "./views/cliente/FormCliente";
import FormProduto from "./views/produto/FormProduto";
import FormEntregador from "./views/entregador/FormEntregador";
import Rotas from "./Rotas";

function App() {
  return (
    <div className="App">
      <Rotas/>

        <div style={{marginTop: '6%', position: 'fixed', bottom: 0, width: '100%'}}>
            <Segment vertical color='grey' size='tiny' textAlign='center'>
                &copy; 2025 - Projeto WEB IV - IFPE Jaboatão dos Guararapes
            </Segment>
        </div>

    </div>
  );
}

export default App;
