import { useState } from 'react';
import './App.css';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="App">
      <div className="appGlass">
        <Sidebar selected={selected} setSelected={setSelected} />
        <MainDash selected={selected} setSelected={setSelected} />
        <RightSide/>
      </div>
    </div>
  );
}

export default App;
