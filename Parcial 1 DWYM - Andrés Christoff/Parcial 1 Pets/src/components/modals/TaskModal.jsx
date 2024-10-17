import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addTask, updateTask } from '../state/StateManager';
import { deleteTask } from '../state/StateManager';

function TaskModal({ state, dispatch }) {

    const [id, setId] = useState(state.taskToUpdate ? state.taskToUpdate.id : '');
    const [name, setName] = useState(state.taskToUpdate ? state.taskToUpdate.title : '');
    const [description, setDescription] = useState(state.taskToUpdate ? state.taskToUpdate.description : '');
    const [age, setAge] = useState(state.taskToUpdate ? state.taskToUpdate.players : '');
    const [type, setType] = useState(state.taskToUpdate ? state.taskToUpdate.categories : '');
    const [characteristics, setCharacteristics] = useState(state.taskToUpdate ? state.taskToUpdate.categories : '');
    const [photo, setPhoto] = useState(state.taskToUpdate ? state.taskToUpdate.categories : '');

    

   /* const formatDateFromApi = (date) => {
        if (!date) return '';
        const dateArray = date.split('/');
        return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    };

    const formatDateForApi = (date) => {
        if (!date) return '';
        const dateArray = date.split('-');
        return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
    };*/
    const handleClose = () => {
        dispatch({ type: 'UPDATE_SHOW_TASK_MODAL', payload: false });
        dispatch({ type: 'SET_TASK_TO_UPDATE', payload: null });
    };

    const handleDelete = async (id) => { 

        dispatch({type: "DELETE_TASK", payload: state.taskToUpdate})
        handleClose()
        try {
            console.log(id);
            const response = await deleteTask(dispatch, id);
            console.log("Respuesta:",response)
        } catch (error) {
            console.log("Fallo al borrar deporte");
        }
        
    }

    const handleSubmit = () => {
        const pets = {
            id,
            name,
            description,
            age,
            type,
            characteristics,
            photo
        };
        if (state.taskToUpdate) {
            updateTask(dispatch, pets);
            dispatch({
                type: "UPDATE_TASK",
                payload: pets
            })
        } else {
            addTask(dispatch, pets);
            dispatch({
                type: "ADD_TASK",
                payload: pets
            })
        }
        handleClose();
    };


    useEffect(() => {
        setName(state.taskToUpdate ? state.taskToUpdate.name : '');
        setAge(state.taskToUpdate ? state.taskToUpdate.age : '');
        setId(state.taskToUpdate ? state.taskToUpdate.id : '');
        setDescription(state.taskToUpdate ? state.taskToUpdate.description : '');
        setType(state.taskToUpdate ? state.taskToUpdate.type : '');
        setPhoto(state.taskToUpdate ? state.taskToUpdate.photo : '');
        setCharacteristics(state.taskToUpdate ? state.taskToUpdate.characteristics : '');
    }, [state.taskToUpdate]);

    return (
        <Modal show={state.showTaskModal} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{state.taskToUpdate ? 'Edita tu Mascota' : 'PUBLICA UNA MASCOTA'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Age</Form.Label>
                        <Form.Control as="select" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Prioridad">
                            <option value="">-</option>
                            <option value="Cachorro">Cachorro</option>
                            <option value="Adulto">Adulto</option>
                            <option value="Senior">Senior</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="textarea" value={type} onChange={(e) => setType(e.target.value)} placeholder='Type' />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Characteristics</Form.Label>
                        <Form.Control as="textarea" value={characteristics} onChange={(e) => setCharacteristics(e.target.value)} placeholder='Characteristics' />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control as="textarea" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder='Photo URL' />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Aceptar
                </Button>
                <Button onClick={() => handleDelete(id)}>
                    Adoptar Mascota
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskModal;