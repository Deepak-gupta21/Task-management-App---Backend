import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_TASKS_SUCCESS':
      return { ...state, loading: false, tasks: action.payload };
    case 'FETCH_TASKS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return { ...state, tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task) };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: 'FETCH_TASKS_REQUEST' });
      try {
        const response = await axios.get('http://localhost:3001/tasks');
        dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
      }
    };
    fetchTasks();
  }, []);

  const createTask = async (task) => {
    const response = await axios.post('http://localhost:3001/tasks', task);
    dispatch({ type: 'CREATE_TASK', payload: response.data });
  };

  const updateTask = async (task) => {
    const response = await axios.put(`http://localhost:3001/tasks/${task.id}`, task);
    dispatch({ type: 'UPDATE_TASK', payload: response.data });
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:3001/tasks/${taskId}`);
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  return (
    <TaskContext.Provider value={{ state, dispatch, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
