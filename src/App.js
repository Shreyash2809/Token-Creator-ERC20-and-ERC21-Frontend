import './App.css';
import ConnectWallet from './TokenCreation/ConnectWallet';
import  CreateToken  from './TokenCreation/CreateToken';

function App() {
  return (
    <div className="App">
      <ConnectWallet/>
     <CreateToken />
    </div>
  );
}

export default App;
