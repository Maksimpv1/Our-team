import { Main } from './components/main/main';
import {  HashRouter as Router, Routes, Route } from 'react-router-dom';

import './index.scss'
import { Card } from './components/main/cards/card/card';
import { LoginForm } from './components/login/login';
import { Registration } from './components/registr/registration';
import { NotFoundPage } from './components/notFound/notFound';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={ <Main/> }/>
          <Route path="/Card/:id" element={<Card/>}/>
          <Route path="/Login" element={<LoginForm/>}/>
          <Route path="/Registration" element={<Registration/>}/>
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
