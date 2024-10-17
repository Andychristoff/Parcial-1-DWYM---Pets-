
import PetColumn from './PetColumn';
import Button from 'react-bootstrap/Button';
import { DragDropContext } from 'react-beautiful-dnd';
import { updateTask } from './state/StateManager';
import ToggleThemeButton from './ToggleThemeButton';

function PetManager({ state, dispatch }) {

    const handleShowTaskModal = () => {
        dispatch({ type: 'UPDATE_SHOW_TASK_MODAL', payload: true });
    };

    const handleShowTaskModal2 = (pet) => {
        dispatch({ type: 'SET_TASK_TO_UPDATE', payload: pet });
        dispatch({ type: 'UPDATE_SHOW_TASK_MODAL', payload: true });
    };

    const handleOnDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        // Si el elemento fue movido a la misma columna, no hace nada
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Si el elemento fue movido a otra columna, actualiza el estado de la tarea
        const sourceTask = state.tasks.find(task => task.id === draggableId);
        sourceTask.status = destination.droppableId;
        updateTask(dispatch, sourceTask);
    };

    const handleReloadGames = (event) => {
        // TODO recargar list
        if (event) {
            console.log("RECARGO LISTA");
            
        } else {
            console.log("NO HAGO NADA")
        }
    }

    return (
        <div className={`task-manager ${state.theme}-theme`}>
            <h1 className='task-manager-title'>Mascotas en adopción</h1>
            <div className='task-manager-buttons'>
                <Button onClick={handleShowTaskModal}>
                    Agregar Mascota
                </Button>
                <ToggleThemeButton theme={state.theme} dispatch={dispatch} />
            </div>
            <div className='task-container'>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    {state.tasks.map((pet) => {
                        return <PetColumn 
                            key={pet.id}
                            pet={pet} 
                            dispatch={dispatch}
                            reloadGames={handleReloadGames}
                            handleShowTaskModal2={handleShowTaskModal2}
                        />;
                    })}
                </DragDropContext>
            </div>
        </div>
    );
}

export default PetManager;