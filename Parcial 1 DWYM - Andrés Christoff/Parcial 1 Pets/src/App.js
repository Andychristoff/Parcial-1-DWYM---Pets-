import { useEffect, useReducer } from 'react';
import { initialState, reducer } from './components/state/State';
import { fetchTasks } from './components/state/StateManager';
import PetManager from './components/PetManager';
import TaskModal from './components/modals/TaskModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import './App.css';
import Home from './components/Home';



function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
