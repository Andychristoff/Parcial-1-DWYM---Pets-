const initialState = {
    tasks: [],
    statusArray: ['Backlog', 'To Do', 'In Progress', 'Blocked', 'Done'],
    showTaskModal: false,
    showTaskModalDetalle: false,
    taskToUpdate: null,
    theme: 'light'
};

const actionsTypes = {
    SET_TASKS: 'SET_TASKS',
    ADD_TASK: 'ADD_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    DELETE_TASK: 'DELETE_TASK',
    UPDATE_SHOW_TASK_MODAL: 'UPDATE_SHOW_TASK_MODAL',
    DETALLE_SHOW_TASK_MODAL: 'DETALLE_SHOW_TASK_MODAL',
    SET_TASK_TO_UPDATE: 'SET_TASK_TO_UPDATE',
    SET_THEME: 'SET_THEME'
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionsTypes.SET_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        case actionsTypes.UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
            };
        case actionsTypes.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        case actionsTypes.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.id)
            };
        case actionsTypes.UPDATE_SHOW_TASK_MODAL:
            return {
                ...state,
                showTaskModal: action.payload
            };
        case actionsTypes.SET_TASK_TO_UPDATE:
            return {
                ...state,
                taskToUpdate: action.payload
            };
        case actionsTypes.SET_THEME:
            return {
                ...state,
                theme: action.payload
            };
        default:
            return state;
    }
};

export { initialState, actionsTypes, reducer };