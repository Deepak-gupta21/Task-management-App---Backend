 // src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TextField, Button, Box } from '@mui/material';

const TaskForm = ({ taskToUpdate }) => {
  const { createTask, updateTask } = useTaskContext();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To-Do',
  });

  useEffect(() => {
    if (taskToUpdate) {
      setTask(taskToUpdate);
    }
  }, [taskToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToUpdate) {
      updateTask(task);
    } else {
      createTask(task);
    }
    setTask({ title: '', description: '', dueDate: '', status: 'To-Do' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Title"
        name="title"
        value={task.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={task.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Due Date"
        name="dueDate"
        type="date"
        value={task.dueDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Status"
        name="status"
        value={task.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        select
        SelectProps={{
          native: true,
        }}
      >
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        {taskToUpdate ? 'Update Task' : 'Add Task'}
      </Button>
    </Box>
  );
};

export default TaskForm;