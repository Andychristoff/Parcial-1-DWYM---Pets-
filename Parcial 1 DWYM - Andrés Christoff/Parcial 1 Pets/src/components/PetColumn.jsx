
import { Droppable } from 'react-beautiful-dnd';
import {initialState} from "./state/State"
import { deleteTask } from './state/StateManager';
import { reducer } from './state/State';
import React from "react"
import { type } from '@testing-library/user-event/dist/type';
import { useNavigate } from 'react-router-dom';


function PetColumn( { pet, reloadGames, dispatch, handleShowTaskModal2 } ) {

    const navigate = useNavigate();

    const handleDelete = async (id) => { 
        dispatch({type: "DELETE_TASK", payload: pet})
        try {
            console.log(id);
            const response = await deleteTask(dispatch, id);
            console.log("Respuesta:",response)
        } catch (error) {
            console.log("Fallo al borrar deporte");
            
        }
        
    }

    const useDetalles = () => {
        navigate("/"+pet.id)
    }
    
  

    return (
        <div className='task-column'>

            <img src={pet.photo}  style={{ width: '300px', height: 'auto' }} alt="" />
            <div style={{display:'flex'}}>
            <h2>{pet.name}</h2>
            <h2>-</h2>
            <h2>{pet.age}</h2>
            </div>
            <button onClick={() => handleShowTaskModal2(pet)}>
                Detalles
            </button> 
        </div>
    );
}

export default PetColumn;