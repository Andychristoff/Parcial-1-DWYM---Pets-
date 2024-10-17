import React from "react"
import { useEffect, useReducer } from 'react';
import { initialState, reducer } from './state/State';
import { fetchTasks } from './state/StateManager';
import PetManager from './PetManager';
import TaskModal from './modals/TaskModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import '../App.css';

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      fetchTasks(dispatch);
    }, []);
  
    return (
        <div className="App">
        <PetManager state={state} dispatch={dispatch} />
        <TaskModal state={state} dispatch={dispatch} />
        </div>
    )
}

export default Home;