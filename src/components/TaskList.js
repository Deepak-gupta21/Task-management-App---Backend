import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { List, ListItem, ListItemText, IconButton, CircularProgress, Alert, Grid, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskForm from './TaskForm';

const columns = {
  'To-Do': 'To-Do',
  'In Progress': 'In Progress',
  'Done': 'Done'
};

const TaskList = () => {
  const { state, deleteTask, updateTask } = useTaskContext();
  const { tasks, loading, error } = state;
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedTask = tasks.find(task => task.id === parseInt(result.draggableId));
      updatedTask.status = destination.droppableId;
      updateTask(updatedTask);
    } else {
      const items = tasks.filter(task => task.status === source.droppableId);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      // This part is just visual reordering within the same column
      const reorderedTasks = tasks.map(task => {
        if (task.status === source.droppableId) {
          return items.find(item => item.id === task.id) || task;
        }
        return task;
      });

      updateTask(reorderedTasks);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <TaskForm taskToUpdate={taskToUpdate} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {Object.keys(columns).map(columnId => (
            <Grid item xs={4} key={columnId}>
              <Typography variant="h6" gutterBottom>{columns[columnId]}</Typography>
              <Paper elevation={3}>
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef} style={{ minHeight: '500px' }}>
                      {tasks.filter(task => task.status === columnId).map((task, index) => (
                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                          {(provided) => (
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                              <ListItemText primary={task.title} secondary={task.description} />
                              <div>
                                <IconButton edge="end" onClick={() => setTaskToUpdate(task)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={() => deleteTask(task.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            </ListItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
