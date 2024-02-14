import { Main } from './components/main/main';
import {  HashRouter as Router, Routes, Route  } from 'react-router-dom';

import './index.scss'
import { Card } from './components/main/cards/card/card';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={ <Main/> }/>
          <Route path="/Card/:id" element={<Card/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
